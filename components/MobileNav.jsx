import React, { useState } from 'react'
import {MdExplore, MdDarkMode} from 'react-icons/md'
import {
    BsDiscord, BsReddit, 
    BsYoutube,
    BsLightbulbOff,
    BsLightbulb
}
from 'react-icons/bs';
import {BiStats,  BiMessageSquareDetail, } from 'react-icons/bi';
import {
    AiFillAndroid,
    AiFillTwitterCircle,
} from 'react-icons/ai';

export default function MobileNav() {

    const [theme, setTheme] = useState(true);

    return (
        <div className="z-[99] text-white w-full h-[32.2rem] lg:hidden flex flex-col justify-between  items-center">
            <div className="flex flex-row justify-center items-center mt-14">
                <ul className="flex flex-col gap-y-7">
                    <li className="text-2xl transition-all duration-200  rounded-md px-10 py-2 text-center hover:-translate-x-1 cursor-pointer">
                        <span className="flex items-center"><MdExplore className="" size={25}/> Explore</span>
                    </li>
                    <li className="text-2xl transition-all duration-200  rounded-md px-10 py-2 text-center hover:-translate-x-1 cursor-pointer">
                        <span className="flex items-center"><BiStats size={25}/> Stats</span>
                    </li>
                    <li className="text-2xl transition-all duration-200  rounded-md px-10 py-2 text-center hover:-translate-x-1 cursor-pointer">
                        <span className="flex items-center items-center"><BiMessageSquareDetail size={25}/>Explore</span>
                    </li>
                    <li  className="text-2xl flex items-center transition-all duration-200 rounded-md px-10 py-2 text-center hover:-translate-x-1 cursor-pointer">
                        {
                            theme 
                            ? <BsLightbulb size={25}/>
                            : <BsLightbulbOff size={25}/>
                        } Theme Mode
                    </li>
                </ul>
            </div>
            <div className="flex mb-10 w-full justify-around items-center">
                <div className="flex items-center justify-center w-14 h-fit cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-black rounded-full px-2 py-4">
                    <BsReddit  className=" cursor-pointer" size={30}/>
                </div>
                <div className="flex items-center justify-center w-14 h-fit cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-black rounded-full px-2 py-4">
                    <AiFillAndroid  className="" size={30}/>
                </div>
                <div className="flex items-center justify-center w-14 h-fit cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-black rounded-full px-2 py-4">
                    <BsYoutube  size={30}/>
                </div>
                <div className="flex items-center justify-center w-14 h-fit cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-black rounded-full px-2 py-4">
                    <AiFillTwitterCircle size={30}/>
                </div>
            </div>  
        </div>
  )
}