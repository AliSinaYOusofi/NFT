import axios from "axios";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import {GrFormPrevious, GrFormNext} from 'react-icons/gr';


export default function NFTCards({address}) {
  
  // ok this comp works just fine
  const [nft, setNFT] = useState([]);
  const parentRef = useRef();

  useEffect(() => {

    const getNFTData = async () => {
      
    const axios = require('axios').default;

    const options = {
      method: 'GET',
      url: `https://api.nftport.xyz/v0/nfts/${address}`,
      params: {chain: 'ethereum', include : "metadata", page_size:"40"},
      headers: {'Content-Type': 'application/json', Authorization: "c3b768eb-2904-4e59-8c85-bc156a4a9b6a"}
    };
    try {
      const response = await axios.request(options)
      setNFT(response.data.nfts);
    } catch(error) { console.log(error)}
  }

  getNFTData();
  }, []);
  
  const sliderLeft = () => { parentRef.current.scrollLeft = parentRef.current.scrollLeft + 500;}
  const sliderRight = () => { parentRef.current.scrollLeft = parentRef.current.scrollLeft - 500; }

  console.log(nft, "nft cards")
  return (
    <div className="lg:w-[95%] mt-10 w-full cards overflow-scroll scroll-smooth scrollbar-hide  flex flex-row   justify-center items-center text-sm gap-x-1 text-black" ref={parentRef}  >
      {
        nft.map((item) => (
          <Link prefetch={false} href={{pathname: "/OneNFT", query:{contract_address: item.contract_address, token_id: item?.token_id, name: item?.metadata.name} }}>

            <div ket={item?.contract_address} className="" >
              {
                item.cached_file_url 
                ? <div className="group relative rounded-xl cursor-pointer 
                w-[20rem] mt-10 items-center justify-center transition-all duration-300">
                      <Image
                        src={item?.cached_file_url}
                        alt=""
                        height={220}
                        width={180}
                        layout="responsive"
                        objectFit="cover"
                        loading="lazy"
                        className=" w-[250px] h-[100px] rounded-xl"
                      />
                    <div className="absolute  bg-gradient-to-t from-black/50 rounded-xl w-full h-full hidden group-hover:flex transition-all duration-300 top-0"> </div>
                    <div className="text-white absolute  items-start ml-5 
                    flex-col justify-start  top-[80%] font-sembiold font-extrabold lg:text-2xl
                    flex w-full invisible mt-2 transition-all duration-300 group-hover:visible group-hover:mt-0">
                      <p>BoredApe</p>
                      <div> 
                        <button className="px-6 py-2 rounded-md backdrop-blur-md text-sm ml-1 transition-all duration-300 hover:backdrop-blur-sm"> Buy </button>
                        <button className="px-6 py-2 rounded-md backdrop-blur-md text-sm ml-1 transition-all duration-300 hover:backdrop-blur-sm"> Details </button>
                      </div>
                    </div>
                  </div>
                : ""
              }
            </div>
          </Link> 
        ))
      }
      <div className="flex items-center justify-center ">
        <div className="flex items-center justify-center 
        backdrop-blur-xl w-fit h-fit p-1 rounded-full 
        absolute text-white lg:top-[63%] top-[85%]
        md:top-[78%] left-[0.5%] transition-all 
        duration-200 cursor-pointer hover:backdrop-blur-sm">
          <GrFormPrevious onClick={sliderLeft} color={"white"} size={40} />
        </div>
        <div className="backdrop-blur-xl w-fit h-fit p-1
        rounded-full absolute  right-[0.5%] top-[85%]
        lg:top-[63%] md:top-[78%] transition-all duration-200 
        cursor-pointer  hover:backdrop-blur-sm">
          <GrFormNext onClick={sliderRight} size={40} />
        </div>
      </div>

    </div>
  );
}