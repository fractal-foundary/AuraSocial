
import { IconContext } from "react-icons";

// more icon
import { LuMoreHorizontal } from "react-icons/lu";

function Trendingtopic({ topic, hashtag, impressions }) {
    return (
        <div className="flex justify-between hover:bg-slate-100 rounded">
            <div className="item my-2 p-2 ">
                <div className=" text-sm text-gray-300">{topic}</div>
                <div className="font-bold">{hashtag}</div>
                <div className=" text-sm text-gray-300">{impressions} Posts</div>
            </div>
            <IconContext.Provider value={{ className: "material-symbols-outlined my-5 px-1 hidden lg:block text-3xl" }}>
                <LuMoreHorizontal />
            </IconContext.Provider>
        </div>
    );
}

function WhatsHappening() {
    return (
        <div className=" m-3 w-[80%] 2xl:w-[75%]  rounded-xl p-5 space-y-2">
            <h1 className="text-xl font-bold px-2">What's Happening</h1>
            <Trendingtopic topic="Trending in Gujarat" hashtag="#Election2024" impressions="400.3k" />
            <Trendingtopic topic="Trending in India" hashtag="#DhruvRathee" impressions="1.2M" />
            <Trendingtopic topic="Trending in Asia" hashtag="#WeSupportPalestine" impressions="20M" />
        </div>
    );
}

export default WhatsHappening;