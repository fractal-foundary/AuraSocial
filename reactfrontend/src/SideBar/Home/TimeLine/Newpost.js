import './Newpost.css';

// IconContext is used here to style the react-icons components.
import { IconContext } from "react-icons";

// Importing the icons to be used in creating new post.
import { MdOutlinePublic } from "react-icons/md";
import { MdOutlineImage } from "react-icons/md";
import { HiOutlineGif } from "react-icons/hi2";
// I am using "polls" icon instead of "ballot"
import { MdOutlinePoll } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";

// StyleIcon: function used to style the icons used in post.As they all have exactly same styling.
function StyleIcon({ Icon }) {
    return (
        <IconContext.Provider value={{ className: 'material-symbols-outlined text-xl text-[#1d9bf0] cursor-pointer' }}>
            <Icon />
        </IconContext.Provider>
    );
}

function NewPost() {
    return (
        <div>
            <div className="flex gap-4 my-3">
                {/* TODO: insert picture from django api. */}
                <img className="h-12 w-12  m-3 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1791002277685428224/MK3cZ88K_bigger.jpg" alt="" />
                <div className="w-[85%]">
                    <input className="w-full h-7 my-2 text-xl bg-black outline-none text-white" type="text"
                        placeholder="What's good?" />

                    {/* div: contains the icon of "earth", which has different styling than post icons...  */}
                    <div className="text-[#1d9bf0] flex items-center gap-1 w-full my-4">
                        <IconContext.Provider value={{ classNameName: 'material-symbols-outlined text-xl' }}>
                            <MdOutlinePublic />
                        </IconContext.Provider>
                        <span className="font-bold">Everyone can reply</span>
                    </div>

                    {/* this div is line above all the icons.. */}
                    <div className="w-[92.5%] h-[0.2px] my-3 bg-slate-300 opacity-60"></div>

                    {/* div: contains all the icons used in creating new post. */}
                    <div className="icons flex gap-2 justify-between items-center">
                        <div className="flex gap-1 sm:gap-4">
                            <StyleIcon Icon={MdOutlineImage} />
                            <StyleIcon Icon={HiOutlineGif} />
                            <StyleIcon Icon={MdOutlinePoll} />
                            <StyleIcon Icon={BsEmojiSmile} />
                            <StyleIcon Icon={RiCalendarScheduleLine} />
                            <StyleIcon Icon={IoLocationOutline} />
                        </div>
                        {/* "POST" button */}
                        <button className="bg-[#1d9bf0] text-white rounded-full flex items-center   justify-around px-2 sm:px-4 py-1 font-semibold sm:mx-12 sm:ml-3 w-fit h-fit mx-3">
                            <span className="xl:block hidden bg-[#1d9bf0]">Post</span>
                        </button>
                    </div>
                </div>
            </div>
            <hr className="opacity-60" />
        </div>
    );
}

export default NewPost;