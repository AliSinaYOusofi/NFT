import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import {BsClipboardCheck} from 'react-icons/bs'
import {AiOutlineCheckCircle} from 'react-icons/ai';

export default function ({owner, num_sale}) {

  const [clipboard, setClipboard] = useState(true);
  const handleClipboard = () => {
    setClipboard(!clipboard) 
    navigator.clipboard.writeText(owner.address);
  }
  return (
      <div className="text-white ml-auto md:-mt-[11rem] bg-[#141518] 
      rounded-md w-[20rem] h-fit py-2
      flex flex-col justify-center px-4 gap-y-5 mt-5 mr-10 lg:mr-0 backdrop-blur-md">
          <div className="flex justify-between">
            <p> Num Sales </p>
            <p> {num_sale ?? "null"}</p>
          </div>
          <div className="flex justify-between">
            <p> username</p>
            <p> {owner?.user?.username ?? "null"}</p>
          </div>
          <div className="flex justify-between  ">
            <p> Owner </p>
            <p className="flex items-center gap-x-1 cursor-pointer text-gray-500" onClick={handleClipboard}> {String(owner?.address).substring(0, 4) + "..." + String(owner?.address).substring(owner?.address.length - 5) ?? "null"} {!clipboard ? <AiOutlineCheckCircle /> : <BsClipboardCheck />}</p>
          </div>
          <hr />
          <div className="-mt-4 ">
            <div className="flex justify-between">
              <p> Top Bid </p>
              <p> 0</p>
            </div>
            <div className="flex justify-between">
              <p> Blockchain </p>
              <p> Ethereum </p>
            </div>
          </div>
      </div>
  )
}
