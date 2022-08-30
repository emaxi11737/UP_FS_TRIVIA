import { inject, injectable } from 'inversify';
import dns from "dns";
import moment from "moment";
import { TYPES } from '@constants/types';
import IScanReadUseCase from '@application/usecases/scan/read/IScanReadUseCase';
import IAcquisitionSendUseCase from '@application/usecases/acquisition/send/IAcquisitionSendUseCase';
import IAcquisitionListPendingUseCase from '@application/usecases/acquisition/list/IAcquisitionListPendingUseCase';
import IAcquisitionUpdateUseCase from '@application/usecases/acquisition/update/IAcquisitionUpdateUseCase';
import IScanListPendingUseCase from '@application/usecases/scan/list/IScanListPendingUseCase';
import IScanSendUseCase from '@application/usecases/scan/send/IScanSendUseCase';
import ScanService from '@configuration/usecases/ScanService';
import AcquisitionService from '@configuration/usecases/AcquisitionService';
import IAcquisitionPatchDto from '@application/usecases/acquisition/IAcquisitionPatchDto';
import IAcquisitionAddZoomCocoUseCase from '@application/usecases/acquisition/add/IAcquisitionAddZoomCocoUseCase';
import { DAMAGE } from '@constants/damage';
import { STATES } from '@constants/states';

type AcquisitionWithError = {
    acquisitionId: string,
    date: Date
}

@injectable()
export default class AcquisitionProcessController {
    private static readonly TIME_INTERVAL: number = 20000;
    private static readonly MINUTES_INTERVAL_ACQUISITION_WITH_ERROR: number = 60;

    private readonly acquisitionSendUseCase: IAcquisitionSendUseCase;
    private readonly acquisitionListPendingUseCase: IAcquisitionListPendingUseCase;
    private readonly acquisitionUpdateUseCase: IAcquisitionUpdateUseCase;
    private readonly acquisitionAddZoomCocoUseCase: IAcquisitionAddZoomCocoUseCase;
    private readonly scanSendUseCase: IScanSendUseCase;
    private readonly scanListPendingUseCase: IScanListPendingUseCase;
    private readonly scanReadUseCase: IScanReadUseCase;
    private acquisitionsWithZoomcocoFileError: AcquisitionWithError[];

    private busy: boolean = false;
    private available: boolean = false;

    constructor(
        @inject(TYPES.AcquisitionService) acquisitionService: AcquisitionService,
        @inject(TYPES.ScanService) scanService: ScanService
    ) {
        this.acquisitionListPendingUseCase = acquisitionService.getAcquisitionListPendingUseCase();
        this.acquisitionSendUseCase = acquisitionService.getAcquisitionSendUseCase();
        this.acquisitionUpdateUseCase = acquisitionService.getAcquisitionUpdateUseCase();
        this.acquisitionAddZoomCocoUseCase = acquisitionService.getAcquisitionAddZoomCocoUseCase();
        this.scanListPendingUseCase = scanService.getScanListPendingUseCase();
        this.scanReadUseCase = scanService.getScanReadUseCase();
        this.scanSendUseCase = scanService.getScanSendUseCase();

        this.acquisitionsWithZoomcocoFileError = [];

        this.process();
    }

