import { Role } from "@constants/role";

export default interface IUserDto {
    id: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    roles?: Role[];
}
