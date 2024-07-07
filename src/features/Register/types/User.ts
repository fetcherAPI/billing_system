export interface IUserRegister {
    userInn: string;
    fullName: string;
    password: string;
    username: string;
    email: string;
    workPhone: string;
    cellPhone: string;
    position: string;
    companyId: number;
}

export interface IUser extends IUserRegister {
    id: number;
    datePasswordExpired: string;
    roleId: number;
    roleName: string;
    companyName: string;
}
