import { useEffect, useState } from "react"
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import Posts from "../../components/Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../../redux/features/Post/PostSlice";
import { Toaster, toast } from "react-hot-toast";

export default function HomePage () {
    const user = useSelector((state) => state.User.user);
    const posts = useSelector((state) => state.Post.posts);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const call = useDispatch();

    const onPost = () => {
        if(caption) {
            setIsPosting(true);
            if(image) {
                call(createPost({
                        caption: caption,
                        image: image,
                        userId: user.id
                    })
                ).then(
                    () => {
                        toast.success('New post created !');
                        setTimeout(() => {
                            setIsPosting(false);
                        }, 1000);
                    },
                    (error) => {
                        console.log(error);
                        toast.error('unable to create post !');
                        setTimeout(() => {
                            setIsPosting(false);
                        }, 1000);
                    }
                )
            }
            else {
                call(createPost({
                    caption: caption,
                    userId: user.id
                    })
                ).then(
                    () => {
                        toast.success('New post created !');
                        setTimeout(() => {
                            setIsPosting(false);
                        }, 1000);
                    },
                    (error) => {
                        console.log(error);
                        toast.error('unable to create post !');
                        setTimeout(() => {
                            setIsPosting(false);
                        }, 1000);
                    }
                )
            }
        }
        else {
            toast.error('post must contain a caption !');
        }
    }

    useEffect(() => {
        call(getPosts()).then(
            () => {

            },
            (error) => {
                toast.error('unable to fetch posts !');
                console.log(error);
            }
        )
    }, [call]);
    return (
        <div className="flex w-full h-full">
            <Toaster/>
            <HomeSideBar user={user}/>
            <div className="flex flex-col flex-grow gap-[10px] bg-gray-300 px-[10px] py-[10px] overflow-y-auto overflow-x-hidden">
                <div className="w-full text-[24px]">
                    Explore
                </div>
                <div className="flex justify-center w-full h-auto">
                    <div className="flex flex-col gap-[10px] bg-blue-200 w-[300px] sm:w-[400px] h-[250px] md:w-[500px] md:h-[200px] px-[15px] py-[10px] rounded-[5px]">
                        <div className="w-full h-[100px]">
                            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full h-full resize-none rounded-[5px] px-[10px] py-[5px]"/>
                        </div>
                        <div >
                            Upload image: <input onChange={(e) => setImage(e.target.files[0])} type="file"/>
                        </div>
                        <div className="flex w-full justify-end">
                            <button disabled={isPosting} onClick={onPost} className={`bg-green-500 px-[15px] py-[5px] rounded-[5px] transition-scale duration-200 ${(isPosting)? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600 active:scale-95'}`}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-[20px] items-center">
                    {
                        (posts)?
                        posts.map((value, index) => {
                            return(
                                <div key={index} className="w-[300px] sm:w-[400px] h-auto md:w-[500px] md:h-auto">
                                    <Posts data={value} getPosts={getPosts}/>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}