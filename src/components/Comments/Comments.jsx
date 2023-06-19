export default function Comments (props) {
    return (
        <div className="flex flex-col gap-[10px] w-full w-full bg-blue-300 px-[15px] py-[10px] rounded-[5px]">
            <div className="flex gap-[10px]">
                <div>
                    <img src={props?.data?.user?.profilePicture} alt="" className="w-[35px] h-[35px] rounded-full"/>
                </div>
                <div>
                    {props?.data?.user?.username || 'name'}
                </div>
            </div>
            <div>
                {props?.data?.comment || 'comment'}
            </div>
        </div>
    )
}