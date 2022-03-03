export interface IEmployee {
    id?: string | number;
    name: string;
    gender: 'male' | 'female';
    birthDate: Date;
    salary: number;
    createdAt?: number;
    updatedAt?: number;
}
