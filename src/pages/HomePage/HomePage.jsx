import { useEffect, useState } from "react"
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import Posts from "../../components/Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/features/Post/PostSlice";
import { toast } from "react-hot-toast";

export default function HomePage () {
    const user = useSelector((state) => state.User.user);
    const posts = useSelector((state) => state.Post.posts);
    const [image, setImage] = useState({});
    const call = useDispatch();

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
            <HomeSideBar user={user}/>
            <div className="flex flex-col flex-grow gap-[10px] bg-gray-300 px-[10px] py-[10px] overflow-y-auto overflow-x-hidden">
                <div className="w-full text-[24px]">
                    Explore
                </div>
                <div className="flex justify-center w-full h-auto">
                    <div className="flex flex-col gap-[10px] bg-blue-200 w-[300px] sm:w-[400px] h-[250px] md:w-[500px] md:h-[200px] px-[15px] py-[10px] rounded-[5px]">
                        <div className="w-full h-[100px]">
                            <textarea className="w-full h-full resize-none rounded-[5px] px-[10px] py-[5px]"/>
                        </div>
                        <div >
                            Upload image: <input onChange={(e) => setImage(e.target.files[0])} type="file"/>
                        </div>
                        <div className="flex w-full justify-end">
                            <div className="bg-green-500 px-[15px] py-[5px] rounded-[5px] transition-scale duration-200 cursor-pointer hover:bg-green-600 active:scale-95">
                                Post
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-[20px] items-center">
                    {
                        (posts)?
                        posts.map((value, index) => {
                            return(
                                <div key={index} className="w-[300px] sm:w-[400px] h-auto md:w-[500px] md:h-auto">
                                    <Posts data={value}/>
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