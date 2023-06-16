import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import { useSelector } from "react-redux";
import './ProfilePage.css';
import { useState } from "react";
import Posts from "../../components/Posts/Posts";

export default function ProfilePage () {
    const user = useSelector((state) => state.User.user);
    const [newName, setNewName] = useState(user?.username);
    const [newProfile, setNewProfile] = useState('');

    return (
        <div className="flex w-full h-full">
            <HomeSideBar user={user}/>
            <div className="flex flex-col w-full h-full px-[10px] py-[10px] overflow-y-auto"> 
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
                                <input onChange={(e) => setNewProfile(e.target.files[0])} type="file" className="fileInput"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center h-full justify-between">
                        <div className="flex md:flex-col gap-[20px] py-[10px]">
                            <div>
                                <div>
                                    Username:
                                </div>
                                <div>
                                    {(user?.username)? <input onChange={(e) => setNewName(e.target.value)} value={newName} className="bg-gray-200 rounded-[5px] border-[2px] focus:border-black" type="text"/> : 'name'}
                                </div>
                            </div>
                            <div>
                                <div>
                                    Email:
                                </div>
                                <div>
                                    {(user?.email)? user.email : 'name'}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-[125px] h-[40px] rounded-[5px] bg-green-500 transition-all duration-200 cursor-pointer hover:bg-green-600 active:scale-95">
                            Save Changes
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-[10px] md:overflow-y-auto">
                    <div className="text-[20px] font-bold">
                        Your Posts:
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                        <div className="h-auto w-full md:h-auto">
                            <Posts/>
                        </div>
                        <div className="h-auto w-full md:h-auto">
                            <Posts/>
                        </div>
                        <div className="h-auto w-full md:h-auto">
                            <Posts/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}