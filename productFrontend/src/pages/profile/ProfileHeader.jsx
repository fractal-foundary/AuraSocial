import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
function ProfileHeader() {
    return (

        <>
            <div className='bg-white w-full shadow-md flex mx-0 z-50 fixed'>
                <IoMdArrowRoundBack className='m-4 w-8 h-8 cursor-pointer' />
                <div className='flex-col flex p-4'>
                    <span>Example account</span>
                    <span>0 posts</span>
                </div>
            </div>

        </>
    )
}

export default ProfileHeader