import * as yup from 'yup';
import moment from 'moment';

const employeeSchema = yup
    .object({
        name: yup.string().required('This field is required'),
        gender: yup.string().required('This field is required'),
        birthDate: yup
            .string()
            .required('This field is required')
            .test('Date of Birth', 'Should be greather than 18', function (value) {
                return moment().diff(moment(value), 'years') >= 18;
            })
            .test('Date of Birth', 'Should be less than 60', function (value) {
                return moment().diff(moment(value), 'years') <= 60;
            }),
        salary: yup
            .number()
            .required('This field is required')
            .min(100000, 'Must be greater than 100.000')
            .max(1000000000, 'Must be less than 1.000.000.000'),
    })
    .required();
export default employeeSchema;
