import { useParams } from "react-router-dom";
import Posts from "../../components/Posts/Posts";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOne } from "../../redux/features/Post/PostSlice";
import Comments from "../../components/Comments/Comments";

export default function PostDetailPage () {
    const user = useSelector((state) => state.User.user);
    const [post, setPost] = useState({});
    const params = useParams();
    const call = useDispatch();

    useEffect(() => {
        call(getOne({
                id: params.id
            })
        ).then(
            (response) => {
                setPost(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [call, params.id])
    return (
        <div className={`flex w-full h-full`}>
            <HomeSideBar user={user}/>
            <div className="flex flex-col w-full p-[10px] overflow-y-auto">
                <div className="text-[24px] font-bold">
                    Post: 
                </div>
                <div className="flex flex-col gap-[50px] w-full flex-grow bg-gray-300 justify-evenly items-center">
                    <div className="w-[600px] h-auto opacity-100">
                        <Posts data={post}/>
                    </div>
                    <div className="flex flex-col gap-[20px] w-[600px] min-h-[400px] h-auto">
                        Comments: 
                        {
                            (post.comments)?
                            post.comments.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <Comments data={value}/>
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