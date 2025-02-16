import React, { useState, useEffect } from 'react';
import navElements from './index.js';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile.jsx';

const Navbar = ({isAuthenticated,setIsAuthenticated}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar when screen size becomes large
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle click outside to close sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('aside') && !event.target.closest('i')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <header className='bg-black/30 backdrop-blur-md w-full h-18 flex justify-between items-center px-4 text-white fixed top-0 left-0 z-20'>
            <nav className='flex justify-between w-full items-center py-4'>
                <Link to="/"><img src="./logo.png" alt="" /></Link>
                <ul className='space-x-4 hidden lg:flex justify-center items-center'>
                    {navElements.map((element, index) => (
                        <li key={index} className='cursor-pointer hover:text-gray-300 font-semibold text-[18px]'>
                            <Link to={element[1]}>{element[0]}</Link>
                        </li>
                    ))}
                </ul>


                <ul className='space-x-4 hidden lg:flex'>
                    <li>
                        <button className={`px-4 py-2 bg-transparent border border-white rounded-md cursor-pointer hover:bg-white hover:text-black font-semibold transition-colors duration-300 ${isAuthenticated?'hidden':''}`}>
                            <Link to="/login">Login</Link>
                        </button>
                    </li>
                    {isAuthenticated && 
            <UserProfile setIsAuthenticated={setIsAuthenticated} />}
                </ul>
            <div className='flex items-center justify-end space-x-3 lg:hidden'>
            {isAuthenticated && 
            <UserProfile setIsAuthenticated={setIsAuthenticated} />}

                <button 
                    className="lg:hidden z-30" 
                    onClick={handleClick}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    <i className={`ri-menu-line text-xl ${isOpen ? 'hidden' : 'block'} cursor-pointer`}></i>
                </button>
            </div>

            </nav>

            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/30 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside 
                className={`fixed top-0 right-0 bg-black/90 backdrop-blur-md w-64 h-screen transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } z-30 lg:hidden`}>
                        <i className={`absolute top-4 right-4 ri-close-fill text-2xl ${isOpen ? 'block' : 'hidden'} cursor-pointer`} onClick={() => setIsOpen(false)}></i>
                <ul className='flex flex-col space-y-6 p-6 mt-20'>
                    {navElements.map((element, index) => (
                        <li 
                            key={index} 
                            className='cursor-pointer hover:text-gray-300 font-semibold text-[18px] w-full p-2'
                            onClick={() => setIsOpen(false)}
                        >
                            <Link to={element[1]}>{element[0]}</Link>
                        </li>
                    ))}
                    <li className="pt-4">
                    <Link to="/login">
                        <button className={`w-full px-4 py-2 bg-transparent border border-white rounded-md cursor-pointer hover:bg-white hover:text-black font-semibold transition-colors duration-300 ${isAuthenticated?'hidden':''}`} onClick={() => setIsOpen(false)}>
                        Login
                        </button></Link>
                    </li>

                </ul>
            </aside>
        </header>
    );
}

export default Navbar;