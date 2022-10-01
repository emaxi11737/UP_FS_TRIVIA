export default interface IUserPatchDto {
    id: string;
    username?: string;
    oldPassword?: string,
    newPassword?: string,
}
