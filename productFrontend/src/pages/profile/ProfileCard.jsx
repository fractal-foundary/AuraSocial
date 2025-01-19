import React, { useState, useContext } from 'react';
import { FaUserCircle } from "react-icons/fa";
import ProfileEdit from './ProfileEdit.jsx'
import AuthContext from '../../context/AuthContext';


function ProfileCard() {
    const [isEditOpen, setIsEditOpen] = useState(false);
    let { username } = useContext(AuthContext)
    username = "gooniemashroomi"

    const handlenftminting = () => {
        // below link will redirect you to nftminter app, deployed on vercel.
        window.location.href = "https://nftminter-zeta.vercel.app/";
    };

    return (
        <>
            <div className="w-full overflow-hidden shadow-md mt-20">
                <div className="h-32 bg-gray-200">banner</div>
                <div className="px-4 py-4">
                    <div className="flex items-center pl-2">
                        <div className="relative -top-12 -mb-10">
                            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                                <FaUserCircle size={1000} className="text-gray-500" />
                            </div>
                        </div>
                        <div className="ml-auto flex flex-col gap-2">
                            <button
                                onClick={() => setIsEditOpen(true)}
                                className="px-4 py-2 bg-white text-blue-500 rounded-full border border-blue-300 text-sm font-semibold"
                            >
                                Edit profile
                            </button>
                            <button className="px-4 py-2 bg-white text-blue-500 rounded-full border border-blue-300 text-sm font-semibold" onClick={handlenftminting}>
                                Mint tokens
                            </button>
                        </div>
                    </div>
                    <div className='pl-2'>
                        <div className="mt-2 flex items-center gap-x-2">
                            <h2 className="text-xl font-bold">Gyan Dev</h2>
                            <span className='text-gray-100 bg-gray-500 font-light text-xs rounded p-1'>Social</span>
                        </div>
                        <p className="text-gray-600">@{username}</p>
                        <p className="mt-2 text-gray-700">This is just a sample profile :)</p>
                        <div className="mt-4 text-gray-600 text-sm">
                            <span className="mr-4">Joined October 2020</span>
                        </div>
                        <div className="mt-2 flex text-sm text-gray-600">
                            <span className="mr-4"><strong>0</strong> Following</span>
                            <span><strong>0</strong> Followers</span>
                        </div>
                    </div>
                </div>
            </div>

            {isEditOpen && <ProfileEdit onClose={() => setIsEditOpen(false)} />}
        </>
    );
}

export default ProfileCard;