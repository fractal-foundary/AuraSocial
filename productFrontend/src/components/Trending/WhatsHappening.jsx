
import { IconContext } from "react-icons";
import { FaUserCircle } from "react-icons/fa";
// more icon
import { LuMoreHorizontal } from "react-icons/lu";

function Trendingtopic({ topic, hashtag, impressions }) {
    return (
        <div className="flex justify-between hover:bg-slate-100 rounded items-center">
            <div className="item my-2 p-2 ">
                <div className=" text-sm text-gray-300">{topic}</div>
                <div className="font-bold">{hashtag}</div>
                <div className=" text-sm text-gray-300">{impressions}</div>
            </div>
            <IconContext.Provider value={{ className: "material-symbols-outlined my-5 px-1 hidden lg:block text-3xl" }}>
                <FaUserCircle></FaUserCircle>
            </IconContext.Provider>
        </div>
    );
}

function WhatsHappening() {
    return (
        <div className=" m-3 w-[80%] 2xl:w-[75%]  rounded-xl p-5 space-y-2">
            <h1 className="text-xl font-bold px-2">Popular Tokens</h1>
            <Trendingtopic topic="username" hashtag="Name of token" impressions="$1.20" />
            <Trendingtopic topic="username" hashtag="Name of token" impressions="$1.20" />

        </div>
    );
}

export default WhatsHappening;