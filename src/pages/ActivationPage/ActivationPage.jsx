import { useNavigate, useParams } from "react-router-dom"
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser, verifyAccount } from "../../redux/features/User/UserSlice";

export default function ActivationPage () {
    const user = useSelector((state) => state.User.user);
    const [response, setResponse] = useState(undefined);
    const navigate = useNavigate();
    const params = useParams();
    const call = useDispatch();

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            navigate('/login');
        }
        else if(JSON.parse(localStorage.getItem('user'))?.status !== 'unverified') {
            navigate('/home');
        }
        else {
            if(Object.keys(user).length > 0) {
                call(verifyAccount({
                        id: user.id,
                        code: params.code
                    })
                ).then(
                    () => {
                        setResponse(true);
                        call(getUser({
                                id: user.id
                            })
                        ).then(
                            () => {

                            },
                            (error) => {
                                console.log(error)
                            }
                        );
                        setTimeout(() => {
                            navigate('/profile');
                        }, 1000)
                    }, 
                    () => {
                        setResponse(false);
                    }
                )
            }
        }
    }, [navigate, call, user, params.code]);

    return (
        <div className="flex w-full h-full">
            <HomeSideBar user={user}/>
            <div className="flex flex-col w-full h-full items-center justify-center bg-blue-200">
                <div className={`${(response === undefined)? '' : 'hidden'} flex justify-center items-center font-bold text-[18px] md:text-[24px] w-[300px] h-[200px] md:w-[500px] md:h-[300px] bg-yellow-500 rounded-[5px]`}>
                    Waiting for server response ...
                </div>
                <div className={`${(response === true)? '' : 'hidden'} flex justify-center items-center font-bold text-[18px] md:text-[24px] w-[300px] h-[200px] md:w-[500px] md:h-[300px] bg-green-500 rounded-[5px]`}>
                    This account has been verified !
                </div>
                <div className={`${(response === false)? '' : 'hidden'} flex justify-center items-center text-center font-bold text-[16px] md:text-[20px] w-[300px] h-[200px] md:w-[500px] md:h-[300px] bg-red-500 rounded-5px`}>
                    Verification Failed, the code is either incorrect or expired, please request for a new one in your profile tab !
                </div>
            </div>
        </div>
    )
}