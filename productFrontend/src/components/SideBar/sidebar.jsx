import './sidebar.css';
import SidebarLink from './SidebarLink';

// not using material-ui icons instead using react-icons

import { RiHomeSmileLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { MdOutlineGroups } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { PiCardsLight } from "react-icons/pi";

function Sidebar() {
    return (
        // I removed "xl:w-[60%]" from navigatiion div and got it attached to the sidebar div.
        <div className="navigation w-[15%] sm::flex sm:w-[25%] fixed h-fit border-r-2 border-gray-200">
            <div className="sidebar flex items-center flex-col float-left">
                <ul className="flex flex-col gap-4 text-lg font-semibold px-4 pl-8 items-center sm:items-start">
                    <SidebarLink text="logo" Icon={PiCardsLight} link="/home" />
                    <SidebarLink text="Home" Icon={RiHomeSmileLine} link="/home" />
                    <SidebarLink text="Explore" Icon={IoIosSearch} link="/explore" />
                    <SidebarLink text="Notifications" Icon={FaRegBell} link="/notifications" />
                    <SidebarLink text="Messages" Icon={IoChatbubblesOutline} link="/messages" />
                    <SidebarLink text="Bookmarks" Icon={FiBookmark} link="/bookmarks" />
                    <SidebarLink text="Communities" Icon={MdOutlineGroups} link="/communities" />
                    <SidebarLink text="Premium" Icon={MdAttachMoney} link="/premium" />
                    <SidebarLink text="Profile" Icon={GoPerson} link="/home/profile" />
                    <SidebarLink text="More" Icon={IoIosMore} link="/more" />
                    <li className="">
                        <div className="md:w-full m-1">
                            <button
                                className="mx-auto bg-[#1d9bf0] text-sm md:text-xl my-4 text-white rounded-full flex items-center px-3 py-1 sm:px-20 sm:py-3 font-semibold">
                                <span className="bg-[#1d9bf0]">Post</span>
                            </button>
                        </div>
                    </li>
                </ul>
                <div className="w-[70%] ml-9 justify-between rounded-full items-center mt-6 hidden xl:flex hover:cursor-pointer">
                    <div className="item my-2 p-2 flex gap-1">
                        <img src="https://pbs.twimg.com/profile_images/1791002277685428224/MK3cZ88K_bigger.jpg" alt="" className="w-10 h-10 rounded-full" />
                        <div className="mx-0">
                            <div className="font-semibold ">Gyan Dev</div>
                            <div className=" text-sm text-gray-300">@goonie</div>
                        </div>
                        <div className='material-symbols-outlined text-2xl ml-8 pt-2 '><IoIosMore /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;