
// creating new post
import NewPost from './Newpost';

// all the post on the timeline.
import Post from './Post';
import PostCard from '../../pages/profile/PostCard';

function Timeline() {
    return (
        <div className=' w-full mx-12 mt-4'>


            {/* NewPost: seperate component for user to create a new post. 
                Because this component going to be interacting with the database, so it is important for it to be seperate... */}
            <NewPost />




        </div>
    )
}

export default Timeline;