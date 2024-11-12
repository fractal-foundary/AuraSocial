import React from 'react'
import Sidebar from '../../components/SideBar/sidebar'
import ProfileHeader from './ProfileHeader'
import ProfileCard from './ProfileCard'
import Post from '../../components/TimeLine/Post'
import PostCard from './PostCard'
function ProfilePage() {

    return (
        <div className='flex '>
            <Sidebar></Sidebar>
            <div className='w-full ml-[20%]'>
                <ProfileHeader></ProfileHeader>
                <ProfileCard></ProfileCard>
                <PostCard></PostCard>
                <PostCard></PostCard>
                <PostCard></PostCard>
                <PostCard></PostCard>
            </div>
        </div>
    )
}

export default ProfilePage