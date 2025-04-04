import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser } = useAuth();
    return (
        <div className="flex justify-between items-center">
            <nav className="flex space-x-8 ml-8">
                <RouterLink to="/">
                    <p className="text-black p-3 text-lg hover:bg-gray-100">Home</p>
                </RouterLink>
                <RouterLink to="/About">
                    <p className="text-black p-3  text-lg hover:bg-gray-100">About</p>
                </RouterLink>
                <ScrollLink to="services" smooth={true} duration={500} className="text-black p-3 text-lg hover:bg-gray-100 cursor-pointer">
                    Services
                </ScrollLink>
                <ScrollLink to="contact" smooth={true} duration={500} className="text-black p-3 text-lg hover:bg-gray-100 cursor-pointer">
                    Contact
                </ScrollLink>
            </nav>

            <div className="px-6 py-3 pt-6 flex justify-end bg-transparent">
                {currentUser ? (
                    <RouterLink to="/Profile">
                        <button className="bg-gray-800 hover:scale-105 transition-transform duration-300 items-center rounded-full text-white shadow-lg px-6 py-3 text-lg">
                             {currentUser.displayName || "Profile"}
                        </button>
                    </RouterLink>
                ) : (
                    <RouterLink to="/Login">
                        <button className="bg-black hover:scale-105 transition-transform duration-300 items-center rounded-full text-white shadow-lg px-7 py-4 text-xl">
                            Sign in
                        </button>
                    </RouterLink>
                )}
            </div>
        </div>
    )
}

export default Navbar;
