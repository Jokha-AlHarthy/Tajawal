import * as yup from 'yup';

export const UserRegisterValidation = yup.object().shape({
    firstName : yup.string().required("First name is required").min(2,"First name must be at least 2 characters"),
    lastName : yup.string().required("Last name is required").min(2,"Last name must be at least 2 characters"),
    email : yup.string().email("Not vaild email format").required("Email is required"),
    dateOfBirth : yup.date().required("Date of birth is required"),
    phone : yup.string().required("Contact number is required").matches(/^[0-9]{8}$/, "The number should be exaclty 8 digits"),
    password: yup.string().required('Password is Required..').min(4,'Minimum 4 characters required..').max(8,'Maximum 8 characters required..'),
    confirmPassword: yup.string().required("Confirm your passowrd").oneOf([yup.ref("password"), null], "Password doesn't match")
});