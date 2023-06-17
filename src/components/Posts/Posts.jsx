import { useState } from "react";
import { useSelector } from "react-redux"

export default function Posts (props) {
    const user = useSelector((state) => state.User.user);
    const [show, setShow] = useState(false);

    return (
        <div className="relative flex flex-col gap-[10px] bg-blue-200 px-[15px] py-[10px] rounded-[5px]">
            <div className="flex gap-[5px] h-auto items-center">
                <img src={props?.data?.user?.profilePicture} alt="" className="h-[40px] w-[40px] rounded-full bg-cover"/>
                <div className="font-bold hover:underline cursor-pointer">
                    {props?.data?.user?.username}
                </div>
            </div>
            {
                (props?.data?.image)?
                <div className="w-full h-[150px] sm:h-[200px] md:h-[250px]">
                    <img src={props?.data?.image} alt="" className="w-full h-full rounded-[5px] bg-white"/>
                </div>
                :
                null
            }
            <div className="flex w-full">
                {props?.data?.caption || 'message'}
            </div>
            {
                (props?.data?.user?.id === user.id)?
                <div onClick={() => setShow(!show)} className="absolute right-[15px] select-none flex justify-center items-center hover:font-bold w-[15px] cursor-pointer">
                    ...
                </div>
                :
                null
            }
            {
                (props?.data?.user?.id === user.id)?
                <div className={`${(show)? '' : 'hidden'} absolute right-[-45px] top-0 bg-white rounded-[5px] flex flex-col gap-[5px] px-[5px] py-[5px]`}>
                    <div className="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-[5px] text-center">
                        Edit
                    </div>
                    <div className="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-[5px] text-center">
                        Delete
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}