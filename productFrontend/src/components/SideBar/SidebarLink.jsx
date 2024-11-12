import './SidebarLink.css';
import { IconContext } from "react-icons";
// doing some routing shouting...
import { NavLink } from "react-router-dom";

function SidebarLink({ text, Icon, link }) {
    if (text === "logo") {
        return (
            <li
                className="flex items-center w-fit py-1  hover:cursor-pointer hover:rounded-full">
                <div className="logo w-8 m-auto  hover:cursor-pointer pt-3">
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
                <li className="flex gap-3 items-center w-fit py-1  hover:cursor-pointer hover:rounded-full">
                    <IconContext.Provider value={{ className: "material-symbols-outlined text-2xl" }}>
                        <Icon />
                    </IconContext.Provider>
                    <span className="hidden sm:block">{text}</span>
                </li >
            </NavLink>
        );
    }
}

export default SidebarLink;