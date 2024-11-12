
// creating new post
import NewPost from './Newpost';

// all the post on the timeline.
import Post from './Post';
import PostCard from '../../pages/profile/PostCard';

function Timeline() {
    return (
        <div className='timeline box-border sm:w-full py-4 flex-col flex items-center '>


            {/* NewPost: seperate component for user to create a new post. 
                Because this component going to be interacting with the database, so it is important for it to be seperate... */}
            <NewPost />

            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>

        </div>
    )
}

export default Timeline;