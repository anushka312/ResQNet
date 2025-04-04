import React from 'react'
import { Link } from "react-router-dom";
import { MapPin, AlertTriangle, Phone } from "lucide-react";
import { Element } from "react-scroll";
import MapView from './MapView';
import { useCrisis } from '../CrisisContext.jsx';
import Services from './Services.jsx';

const Home = () => {
    const { crisisLocations } = useCrisis();
    
    
    return (
        <div>
            <div>
                <p className='text-6xl font-bold text-center p-9 pb-6'>
                    Get Help In Crisis
                </p>
                <p className='text-2xl text-center pb-2'>
                    Stay informed. Act fast. View real-time crises happening near you.
                </p>
            </div>


            <div className="fixed bottom-6 right-6 z-[999]">
                <Link to={{ pathname: "/Report"}}>
                    <button className="bg-red-600 hover:bg-red-700 text-white text-xl px-8 py-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                        🚨 Report a Crisis
                    </button>
                </Link>
            </div>


            <div className='overflow-hidden'>
                <MapView crisisLocations={crisisLocations} />
            </div>

            {/* Emergency Resources */}
            <Link to="/services">
                <div id="services" className="max-w bg-white p-8 mb-6">
                    <h2 className="text-3xl font-bold mb-6 text-black flex items-center gap-2">
                        <Phone className="w-5 h-5 text-blue-400" /> Emergency Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6  text-gray-300 text-lg">
                        <div className="bg-gray-200 p-4 rounded-lg shadow-inner">
                            <p><span className="text-black font-semibold ">National Emergency Number:</span> <a href="tel:112" className="text-blue-800 hover:underline ml-1">112</a></p>
                            <p><span className="text-black font-semibold">Disaster Relief Helpline:</span> <a href="tel:108" className="text-blue-800 hover:underline ml-1">108</a></p>
                        </div>
                        <div className="bg-gray-200 p-4 rounded-lg shadow-inner">
                            <p><span className="text-black font-semibold">Mental Health Support:</span> <a href="tel:9152987821" className="text-blue-800 hover:underline ml-1">9152987821 (iCall)</a></p>
                            <p><span className="text-black font-semibold">Ambulance Services:</span> <a href="tel:102" className="text-blue-800 hover:underline ml-1">102 or 108</a></p>
                        </div>
                        <div className="bg-gray-200 p-4 rounded-lg shadow-inner">
                            <p><span className="text-black font-semibold">Women’s Helpline:</span> <a href="tel:1091" className="text-blue-800 hover:underline ml-1">1091</a></p>
                            <p><span className="text-black font-semibold">Child Helpline:</span> <a href="tel:1098" className="text-blue-800 hover:underline ml-1">1098</a></p>
                        </div>
                    </div>
                </div>
            </Link>
            <hr />
            <Element name="contact">
                <div id="contact" className="bg-white text-center pb-0 mb-0">
                    <h2 className="text-4xl text-black font-bold mb-2 p-6">Contact Us</h2>
                    <p className="text-xl text-gray-600 pb-6">Reach out to us at <u className='text-blue-500'>support@resqnet.com</u>.</p>
                </div>
            </Element>
        </div>

    )
}

export default Home