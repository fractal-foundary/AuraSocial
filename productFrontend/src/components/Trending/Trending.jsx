import Search from "./Search";
import WhatsHappening from "./WhatsHappening";
import WhotoFollow from "./whotofollow";

function Trending() {
    return (
        <div className="trend 2xl:w-[75%] h-fit flex-col hidden lg:flex">
            <Search />
            <WhatsHappening />
            <WhotoFollow />
        </div>
    );
}

export default Trending;