    public async process() {
        const that = this;

        console.info(`Start acquisition process`);

        setInterval(async () => {
            await that.checkConnection()
                .catch(error => console.error(`Without connection`));

            if (!that.getAvailable() || that.getBusy()) return;

            that.setBusy(true);

            const acquisitionListToUpload = await that.acquisitionListPendingUseCase.list();

            console.info(`Acquisitions to upload: ${acquisitionListToUpload.length}`);

            for (let acquisition of acquisitionListToUpload) {
                const acquisitionFilterDto: any = {
                    acquisitionId: acquisition.id
                }

                const scansIdsToUpload = await that.scanListPendingUseCase.list(acquisitionFilterDto);

                console.info(`Scans to upload: ${scansIdsToUpload.length}`);

                for (const scanId of scansIdsToUpload) {
                    const scanToSend = await that.scanReadUseCase.read(scanId.id);

                    console.info(`Scan to upload: ${scanToSend.id}`);

                    const scanSent = await that.scanSendUseCase.send(scanToSend)
                        .catch(error => console.error(error));

                    if (!scanSent) {
                        this.setBusy(false);
                        return;
                    }

                    let imagesAcquisition = acquisition.images;
                    imagesAcquisition.push(scanSent.image);

                    const acquisitionPatchDto: IAcquisitionPatchDto = {
                        id: acquisition.id,
                        state: null,
                        images: imagesAcquisition,
                        acquisitionErrorId: null,
                        acquisitionErrorComment: null
                    }

                    acquisition = await this.acquisitionUpdateUseCase.updatePatch(acquisitionPatchDto);
                }

                // Add zoomcoco external-internal damage without acquisition error
                if (acquisition.typeDamage === DAMAGE.EXTERNAL_INTERNAL && !acquisition.acquisitionErrorId) {
                    const existAcquisitionWithZoomcocoFileError = this.acquisitionsWithZoomcocoFileError.find((acquisitionWithError) => acquisitionWithError.acquisitionId === acquisition.id);
                    if (existAcquisitionWithZoomcocoFileError && moment().diff(existAcquisitionWithZoomcocoFileError.date, 'minutes') > AcquisitionProcessController.MINUTES_INTERVAL_ACQUISITION_WITH_ERROR) {
                        // ADDED LOGIC TO CHANGE STATE ACQUISITION TO ERROR
                        const acquisitionPatchDto: IAcquisitionPatchDto = {
                            id: acquisition.id,
                            state: STATES.ERROR,
                            images: null,
                            acquisitionErrorId: null,
                            acquisitionErrorComment: null
                        }

                        acquisition = await this.acquisitionUpdateUseCase.updatePatch(acquisitionPatchDto);

                        // REMOVED FROM ACQUISITIONS WITH ERROR LIST
                        this.acquisitionsWithZoomcocoFileError = this.acquisitionsWithZoomcocoFileError.filter((acquisitionWithError) => acquisitionWithError.acquisitionId !== acquisition.id);
                        continue;
                    };

                    const acquisitionWithZoomCoco = await this.addZoomcocoExternalInternalDamage(acquisition.id);

                    if (!acquisitionWithZoomCoco) {
                        if (!existAcquisitionWithZoomcocoFileError) {
                            this.acquisitionsWithZoomcocoFileError.push({
                                acquisitionId: acquisition.id,
                                date: new Date()
                            });
                        }

                        this.setBusy(false);
                        return;
                    }

                    acquisition = acquisitionWithZoomCoco;
                }

                const acquisitionSent = await that.acquisitionSendUseCase.send(acquisition)
                    .catch(error => console.error(error));

                if (!acquisitionSent) {
                    this.setBusy(false);
                    return;
                }

                console.info(`Acquisition send: ${acquisitionSent.id}`);
            }

            that.setBusy(false);

        }, AcquisitionProcessController.TIME_INTERVAL);
    }

    private setBusy(busy: boolean): void {
        console.info(`Busy: ${busy}`);
        this.busy = busy;
    }

    private getBusy(): boolean {
        return this.busy;
    }

    private setAvailable(available: boolean): void {
        console.info(`Available: ${available}`);
        this.available = available;
    }

    private getAvailable(): boolean {
        return this.available;
    }

    private async checkConnection(): Promise<boolean> {
        return new Promise((res, rej) => {
            dns.lookupService('8.8.8.8', 53, (err, hostname, service) => {
                if (err) {
                    this.setAvailable(false);
                    rej(err);
                } else {
                    this.setAvailable(true);
                    res(true);
                }
            });
        });
    }

    private async addZoomcocoExternalInternalDamage(acquisitionId: string) {
        return await this.acquisitionAddZoomCocoUseCase.addZoomCoco(acquisitionId)
            .catch(error => console.error(error));
    }
}
