import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import Image from 'next/image';
import {MdVerified} from 'react-icons/md';
import "../styles/Home.module.css"
import image from "../assets/image.jpg"
import Link from 'next/link';

export default function NewNotable({address}) {
    const [nft, setNFT] = useState([]);

    useEffect(() => {

        const getNFTData = async () => {
          
        const axios = require('axios').default;
    
        const options = {
          method: 'GET',
          url: `https://api.nftport.xyz/v0/nfts/${address}`,
          params: {chain: 'ethereum', include : "metadata", page_size:"2"},
          headers: {'Content-Type': 'application/json', Authorization: "c3b768eb-2904-4e59-8c85-bc156a4a9b6a"}
        };
        try {
            const response = await axios.request(options)
            setNFT(response.data.nfts);
        } catch(error) { console.log(error)}
    }
    
    setTimeout(getNFTData, 1000);
    }, 
    [address]);

    return (
        
        <Link href={{pathname: "/OneNFT", query:{contract_address: nft[0]?.contract_address, token_id: nft[0]?.token_id, name: nft[0]?.metadata.name} }}>

            <div className=" 
            transition-all duration-300 hover:shadow-md cursor-pointer hover:shadow-black
            flex overflow-hidden mt-4 flex-col w-[400px] h-[260px] bg-white rounded-md shadow-md shadow-black/30">
                <div className="">
                    {
                        nft[0] ? 
                        <Image
                            src={nft[1]?.cached_file_url}
                            alt=""
                            height={210}
                            width={440}
                            loading="lazy"
                            objectFit='cover'
                            layout="responsive"
                            className="w-[400px] h-[200px]
                            transition-all duration-300 hover:scale-105 cursor-pointer"
                            onError={image}
                        />
                        : ""
                    }
                </div>
                <div className="w-[100%] ml-4  -mt-4 flex items-center justify-start gap-x-2">
                    <div>
                        {
                            nft[1] ? 
                            <Image
                                src={nft[0]?.cached_file_url}
                                alt=""
                                height={70}
                                width={80}
                                loading="lazy"
                                objectFit='cover'
                                className="rounded-md bg-center
                                transition-all duration-300 hover:scale-105 cursor-pointer"                           
                            />
                            : ""
                        }
                    </div>
                    <span className='text-black'> {nft[0]?.metadata.name} </span>
                    <span><MdVerified className="text-blue-500" size={20}/></span>
                </div>
            </div>
        </Link>
    )
}
