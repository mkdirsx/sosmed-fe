import { useEffect, useState } from 'react';
import './LoginPage.css';
import { useFormik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/User/UserSlice';
import { Toaster, toast } from 'react-hot-toast';
import img from './img2.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/features/User/UserSlice';

export default function LoginPage () {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const call = useDispatch();

    const validate = (values) => {
        const errors = {};
        if(!values.username) {
            errors.username = "Required !";
        };

        if(!values.password) {
            errors.password = "Required !";
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validate,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);
            const loginToast = toast.loading('Logging in !');
            call(login({
                    username: values.username,
                    password: values.password
                })
            ).then(
                (response) => {
                    toast.success(response.message, {id: loginToast});
                    call(setUser( JSON.parse(localStorage.getItem('user')) ))
                    setTimeout(() => {
                        toast.remove();
                        navigate('/home');
                    }, 1000)
                    setSubmitting(false);
                },
                (error) => {
                    if(!error.response) {
                        toast.error(error.message, {id: loginToast});
                    }
                    else if (!Array.isArray(error.response.data.message)) {
                        toast.error(error.response.data.message, {id: loginToast});
                    }
                    else {
                        toast.dismiss();
                        error.response.data.message.map(value => {
                            return toast.error(value.msg);
                        })
                    }
                    setSubmitting(false);
                }
            )
        }
    });

    useEffect(() => {
        if(localStorage.getItem('user')) {
            navigate('/home');
        }
    }, [navigate])

    return (
        <div className="flex h-full justify-center items-center bg-blue-100">
            <Toaster/>
            <div className='flex flex-col md:flex-row md:w-[750px] md:h-[450px] w-[300px] h-[550px]'>
                <div className='w-[full] md:w-[350px] relative'>
                    <h1 className="text-[24px] md:text-[40px] absolute left-[30px] top-[25px] font-bold text-yellow-500">
                        Log In
                    </h1>
                    <img src={img} alt='' className='w-full h-full object-cover'/>
                </div>
                <div className="flex flex-col flex-grow items-center bg-white py-[25px]">
                    <div className="flex w-full h-full justify-center items-center">
                        <div className="flex flex-col">
                            Username:
                            <input name="username" type="text" className="formikInput rounded-[5px] bg-gray-200 border-[2px] focus:border-black" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username}/>
                            <div className='formikError'>
                                {(formik.touched.username && formik.errors.username)? <div className="text-red-600">{formik.errors.username}</div> : <>&nbsp;</>}
                            </div>
                            Password:
                            <div className='relative'>
                                <input name="password" maxLength={10} type={(showPassword)? 'text' : 'password'} className="formikInput rounded-[5px] bg-gray-200 border-[2px] focus:border-black" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                                {
                                    (showPassword)?
                                    <FiEye onClick={() => setShowPassword(false)} className='absolute top-[5px] right-[5px] cursor-pointer' size={20}/>
                                    :
                                    <FiEyeOff onClick={() => setShowPassword(true)} className='absolute top-[5px] right-[5px] cursor-pointer' size={20}/>
                                }
                            </div>
                            <div className='formikError'>
                                {(formik.touched.password && formik.errors.password)? <div className="text-red-600">{formik.errors.password}</div> : <>&nbsp;</>}
                            </div>
                            <Link to={'/register'} className='text-[12px] hover:underline text-blue-500'>
                                don't have an account ?
                            </Link>
                            <button type='submit' disabled={(formik.isSubmitting)? true : false} onClick={formik.handleSubmit} className={`self-center w-[75px] h-[35px] mt-[15px] rounded-[5px] transition-all duration-150 bg-green-500 hover:bg-green-600 ${(formik.isSubmitting)? 'cursor-not-allowed' : 'active:scale-95'}`}>
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}