import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
function ProfileHeader() {
    const navigate = useNavigate();
    return (

        <>
            <div className='bg-white w-full shadow-md flex mx-0 z-50 fixed'>
                <IoMdArrowRoundBack className='m-4 w-8 h-8 cursor-pointer' onClick={() => { navigate("/home") }} />
                <div className='flex-col flex p-4'>
                    <span>Example account</span>
                    <span>0 posts</span>
                </div>
            </div>

        </>
    )
}

export default ProfileHeader