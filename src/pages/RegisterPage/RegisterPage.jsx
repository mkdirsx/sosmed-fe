import { useState, useEffect } from 'react';
import './RegisterPage.css';
import { useFormik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/features/User/UserSlice';
import { Toaster, toast } from 'react-hot-toast';
import img from './img.jpg'
import { useNavigate } from 'react-router-dom';

export default function RegisterPage () {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const navigate = useNavigate();
    const call = useDispatch();

    const validate = (values) => {
        const errors = {};
        if(!values.username) {
            errors.username = "Required !";
        };

        if(!values.email) {
            errors.email = "Required !";
        }
        else if (! /^(?=.*[@]).*\.com$/g.test(values.email)) {
            errors.email = "Must be a valid email !"
        }

        if(!values.password) {
            errors.password = "Required !";
        }
        else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,}).*$/g.test(values.password)) {
            errors.password = 'Password must have 1 lowercase, uppercase, numeric and 8 characters long';
        };
        //(?=.*\W)
        if(values.repeatPassword !== values.password) {
            errors.repeatPassword = "Password do not match !";
        };

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
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true);
            call(createUser({
                    username: values.username,
                    email: values.email,
                    password: values.password
                })
            ).then(
                (response) => {
                    toast.success(response.message);
                    navigate('/login');
                    setSubmitting(false);
                },
                (error) => {
                    if(!error.response) {
                        toast.error(error.message);
                    }
                    else if (!Array.isArray(error.response.data.message)) {
                        toast.error(error.response.data.message);
                    }
                    else {
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
                    <h1 className="text-[24px] md:text-[40px] absolute left-[30px] top-[25px] font-bold text-amber-500">
                        Sign Up
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
                            Email:
                            <input name="email" type="text" className="formikInput rounded-[5px] bg-gray-200 border-[2px] focus:border-black" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                            <div className='formikError'>
                                {(formik.touched.email && formik.errors.email)? <div className="text-red-600">{formik.errors.email}</div> : <>&nbsp;</>}
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
                            Repeat password:
                            <div className='relative'>
                                <input name="repeatPassword" type={(showRepeat)? 'text' : 'password'} className="formikInput rounded-[5px] bg-gray-200 border-[2px] focus:border-black" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.repeatPassword}/>
                                {
                                    (showRepeat)?
                                    <FiEye onClick={() => setShowRepeat(false)} className='absolute top-[5px] right-[5px] cursor-pointer' size={20}/>
                                    :
                                    <FiEyeOff onClick={() => setShowRepeat(true)} className='absolute top-[5px] right-[5px] cursor-pointer' size={20}/>
                                }
                            </div>
                            <div className='formikError'>
                                {(formik.touched.repeatPassword && formik.errors.repeatPassword)? <div className="text-red-600">{formik.errors.repeatPassword}</div> : <>&nbsp;</>} 
                            </div>

                            <button type='submit' disabled={(formik.isSubmitting)? true : false} onClick={formik.handleSubmit} className={`self-center w-[75px] h-[35px] mt-[15px] rounded-[5px] transition-all duration-150 bg-green-500 hover:bg-green-600 ${(formik.isSubmitting)? 'cursor-not-allowed' : 'active:scale-95'}`}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}