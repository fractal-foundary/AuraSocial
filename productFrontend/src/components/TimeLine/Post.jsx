
// IconContext is used here to style the react-icons components.
import { IconContext } from "react-icons";

// Icons to be used in all the posts.
import { FaRegComment } from "react-icons/fa";
import { LuRepeat2 } from "react-icons/lu";
import { IoHeartOutline } from "react-icons/io5";
import { BiBarChart } from "react-icons/bi";

// Icons to be used in the post after database integeration...
import { PiBookmarkSimple } from "react-icons/pi";
import { MdIosShare } from "react-icons/md";
// for tipping.
import { SiBuymeacoffee } from "react-icons/si";
import { FaRegUserCircle } from "react-icons/fa";
// StyleIcon: function used to style the icons used in post.As they all have exactly same styling.
function StyleIcon({ Icon, Colour }) {
    return (
        <IconContext.Provider value={{ className: "material-symbols-outlined cursor-pointer hover:bg-[" + Colour + "] p-1 rounded-full text-3xl" }}>
            <Icon />
        </IconContext.Provider>
    );
}

function Post({ content, gifUrl, timestamp }) {
    return (
        <div className="posts border-2 border-blue-100 rounded-lg">
            <div className="post">
                <div className="flex">
                    {/* User's image from the database...*/}
                    <div className="w-12 h-12 flex-shrink-0 text-gray-400 m-4">
                        <FaRegUserCircle size="100%" />
                    </div>
                    <div className="content my-4 flex gap-2">
                        <div className="">

                            {/* contains the user info. who created the post... */}
                            <span className="font-semibold hover:underline cursor-pointer">Gyan Dev </span>
                            <span className="opacity-70">gyandev</span>
                            <span className="opacity-70">·</span>
                            <span className="opacity-70 text-xs"> {new Date(timestamp).toLocaleString()}</span>

                            {/* below is the post posted by user on timeline. */}
                            <div className="caption text-lg">
                                <div className="flex flex-col gap-3">
                                    <p>{content}</p>
                                </div>
                            </div>

                            {/* TODO: below image is just for show, in the feed one can share any kind of media file.So, this media files are coming from the user and going to be stored in database. */}
                            <div className="m-4 ml-0">
                                <img className="rounded-xl" src="https://pbs.twimg.com/media/GN5pwpZWEAEZJcf?format=jpg&name=small
                                " alt="" />
                            </div>

                            {/* Icons attached with every post on timeline. */}

                            <div className="icons flex items-start gap-x-2">
                                <div className="3 flex items-center gap-1 text-gray-500 hover:text-[#f91880]">
                                    <StyleIcon Icon={IoHeartOutline} Colour="#FF204E" />
                                    <span>0</span>
                                </div>
                                <div className="1 flex items-center gap-1 text-gray-500 hover:text-[#84cc16] ">
                                    <StyleIcon Icon={FaRegComment} Colour="#84cc16" />
                                    <span className='text-1'>0</span>
                                </div>
                                {/* <div className="2 flex items-center gap-1 text-gray-500 hover:text-[#15F5BA]">
                                    <StyleIcon Icon={LuRepeat2} Colour="#15F5BA" />
                                    <span className='text-1'>0</span>
                                </div> */}

                                {/* <div className="4 flex items-center gap-1 text-gray-500 hover:text-[#FFEA20]">
                                    <StyleIcon Icon={BiBarChart} Colour="#FFEA20" />
                                    <span>652K</span>
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <hr className="opacity-60 h-[0.3px]"></hr>
        </div>
    );
}

export default Post;