import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../redux/features/Post/PostSlice";
import { toast } from "react-hot-toast";

export default function Posts (props) {
    const user = useSelector((state) => state.User.user);
    const [newMessage, setNewMessage] = useState(props?.data?.caption);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const call = useDispatch();

    const onSave = () => {
        if(newMessage) {
            if(newMessage !== props?.data?.caption) {
                call(updatePost({
                        id: props?.data?.id,
                        newMessage: newMessage,
                    })
                ).then(
                    (response) => {
                        toast.success(response?.message);
                        if(props.getPosts) {
                            call(props.getPosts()).then(
                                () => {
        
                                },
                                () => {
                                    toast.error('unable to fetch posts !');
                                }
                            )
                        }
                        setEdit(false);
                    },
                    (error) => {
                        toast.error('unable to update post !');
                        console.log(error);
                    }
                )
            }
            else {
                toast.error('no changes made !');
            }
        }
        else {
            toast.error('post must contain a caption !');
        }
    };

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
                <div className={`${(edit)? 'hidden' : 'block'}`}>
                    {props?.data?.caption || 'message'}
                </div>
                <div className={`${(edit)? 'block' : 'hidden'} w-full flex flex-col gap-[10px]`}>
                    <div className="w-full h-[100px]">
                        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="w-full h-full resize-none rounded-[5px] p-[10px]"/>
                    </div>
                    <div className="flex justify-between">
                        <div onClick={() => setEdit(false)} className="bg-red-500 px-[10px] py-[5px] rounded-[5px] transition-all duration-200 hover:bg-red-600 active:bg-red-700 active:scale-95 cursor-pointer">
                            Cancel
                        </div>
                        <div onClick={onSave} className="bg-green-500 px-[10px] py-[5px] rounded-[5px] tansition-all duration-200 hover:bg-green-600 active:bg-green-700 active:scale-95 cursor-pointer">
                            Save Changes
                        </div>
                    </div>
                </div>
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
                <div className={`${(show)? '' : 'hidden'} absolute right-[-45px] z-10 top-0 bg-white rounded-[5px] flex flex-col gap-[5px] px-[5px] py-[5px]`}>
                    <div onClick={() => {setEdit(true); setShow(false)}} className="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-[5px] text-center">
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