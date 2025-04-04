import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
                <nav className="flex space-x-8 ml-8">
                    <a href="#" className="text-black p-3 text-lg hover:bg-gray-100 ">Home</a>
                    <a href="#" className="text-black p-3  text-lg hover:bg-gray-100">About</a>
                    <a href="#" className="text-black p-3  text-lg hover:bg-gray-100">Services</a>
                    <a href="#" className="text-black p-3  text-lg hover:bg-gray-100">Contact</a>
                </nav>
                <div className="px-6 py-3 pt-6 flex justify-end bg-transparent">

                    <Link to="/Login">
                        <button
                            className="bg-black hover:scale-105 
          transition-transform duration-300 items-center rounded-full 
          text-white shadow-lg px-7 py-4 text-xl">
                            Sign in
                        </button>

                    </Link>
                </div>
            </div>
  )
}

export default Navbar