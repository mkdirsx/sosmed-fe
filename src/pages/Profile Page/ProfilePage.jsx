import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css';
import { useEffect, useState, useRef } from "react";
import Posts from "../../components/Posts/Posts";
import { updateUser } from "../../redux/features/User/UserSlice";
import { Toaster, toast } from "react-hot-toast";
import { getUserPost } from "../../redux/features/Post/PostSlice";
import { useNavigate } from "react-router-dom";

export default function ProfilePage () {
    const user = useSelector((state) => state.User.user);
    const posts = useSelector((state) => state.Post.posts);
    const maxPage = Math.ceil(useSelector((state) => state.Post.total) / 5);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newProfile, setNewProfile] = useState('');
    const [disable, setDisable] = useState(false);
    const [page, setPage] = useState(1);
    const listInnerRef = useRef();
    const navigate = useNavigate();
    const call = useDispatch();

    const onSaveChange = async() => {
        setDisable(true);

        if(newName === user.username && !newProfile && newDesc === user.desc) {
            toast.error('no changes made !');
            setTimeout(() => {
                setDisable(false);
            }, 1000)
        }
        else {
            if(newProfile) {
                call(updateUser({
                        id: user.id,
                        username: newName,
                        desc: newDesc,
                        image: newProfile
                    })
                ).then(
                    (response) => {
                        toast.success(response.message);
                        setDisable(false);
                    },
                    (error) => {
                        toast.error('Unable to save changes !');
                        console.log(error);
                        setDisable(false);
                    }
                )
            }
            else {
                call(updateUser({
                        id: user.id,
                        username: newName,
                        desc: newDesc
                    })
                ).then(
                    (response) => {
                        toast.success(response.message);
                        setDisable(false);
                    },
                    (error) => {
                        toast.error('Unable to save changes !')
                        console.log(error);
                        setDisable(false);
                    }
                )
            }
        }
    }

    const onScroll = () => {
        if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          //console.log(scrollTop, scrollHeight, clientHeight);
          if (scrollTop + clientHeight >= scrollHeight && page + 1 <= maxPage) {
            setPage(page + 1);
          }
        }
    };

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            navigate('/login');
        }
        setNewName(user.username);
        setNewDesc(user.desc);
        if(Object.keys(user).length > 0) {
            call(getUserPost({
                    id: user.id,
                    page: page
                })
            ).then(
                (response) => {
                    
                },
                (error) => {
                    toast.error('unable to fetch posts !');
                    console.log(error);
                }
            )
        }
    }, [user, page])

    return (
        <div className="flex w-full h-full">
            <Toaster/>
            <HomeSideBar user={user}/>
            <div onScroll={onScroll} ref={listInnerRef} className="flex flex-col w-full h-full px-[10px] py-[10px] overflow-y-auto"> 
                {
                    (user?.status === 'unverified')?
                    <div className="w-full bg-yellow-500 text-center">
                        Your account is not verified, verify your email to have full access to this site !
                    </div>
                    :
                    null
                }
                <div className="flex flex-col md:flex-row md:items-center justify-center bg-blue-100 gap-[20px] px-[15px] py-[10px]">
                    <div className="flex flex-col items-center md:items-start">
                        <div>
                            {
                                (newProfile.length === 0) ?
                                <img src={user?.profilePicture} alt="" className="h-[150px] w-[150px] rounded-full"/>
                                :
                                <img src={URL.createObjectURL(newProfile)} alt="" className="h-[150px] w-[150px] rounded-full"/>
                            }
                        </div>
                        <div>
                            <div className="flex flex-col gap-[3px] w-[185px] md:w-auto">
                                Upload profile picture : 
                                <input onChange={(e) => setNewProfile(e.target.files[0])} accept="image/jpeg, image/png, image/jpg" type="file" className="fileInput"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center h-full justify-between">
                        <div className="flex flex-col justify-center gap-[10px] py-[10px]">
                            <div className="flex gap-[10px] md:flex-col">
                                <div>
                                    <div>
                                        Username:
                                    </div>
                                    <div>
                                        {(user?.username)? <input onChange={(e) => setNewName(e.target.value)} value={newName} className="bg-gray-200 w-[150px] md:w-[200px] rounded-[5px] border-[2px] focus:border-black" type="text"/> : 'name'}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Email:
                                    </div>
                                    <div className="flex flex-col sm:flex-row">
                                        {(user?.email)? user.email : 'name'}
                                        {(user?.status === 'unverified')? <span className="text-red-600">(unverified)</span> : null}
                                    </div>
                                    <div className="flex justify-center items-center w-[125px] md:w-[150px] text-[12px] rounded-[5px] bg-yellow-500 transition-all duration-200 cursor-pointer hover:bg-yellow-600 active:scale-95">
                                        Send Verification Link !
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    Bio:
                                </div>
                                <div>
                                    <textarea value={newDesc} maxLength={50} onChange={(e) => setNewDesc(e.target.value)} className="w-full h-[75px] resize-none p-[5px]"/>
                                </div>
                            </div>
                        </div>
                        <div className="self-center md:self-end">
                            <button disabled={(disable) ? true : false} onClick={onSaveChange} className={`flex justify-center items-center w-[125px] h-[40px] rounded-[5px] bg-green-500 transition-all duration-200 ${(disable)? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600 active:scale-95'}`}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-[10px]">
                    <div className="text-[20px] font-bold">
                        Your Posts:
                    </div>
                    <div className="columns-1 md:columns-2">
                        {
                            (posts)?
                            posts.map((value, index) => {
                                return (
                                    <div key={index} className="break-inside-avoid h-auto w-auto p-[5px]">
                                        <Posts data={value} getPosts={getUserPost} page={page}/>
                                    </div>
                                )
                            })
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}