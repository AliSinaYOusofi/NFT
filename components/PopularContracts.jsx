import React, { useState, useEffect } from 'react'
import axios from "axios";
import Image from 'next/image';
import TopOrPopular from './TopOrPopular';

export default function PopularContracts() {
  
  const [top, setTop] = useState(false);
  const handleClick = () => setTop(top => !top);

  return (
    <>
      <div className="w-[100%] h-screen  mt-10 ">
        <div className="flex justify-start ml-10 gap-x-5 text-white">
          <button onClick={handleClick} type="button" className="px-5 py-2 rounded-sm mt-5" style={{backgroundColor: top ? "#222428" : "black", color: !top ? "white" : "black"}}>Trending</button>
          <button onClick={handleClick} type="button" className="px-5 py-2 rounded-sm mt-5" style={{backgroundColor: !top ? "#222428" : "black", color: top ? "white" : "black"}}>Top</button>
        </div>
        <div className="flex flex-wrap w-full items-center justify-center">
          {
            top 
            ? <TopOrPopular address={'0x60e4d786628fea6478f785a6d7e704777c86a7c6'} />
            : <TopOrPopular address={'0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'} />
          }
        </div>
      </div>
    </>
  )
}
