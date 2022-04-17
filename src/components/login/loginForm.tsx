import React from "react"
import { FormikProps, useFormik } from "formik"
type PropsType = {
    login: (email: string, password: string, 
        captcha: string | null, remeberMe: boolean | null,
        setStatus:any )=> void,
    captcha: string | null
}
type FormikValues = {
    password: string
    remeberMe: boolean
    email: string
    captcha: string
}
const LoginForm: React.FC<PropsType> = ({login, captcha}) => {
    const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
        initialValues: {
            password: "",
            remeberMe: false,
            email: "",
            captcha: ""
        },
        onSubmit: (values, submitProps) => {
            login(values.email, values.password, values.captcha, values.remeberMe, submitProps.setStatus)
        },
        
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="email"></input>
            </div>
            <div>
                <input name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="password"></input>
            </div>
            <div>
                <input
                    name="rememderMe" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={"checkbox"} /> rememder me
            </div>
            <div>
                <button type="submit">login</button>
            </div>
            {captcha && <img src={captcha}/>}
            {captcha && <div>
                <input
                    name="captcha" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.captcha}
                    type="text" />
            </div>}
        </form>
    );
}
export default LoginForm