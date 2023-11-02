export interface Project {
    id?: number,
    projectId?: string,
    projectName: string,
    projectDescription: string
}

export interface EmployeeProjectDataMapping {
    employeeId?: string,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    address: string,
    active: boolean,
    id?: number,
    projectDetails: Project;
}