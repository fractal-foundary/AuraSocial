import React from "react";
import bg from './bgAura.jpg'
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <img className="bg-cover bg-centre h-screen w-full" src={bg} alt='bgimage' />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center">
                <header className="text-center">
                    <h1 className="text-white text-5xl font-bold mb-4">
                        Welcome to Aura Social Fi
                    </h1>
                    <p className="text-gray-300 text-xl mb-8">
                        A decentralized platform for Social Finance
                    </p>
                    <button className="bg-yellow-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-yellow-700 transition duration-300" onClick={() => navigate('/signup')}>
                        Register Now
                    </button>
                </header>
            </div>
        </>

    );
};

export default LandingPage;