export interface ICompanyCreate {
  inn: string;
  title: string;
  notes: string;
  legalAddress: string;
  factAddress: string;
  website: string;
  workPhone: string;
  ateId: number;
  managerName: string;
  managerInn: string;
  managerPosition: string;
}

export interface ICompanyCreateResponse extends ICompanyCreate {
  status: Status;
  dateCreated: string;
  ateName: string;
}

enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Blocked = "BLOCKED",
}
