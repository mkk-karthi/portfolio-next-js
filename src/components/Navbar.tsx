"use client"
import React, { useState } from 'react'
import { navItems } from '@/data/data'
import Image from 'next/image';

const Navbar = () => {
    const [selected, setSelected] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = (label: string) => {
        setSelected(label);
        const idMap: { [key: string]: string } = {
            "Home": "home",
            "About": "about",
            "Project": "project",
            "Contact": "contact"
        };
        const element = document.getElementById(idMap[label]);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="fixed w-full max-w-[90%] sm:max-w-[80%] h-16 bg-black/60 dark:bg-neutral-800/60 text-white px-3 lg:px-10 lg:px-2.5 py-2 rounded-full backdrop-blur-xl shadow-2xl shadow-black/50 mx-auto flex items-center justify-between z-50 border-b-2 border-border-gray">
            {/* Left Menu (Desktop) */}
            <div className="hidden md:flex flex-1 justify-start gap-2 lg:gap-4">
                {navItems.slice(0, 2).map((item) => (
                    <button
                        key={item.label}
                        className={`w-20 lg:w-26 h-12 flex items-center justify-center rounded-full text-base font-medium transition duration-300 ${selected === item.label ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold shadow-lg shadow-blue-500/20 border border-border-gray' : 'bg-transparent hover:bg-white/10 hover:text-white'}`}
                        onClick={() => handleScroll(item.label)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Logo */}
            <div className="flex flex-col items-center flex-shrink-0 cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-sky-500 rounded-full flex items-center justify-center mb-1 shadow-md shadow-blue-500/20">
                    
                    <Image
                        src="/logo.svg"
                        alt="MKK Creation"
                        width={50}
                        height={50}
                        priority
                    />
                    {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <text x="4" y="18" fontSize="12" fontWeight="bold" fill="white">MKK</text>
                    </svg> */}
                </div>
            </div>

            {/* Right Menu (Desktop) */}
            <div className="hidden md:flex flex-1 justify-end gap-2 lg:gap-4">
                {navItems.slice(2).map((item) => (
                    <button
                        key={item.label}
                        className={`w-20 lg:w-26 h-12 flex items-center justify-center rounded-full text-base font-medium transition duration-300 ${selected === item.label ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold shadow-lg shadow-blue-500/20 border border-border-gray' : 'bg-transparent hover:bg-white/10 hover:text-white'}`}
                        onClick={() => handleScroll(item.label)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <div className='flex items-center justify-between gap-2'>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.label}
                            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 transition-all shadow-md"
                            onClick={() => handleScroll(item.label)}
                        >
                            <Icon size={16} />
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}

export default Navbar;
