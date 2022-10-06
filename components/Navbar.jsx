import React, {useEffect, useRef, useState} from 'react'
import {SiMarketo} from 'react-icons/si';
import {CgProfile} from 'react-icons/cg';
import {BsBookmarkHeartFill, BsSearch} from 'react-icons/bs';
import {GoNoNewline, GoThreeBars} from 'react-icons/go';
import {IoMdClose, IoMdCloseCircleOutline} from 'react-icons/io';
import MobileNav from './MobileNav';
import gsap from 'gsap';
import SearchBar from './SearchBar';

export default function Header() {

    const [burger, setBurger] = useState(true);
   
    const [input, setInput] = useState(false);

    let mobileNav = useRef(null);

    const changeBurger = () => {
        setBurger(!burger);
        burger 
            ? gsap.to(mobileNav, {x: 0, duration: 1, opacity: 100, stagger: 0.4, ease: "back"}) 
            : gsap.to(mobileNav, {x: 1000, duration: 1, opacity: 2, stagger: 0.4, ease: "back.in"})
    };

    useEffect( () => {

        gsap.to(mobileNav, {
            x: 1000,
            opacity: 0,
            duration: 1,
            stagger: 0.4,
            ease: "back.in"
        });
       
    }, []);

    const handleInput = (e) => setInput(e.target.value)
    return (
        <>
            <div className="px-4 py-5 w-full h-fit gap-x-1  text-white flex justify-between lg:justify-around text-xl items-center">
            <div className="flex items-center justify-center">
                <SiMarketo className="text-4xl open"/>
                <h1 className="header lg:font-semibold lg:text-xl hidden">OpenSea</h1>
            </div>
            <div className="flex items-center justify-between lg:justify-between ">
                <IoMdCloseCircleOutline onClick={() => {setInput(""); }} className="cursor-pointer absolute search top-13 left-[14%] md:left-[14%] text-gray-600 lg:flex " size={30}/>
                <input onChange={handleInput}  className="md:w-[30rem] input w-[19rem] text-[seashell] text-center px-1 py-2 rounded-md outline-none md:placeholder:text-md placeholder:text-[0.7rem]  placeholder:text-gray-300 bg-[#222428]" type='text' placeholder="search items, collections, and accounts." required />
            </div>
            <div className="pop md:hidden lg:flex items-center justify-center gap-x-3 hidden">
                <ul className="flex items-center justify-center gap-x-4">
                    <li className="cursor-pointer hover:text-gray-500 transition-all duration-500 px-4">Explore</li>
                    <li className="cursor-pointer hover:text-gray-500 transition-all duration-500 px-4">Stats</li>  
                    <li className="cursor-pointer  hover:text-gray-500 transition-all duration-500 px-4">Resources</li>
                    <li className="cursor-pointer hover:text-gray-500 transition-all duration-500 px-4">Create</li>
                </ul>
                <div className="w-fit h-fit transition-all duration-300 hover:shadow-md hover:shadow-current px-2 py-2 rounded-full cursor-pointer">
                    <CgProfile size={30}/>
                </div>
                <div className="w-fit h-fit transition-all duration-300 hover:shadow-md hover:shadow-current px-2 py-2 rounded-full cursor-pointer">
                    <BsBookmarkHeartFill size={30}/>
                </div>
                
            </div>
            <BsSearch className="md:flex lg:hidden flex cursor-pointer" size={30}/>
            { burger 
                ? <GoThreeBars onClick={changeBurger} className="lg:hidden flex cursor-pointer" size={40}/>
                : <IoMdClose onClick={changeBurger} className="lg:hidden flex cursor-pointer" size={40}/>
            }
        </div>
        <div ref={el => mobileNav = el}>
            {!burger ? <MobileNav/> : ""}
        </div>
        {
            String(input).length >= 3  ? <SearchBar address={input}/> : ""
        }
        </>
  );
}
