import { useState } from "react";
import { BiMenu } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

export default function HomeSideBar (props) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex h-full bg-gray-700 relative">
            <div className="h-full w-[50px] md:hidden">
                <BiMenu onClick={() => setShow(!show)} size={50}/>
            </div>
            <div className={`flex flex-col bg-gray-700 left-[50px] transition-all duration-300 ${(show)? 'w-[200px] absolute z-50' : 'w-[0px]'} md:w-[200px] md:static h-full py-[20px] overflow-hidden`}>
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
                    <div className="bg-emerald-800 py-[7px] rounded-[5px] px-[10px] transition-all duration-200 hover:bg-emerald-900 hover:translate-x-2 active:scale-95 cursor-pointer select-none">
                        Profile
                    </div>
                </div>
                <div className="px-[20px] mt-[auto] whitespace-nowrap">
                    <div className="bg-rose-900 py-[7px] rounded-[5px] px-[10px] transition-all duration-200 hover:bg-rose-950 active:scale-95 cursor-pointer select-none">
                        Log Out
                    </div>
                </div>
            </div>
        </div>
    )
}