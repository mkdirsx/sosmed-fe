import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deletePost, updatePost } from "../../redux/features/Post/PostSlice";
import { toast } from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { createLike } from "../../redux/features/Like/LikeSlice";
import { getUser } from "../../redux/features/User/UserSlice";
import { useNavigate } from "react-router-dom";

export default function Posts (props) {
    const user = useSelector((state) => state.User.user);
    const [newMessage, setNewMessage] = useState(props?.data?.caption);
    const [liked, setLiked] = useState(false);
    const [liking, setLiking] = useState(false);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const call = useDispatch();
    const navigate = useNavigate();

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
                            call(props.getPosts({
                                    page: props.page
                                })
                            ).then(
                                () => {
        
                                },
                                (error) => {
                                    toast.error('unable to fetch posts !');
                                    console.log(error);
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

    const onDelete = () => {
        call(deletePost({
                id: props?.data?.id
            })
        ).then(
            () => {
                toast.success('post deleted !');
                if(props.getPosts) {
                    call(props.getPosts()).then(
                        () => {

                        },
                        () => {
                            toast.error('unable to fetch posts !');
                        }
                    )
                }
                setShow(false);
            },
            (error) => {
                toast.error('unable to delete post !');
                console.log(error);
            }
        );
    }

    const likingPost = () => {
        setLiking(true);
        call(createLike({
                userId: user?.id,
                postId: props?.data?.id
            })
        ).then(
            (response) => {
                toast.success(response?.message);
                if(props.getPosts) {
                    call(props.getPosts({
                            page: props.page
                        })
                    ).then(
                        () => {

                        },
                        (error) => {
                            toast.error('unable to fetch posts !');
                            console.log(error);
                        }
                    )
                }
                call(getUser({
                        id: user?.id
                    })
                ).then(
                    () => {

                    },
                    (error) => {
                        console.log(error)
                    }
                )
                setLiked(!liked);
                setTimeout(() => {
                    setLiking(false);
                }, 1000)
            },
            (error) => {
                console.log(error);
                setTimeout(() => {
                    setLiking(false);
                }, 1000)
            }
        )
    }

    useEffect(() => {
        if(localStorage.getItem('user')) {
            const likes = JSON.parse(localStorage.getItem('user')).likes;
            likes.forEach((value) => {
                if(value.postId === props?.data?.id) {
                    setLiked(true);
                }
            })
        }
    }, [props?.data?.id]);

    return (
        <div onClick={() => navigate(`/post/${props?.data?.id}`)} className={`relative flex flex-col gap-[10px] bg-blue-200 px-[15px] py-[10px] rounded-[5px] transition-all duration-150 hover:scale-105 cursor-pointer`}>
            <div className="flex gap-[5px] h-auto items-center">
                <img src={props?.data?.user?.profilePicture} alt="" className="h-[40px] w-[40px] rounded-full bg-cover"/>
                <div className="flex flex-col">
                    <div className="font-bold hover:underline cursor-pointer">
                        {props?.data?.user?.username}
                    </div>
                    <div className="text-[10px]">
                        {new Date(props?.data?.createdAt).getDay() + '/' + new Date(props?.data?.createdAt).getMonth() + '/' + new Date(props?.data?.createdAt).getFullYear()}
                    </div>
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
            <div className={`${(props.data)? '' : 'hidden'} flex gap-[5px] items-center`}>
                <button onClick={likingPost} disabled={(liking)? true : false} className={''}>
                    {
                        (liked)?
                        <AiFillHeart size={20}/>
                        :
                        <AiOutlineHeart size={20}/>
                    }
                </button>
                <div>
                    {props?.data?.likes?.length || 0} likes
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
                    <div onClick={onDelete} className="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-[5px] text-center">
                        Delete
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}