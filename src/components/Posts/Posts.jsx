export default function Posts (props) {
    return (
        <div className="flex flex-col gap-[10px] bg-blue-200 px-[15px] py-[10px] rounded-[5px]">
            <div className="flex gap-[10px] h-auto items-center">
                <img alt="" className="h-[35px] w-[35px] rounded-full bg-white"/>
                <div className="font-bold hover:underline cursor-pointer">
                    user
                </div>
            </div>
            <div className="w-full h-[150px] sm:h-[200px] md:h-[250px]">
                <img alt="" className="w-full h-full rounded-[5px] bg-white"/>
            </div>
            <div className="flex w-full">
                message
            </div>
        </div>
    )
}