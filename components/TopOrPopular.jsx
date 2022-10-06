import React, { useState, useEffect } from 'react'
import axios from "axios";
import Image from 'next/image';
import NewNotable from './NewNotable';
import Link from 'next/link';

export default function TopOrPopular({address}) {
    
  const [nft, setNFT] = useState([]);

  useEffect(() => {

    const getNFTData = async () => {
      
    const axios = require('axios').default;

    const options = {
      method: 'GET',  
      url: `https://api.nftport.xyz/v0/nfts/${address}`,
      params: {chain: 'ethereum', include : "metadata", page_size:"10"},
      headers: {'Content-Type': 'application/json', Authorization: "c3b768eb-2904-4e59-8c85-bc156a4a9b6a"}
    };
    axios
      .request(options)
        .then(response => setNFT(response.data.nfts))
        .catch( error => console.log(error));
    }
    getNFTData();
    }, [address]);   
    
    console.log(nft);
    return (
        <>
          {
          nft.map( (item, index) => {
              return (
                <div className=" flex md:gap-x-10 gap-x-4  justify-start items-center text-white lg:w-[35rem] w-[25rem] h-[6rem] rounded-md    md:ml-10 mt-5
                  transition-all duration-200 bg-black/10  hover:-translate-x-1  shadow-md  cursor-pointer">
                  <Link href={{pathname: "/OneNFT", query:{contract_address: item.contract_address, token_id: item?.token_id, name: item?.metadata.name} }}>
                    <div className="flex items-center md:gap-x-5 gap-x-3  justify-start">
                      <span className="ml-5 text-[gray] md:text-3xl text-xl">{index}</span>
                      {
                        item?.cached_file_url 
                        ? <Image 
                            src={item?.cached_file_url}
                            alt=""
                            height={80}
                            width={80}
                            className="rounded-full"
                          /> 
                        : ""
                      }
                    </div>
                  </Link>
                  <div>
                    <p className="text-white backdrop-blur-lg backdrop:blur-3xl clamp md:text-sm text-[0.6rem]">{item?.owner ? item?.owner : item?.metadata.name}</p>
                  </div>
                </div>
              )
            })
          }
      <h1 className="mt-10 font-bold text-4xl text-left">New And Notable</h1>
      <div className=" mt-5 ml-3 lg:flex lg:flex-row lg:gap-y-0 flex-col   flex-wrap items-center justify-center gap-x-2  tracking-tight">
        <NewNotable address={'0xd1258db6ac08eb0e625b75b371c023da478e94a9'}/> 
        <NewNotable address={'0x1185e1eef5d34fdac843bb6b15fd9ac588a3ab21'}/> 
        <NewNotable address={'0xffc1131dda0299b804c97c436bc8cfea019e00a0'}/> 
        <NewNotable address={'0xac0eb19063932aa59dc1eef989f79c959d225c52'}/> 
        <NewNotable address={'0x2cf6be9aac1c7630d5a23af88c28275c70eb8819'}/> 
        <NewNotable address={'0x338be3d8d0209815601e72f7a04ac7f37d61564b'}/> 
      </div>
        </>
    )
}
