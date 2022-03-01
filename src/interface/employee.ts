export interface IEmployee {
    id?: string;
    name: string;
    gender: 'male' | 'female';
    age: number;
    salary: number;
    createdAt?: number;
    updatedAt?: number;
}
