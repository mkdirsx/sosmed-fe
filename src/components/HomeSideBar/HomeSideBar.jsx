import { useState } from "react";
import { BiMenu } from 'react-icons/bi';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/User/UserSlice";

export default function HomeSideBar (props) {
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const call = useDispatch();

    const onLogout = () => {
        localStorage.removeItem('user');
        call(setUser({}));
        navigate('/login');
    }

    return (
        <div className="flex">
            <div className="flex h-full bg-gray-700 relative">
                <div className="h-full w-[50px] md:hidden">
                    <BiMenu onClick={() => setShow(!show)} size={50}/>
                </div>
                <div className={`flex flex-col bg-gray-700 left-[50px] transition-all duration-300 absolute z-10 ${(show)? 'w-[200px]' : 'w-[0px]'} md:w-[200px] md:static h-full py-[20px] overflow-hidden`}>
                    <div className="flex flex-col items-center w-full whitespace-nowrap">
                        <div className="flex justify-center w-full">
                            {
                                (props?.user?.profilePicture) ?
                                <img src={props.user.profilePicture} alt="" className="h-[125px]"/>
                                :
                                <img alt="" className="h-[125px] bg-white"/>
                            }
                        </div>
                        <div>
                            {(props?.user?.username)? `Hello, ${props.user.username}` : ''}
                        </div>
                    </div>
                    <div className="flex flex-col px-[20px] gap-[10px] mt-[40px] whitespace-nowrap">
                        <div onClick={() => navigate('/profile')} className="bg-emerald-800 py-[7px] rounded-[5px] px-[10px] transition-all duration-200 hover:bg-emerald-900 hover:translate-x-2 active:scale-95 cursor-pointer select-none">
                            Profile
                        </div>
                        <div onClick={() => navigate('/home')} className="bg-emerald-800 py-[7px] rounded-[5px] px-[10px] transition-all duration-200 hover:bg-emerald-900 hover:translate-x-2 active:scale-95 cursor-pointer select-none">
                            Home
                        </div>
                    </div>
                    <div className="px-[20px] mt-[auto] whitespace-nowrap">
                        <div onClick={() => setShowModal(true)} className="bg-rose-900 py-[7px] rounded-[5px] px-[10px] transition-all duration-200 hover:bg-rose-950 active:scale-95 cursor-pointer select-none">
                            Log Out
                        </div>
                    </div>
                </div>
            </div>
            <div className={`absolute ${(showModal)? 'flex' : 'hidden'} justify-center items-center w-full h-full z-40`}>
                <div className="bg-white opacity-50 w-full h-full absolute">
                    &nbsp;
                </div>
                <div className="flex flex-col gap-[20px] items-center justify-center w-[500px] h-[300px] p-[100px] bg-blue-200 opacity-100 z-50">
                    <div >
                        Are you sure you want to Logout ?
                    </div>
                    <div className="flex justify-between w-full">
                        <div onClick={() => setShowModal(false)} className="bg-red-500 px-[10px] py-[5px] rounded-[5px] transition-all duration-200 select-none hover:bg-red-600 active:bg-red-700 active:scale-95 cursor-pointer">
                            Cancel
                        </div>
                        <div onClick={onLogout} className="bg-green-500 px-[10px] py-[5px] rounded-[5px] transition-all duration-200 select-none hover:bg-green-600 active:bg-green-700 active:scale-95 cursor-pointer">
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}