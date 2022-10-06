import React, {useState, useEffect} from 'react'
import axios from "axios";
import Image from 'next/image';
import {MdVerified} from 'react-icons/md';
import InfoAboutNFT from './InfoAboutNFT';
import Collections from './Collections';

export default function PhotoNFT({contract, token_id, search_input, name}) {
    
    const [nft, setNFT] = useState({});
    const [collection, setCollection] = useState([]);
    
    console.log(search_input, "input query");

    useEffect(() => {

        const getNFTData = async () => {
          
        const axios = require('axios').default;
    
        const options = {
          method: 'GET',
          url: `https://api.nftport.xyz/v0/nfts/${contract}/${token_id}`,
          params: {chain: 'ethereum', include : "all", page_size:"3"},
          headers: {'Content-Type': 'application/json', Authorization: "c3b768eb-2904-4e59-8c85-bc156a4a9b6a"}
        };
        try {
            const response = await axios.request(options);
            setNFT(response.data);
        } catch(error) { console.log(error)}
    }

    const getFromOpenSea = async () => {

        const options = {
            method: 'GET',
            url: `https://api.opensea.io/api/v1/asset/${contract}/${token_id}/?include_orders=false`
          };
          
          try {
            const response = await axios.request(options)
            setCollection(response.data);
        } catch(error) { console.log(error)}
    }

    getNFTData();
    getFromOpenSea();
    }, 
    [contract]);
    
    console.log(nft, 'one');
    return (
        <>
        <div className="photo w-full h-[20rem] bg-black rounded-md px-10 py-4 relative text-white">
            {
                nft.contract?.metadata?.thumbnail_url ? 
                <Image
                    src={nft.contract?.metadata.cached_thumbnail_url}
                    alt={nft.contract?.metadata.cached_thumbnail_url}
                    height={110}
                    width={490}
                    loading="eager"
                    objectFit='cover'
                    layout="fill"
                    className="w-full h-full rounded-md"
                    
                />
                : <Image
                src={nft.nft?.cached_file_url}
                alt={"else no image"}
                height={110}
                width={490}
                loading="eager"
                objectFit='cover'
                layout="fill"
                className="w-full h-full rounded-md"
            />
            }
            <div className="w-[8rem] absolute top-[75%] h-[8rem]">
                {
                    nft.nft?.cached_file_url ? 
                    <Image
                        src={nft.nft.cached_file_url}
                        alt="small nft"
                        height={110}
                        width={490}
                        loading="eager"
                        objectFit='cover'
                        layout="fill"
                        className="w-full h-full rounded-md"
                        
                    />
                    : <span> Failed</span>
                }
            </div>
            <div className="mt-[23rem] ">
                <h1 className="text-white text-4xl flex items-center w-fit"> {  nft.nft?.metadata?.name || ""} <MdVerified className="text-[yellow] text-2xl ml-1"/></h1>
                <p className="text-gray-300 w-fit text-sm md:text-xl"> Contract:  {nft.nft?.contract_address || ""}</p>
                <p className="text-gray-300 w-[70%] mt-5 text-ellipsis transition-all duration-1000 h-fit line-clamp-5 hover:line-clamp-none"> { nft.nft?.metadata?.description || ""}</p>
            </div>
            {
                collection ? <InfoAboutNFT owner={collection.owner} num_sale={collection.num_sales}/> : ""
            }
            <Collections search_this={search_input} contract_address={contract} name={name}/>
        </div>
        </>
    )
}
