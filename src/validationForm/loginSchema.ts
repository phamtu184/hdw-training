import * as yup from 'yup';

export interface LoginFormValues {
    username: string;
    password: string;
}
const loginSchema = yup
    .object({
        username: yup.string().required('This field is required'),
        password: yup.string().required('This field is required'),
    })
    .required();
export default loginSchema;
