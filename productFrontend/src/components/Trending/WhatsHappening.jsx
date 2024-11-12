
import { IconContext } from "react-icons";

// more icon
import { LuMoreHorizontal } from "react-icons/lu";

function Trendingtopic({ topic, hashtag, impressions }) {
    return (
        <div className="flex justify-between hover:bg-slate-100 rounded">
            <div className="item my-2 p-2 ">
                <div className=" text-sm text-gray-300">{topic}</div>
                <div className="font-bold">{hashtag}</div>
                <div className=" text-sm text-gray-300">{impressions}</div>
            </div>
            <IconContext.Provider value={{ className: "material-symbols-outlined my-5 px-1 hidden lg:block text-3xl" }}>
                <LuMoreHorizontal />
            </IconContext.Provider>
        </div>
    );
}

function WhatsHappening() {
    return (
        <div className=" m-2 rounded-xl p-2 space-y-2">
            <h1 className="text-xl font-bold px-2">Popular NFTs</h1>
            <Trendingtopic topic="Trending in Dogs Collection" hashtag="#chuwava" impressions="0.5eth" />
            <Trendingtopic topic="Trending in Meta collection" hashtag="#Lens2025" impressions="1eth" />
            <Trendingtopic topic="Trending in Roblox collection" hashtag="#noob" impressions="0.001eth" />
        </div>
    );
}

export default WhatsHappening;