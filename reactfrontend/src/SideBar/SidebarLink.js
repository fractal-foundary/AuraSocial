import './SidebarLink.css';
import { IconContext } from "react-icons";
// doing some routing shouting...
import { NavLink } from "react-router-dom";

function SidebarLink({ text, Icon, link }) {
    if (text === "logo") {
        return (
            <li
                class="flex gap-3 items-center w-fit px-4 py-1 hover:bg-[#181818] hover:cursor-pointer hover:rounded-full">
                <div class="logo w-8 m-auto hover:bg-[#181818] hover:cursor-pointer pt-3">
                    <IconContext.Provider value={{ className: "material-symbols-outlined text-4xl" }}>
                        <Icon />
                    </IconContext.Provider>
                </div>
            </li>
        );
    }
    else {
        return (
            <NavLink to={link}>
                <li className="flex gap-3 items-center w-fit px-4 py-1 hover:bg-[#181818] hover:cursor-pointer hover:rounded-full">
                    <IconContext.Provider value={{ className: "material-symbols-outlined text-3xl" }}>
                        <Icon />
                    </IconContext.Provider>
                    <span className="hidden sm:block">{text}</span>

                </li >
            </NavLink>
        );
    }
}

export default SidebarLink;