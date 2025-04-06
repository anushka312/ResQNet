import React from 'react';
import { Link } from "react-router-dom";
import { MapPin, AlertTriangle, Phone } from "lucide-react";
import { Element } from "react-scroll";
import MapView from './MapView';
import { useCrisis } from '../CrisisContext.jsx';
import Services from './Services.jsx';
import { motion } from 'framer-motion';

const Home = () => {
    const { crisisLocations } = useCrisis();

    return (
        <div>
            {/* Animated Heading */}
            <div>
                <motion.p
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className='text-6xl font-bold text-center p-9 pb-6'
                >
                    Get Help In Crisis
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className='text-2xl text-center pb-2'
                >
                    Stay informed. Act fast. View real-time crises happening near you.
                </motion.p>
            </div>

            {/* Animated Button */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="fixed bottom-6 right-6 z-[999]"
            >
                <Link to={{ pathname: "/Report" }}>
                    <button className="bg-red-600 hover:bg-red-700 text-white text-xl px-8 py-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                        🚨 Report a Crisis
                    </button>
                </Link>
            </motion.div>

            <div className='overflow-hidden'>
                <MapView crisisLocations={crisisLocations} />
            </div>

            {/* Emergency Resources */}
            <Link to="/services">
                <div id="services" className="bg-white p-8 mb-6">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-6 text-black flex items-center gap-2"
                    >
                        <Phone className="w-5 h-5 text-blue-400" /> Emergency Resources
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300 text-lg">
                        {[
                            {
                                label: "National Emergency Number",
                                number: "112",
                                extra: "Disaster Relief Helpline: 108"
                            },
                            {
                                label: "Mental Health Support",
                                number: "9152987821 (iCall)",
                                extra: "Ambulance Services: 102 or 108"
                            },
                            {
                                label: "Women’s Helpline",
                                number: "1091",
                                extra: "Child Helpline: 1098"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-gray-200 p-4 rounded-lg shadow-inner"
                            >
                                <p><span className="text-black font-semibold">{item.label}:</span> <a href={`tel:${item.number}`} className="text-blue-800 hover:underline ml-1">{item.number}</a></p>
                                <p><span className="text-black font-semibold">{item.extra.split(':')[0]}:</span> <a href={`tel:${item.extra.split(': ')[1]}`} className="text-blue-800 hover:underline ml-1">{item.extra.split(': ')[1]}</a></p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Link>

            <hr />

            {/* Contact Us */}
            <Element name="contact">
                <motion.div
                    id="contact"
                    className="bg-white text-center pb-0 mb-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl text-black font-bold mb-2 p-6">Contact Us</h2>
                    <p className="text-xl text-gray-600 pb-6">
                        Reach out to us at <u className='text-blue-500'>support@resqnet.com</u>.
                    </p>
                </motion.div>
            </Element>
        </div>
    );
};

export default Home;
