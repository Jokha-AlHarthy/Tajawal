import * as yup from "yup";

export const ResetPasswordValidation = yup.object().shape({
    password: yup.string().min(4,'Minimum 4 characters required..').max(8,'Maximum 8 characters required..').required("New password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm your password")
});
