
import { IconContext } from "react-icons";

// searach icon
import { GoSearch } from "react-icons/go";

function Search() {
    return (
        <div className="search rounded-full bg-[#202327] w-[80%] flex items-center mx-3 my-3">
            {/* TODO: improve the search icon styling in future after database connectivity... */}
            <IconContext.Provider value={{ className: "material-symbols-outlined p-2 pl-3 text-4xl rounded-full bg-[#202327]" }}>
                <GoSearch />
            </IconContext.Provider>
            <input type="text" className="w-full rounded-full bg-[#202327] text-white px-4 py-2 outline-none"
                placeholder="Search" />
        </div>
    );
}

export default Search;