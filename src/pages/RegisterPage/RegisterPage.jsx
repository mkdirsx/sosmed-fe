import { useFormik } from "formik"

export default function RegisterPage () {
    const validate = (values) => {
        const errors = {};
        if(!values.username) {
            errors.username = "required !"
        }
        if(!values.email) {
            errors.email = "required !"
        }
        if(!values.password) {
            errors.email = "required !"
        }
        else if (values.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g)) {
            errors.password = 'idk'
        }
        if(values.repeatPassword !== values.password) {
            errors.repeatPassword = "password do not match !"
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          repeatPassword: '',
          email: '',
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <div className="flex h-full justify-center items-center">
            <div className="flex flex-col items-center bg-white w-[50%] h-[75%]">
                <h1 className="text-[24px]">
                    Create an Account
                </h1>
                <div className="flex h-full items-center">
                    <form className="flex flex-col">
                        username:
                        <input name="username" type="text" className="rounded-[5px] bg-gray-200 border-[2px] focus:border-black" onBlur={formik.handleChange} onChange={formik.handleChange} value={formik.values.username}/>
                        {formik.errors.username ? <div className="text-red-600">{formik.errors.username}</div> : null}
                        email:
                        <input name="email" type="text" className="rounded-[5px] bg-gray-200 border-[2px] focus:border-black" onBlur={formik.handleChange} onChange={formik.handleChange} value={formik.values.email}/>
                        {formik.errors.email ? <div className="text-red-600">{formik.errors.email}</div> : null}
                        password:
                        <input name="password" type="text" className="rounded-[5px] bg-gray-200 border-[2px] focus:border-black" onBlur={formik.handleChange} onChange={formik.handleChange} value={formik.values.password}/>
                        {formik.errors.password ? <div className="text-red-600">{formik.errors.password}</div> : null}
                        repeatPassword:
                        <input name="repeatPassword" type="text" className="rounded-[5px] bg-gray-200 border-[2px] focus:border-black" onBlur={formik.handleChange} onChange={formik.handleChange} value={formik.values.repeatPassword}/>
                        {formik.errors.repeatPassword ? <div className="text-red-600">{formik.errors.repeatPassword}</div> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}