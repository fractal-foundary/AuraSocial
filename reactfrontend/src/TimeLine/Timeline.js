
// creating new post
import NewPost from './Newpost';

// all the post on the timeline.
import Post from './Post';

function Timeline() {
    return (
        <div className='timeline w-[85%] box-border sm:w-full border border-y-0 border-gray-700 mr-0'>
            <div className="top flex p-3 justify-center sticky top-0 backdrop-blur-lg opacity-80 bg-black ">
                <div className="absolute w-16 h-1 bg-[#1d9bf0] bottom-0 left-[23%] rounded-full z-10"></div>
                <div className="left bg-slate-5002 w-[48%] text-center font-semibold text-lg">For You</div>
                <div className="right bg-slate-9002 w-[48%] text-center font-semibold text-lg">Following</div>
            </div>
            {/* line below the header. */}
            <hr className="opacity-50"></hr>

            {/* NewPost: seperate component for user to create a new post. 
                Because this component going to be interacting with the database, so it is important for it to be seperate... */}
            <NewPost />

            {/* Post: all posts on the timeline. */}
            <Post />
        </div>
    )
}

export default Timeline;