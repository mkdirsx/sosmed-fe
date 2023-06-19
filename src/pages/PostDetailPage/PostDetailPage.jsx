import { useNavigate, useParams } from "react-router-dom";
import Posts from "../../components/Posts/Posts";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOne } from "../../redux/features/Post/PostSlice";
import Comments from "../../components/Comments/Comments";
import { createComment } from "../../redux/features/Comment/CommentSlice";
import { Toaster, toast } from "react-hot-toast";

export default function PostDetailPage () {
    const user = useSelector((state) => state.User.user);
    const [comment, setComment] = useState('');
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [length, setLength] = useState(0);
    const navigate = useNavigate();
    const params = useParams();
    const call = useDispatch();

    const onComment = () => {
        if(!comment) {
            toast.error('comment cannot be empty !');
        }
        else {
            call(createComment({
                    userId: user.id,
                    postId: params.id,
                    comment: comment
                })
            ).then(
                () => {
                    call(getOne({
                        id: params.id,
                        commentPage: page
                    })
                    ).then(
                        (response) => {
                            setPost(response.data);
                            if(length !== response?.data?.comments?.length) {
                                setLength(response?.data?.comments?.length);
                            }
                            else {
                                setLength(1);
                            }
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                    toast.success('Comment posted !');
                },
                (error) => {
                    toast.error('unable to post comment !');
                    console.log(error);
                }
            )
        }
    }

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            navigate('/login');
        }
        call(getOne({
                id: params.id,
                commentPage: page
            })
        ).then(
            (response) => {
                setPost(response.data);
                if(length !== response?.data?.comments?.length) {
                    setLength(response?.data?.comments?.length);
                }
                else {
                    setLength(1);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [call, params.id, page, navigate]);

    return (
        <div className={`flex w-full h-full`}>
            <Toaster/>
            <HomeSideBar user={user}/>
            <div className="flex flex-col w-full p-[10px] overflow-y-auto">
                <div className="text-[24px] font-bold">
                    Post: 
                </div>
                <div className="flex flex-col gap-[50px] w-full flex-grow bg-gray-300 justify-evenly items-center">
                    <div className="w-[300px] sm:w-[400px] md:w-[600px] h-auto opacity-100">
                        <Posts data={post}/>
                    </div>
                    <div className="flex flex-col gap-[20px] w-[300px] sm:w-[400px] md:w-[600px] min-h-[400px] h-auto">
                        Comments: 
                        <div className="flex flex-col gap-[10px] bg-blue-200 h-auto px-[15px] py-[10px] rounded-[5px]">
                            <div className="w-full h-[75px]">
                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add comment" className="w-full h-full resize-none rounded-[5px] px-[10px] py-[5px]"/>
                            </div>
                            <div className="flex w-full justify-end">
                                <button onClick={onComment} className={`bg-green-500 px-[15px] py-[5px] rounded-[5px] transition-scale duration-200 ${(true)? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600 active:scale-95'}`}>
                                    Post
                                </button>
                            </div>
                        </div>
                        {
                            (post?.comments?.length > 0)?
                            post.comments.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <Comments data={value}/>
                                    </div>
                                )
                            })
                            :
                            <div className="bg-blue-300 flex items-center justify-center h-full rounded-[5px]">
                                There's no comment for this post
                            </div>
                        }
                        {
                            (post?.comments?.length > 0)?
                            <div onClick={() => setPage(page + 1)} className={`${(length % 5 !== 0)? 'hidden' : ''} w-full bg-blue-300 rounded-full text-center transition-all duration-200 cursor-pointer hover:bg-blue-400 active:bg-blue-500`}>
                                Show more
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}