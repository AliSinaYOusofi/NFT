import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import {MdVerified} from 'react-icons/md';
import {FaEthereum} from 'react-icons/fa';
import Link from 'next/link';

export default function Collections({search_this, contract_address, name}) {

  const [nft, setNFT] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {

    const getNFTData = async () => {

      const options = {
        method: 'GET',
        url: 'https://api.nftport.xyz/v0/search',
        params: {text: `${name ?? search_this}`, chain: 'ethereum', order_by: 'relevance', page_size: "50"},
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'c3b768eb-2904-4e59-8c85-bc156a4a9b6a'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data.search_results)
        uniquesOnly(await response.data.search_results)
      } catch(error) { console.log(error)}  
    }
   getNFTData();
  }, 
  [search_this, contract_address, data, name]);
  
  const randomDollar = () => Math.ceil(Math.random() * 10) * 3000;
  const randomEth = () => Math.ceil(Math.random() * 10); 
  
  const uniquesOnly = (data) => {
    
    let uni = [];
    
    data.forEach(item => {
      if (item?.contract_address === contract_address || item?.name.includes(name ?? search_this)) { 
        uni.push(item); uni.push(item.contract_address); console.log("one")
      }
    });
    
    uni = uni.filter(item => typeof(item) === "object");
    setNFT(uni);
  }
  console.log(nft);

  return (
    <div className="w-full h-full flex flex-wrap justify-start items-center gap-x-1  mt-10">
      {/* <h1 className="md:text-[4rem] text-[2rem] mt-10"> From Same Collection</h1> */}
      {
        nft.map( item => {
          return (
            <div key={item?.contract_address} 
            className="cursor-pointer relative lg:w-[14rem] lg:mt-28 w-[10rem]  rounded-md h-[20rem] mt-4 group">
              <Link prefetch={false} href={{pathname: "/OneNFT", query:{contract_address: item.contract_address, token_id: item?.token_id} }}>

                <div className="relative group">
                  <Image
                    src={item?.cached_file_url}
                    alt={item?.cached_file_url}
                    width={120}
                    height={170}
                    layout="responsive"
                    objectFit="cover"
                    loading="eager"
                    className="w-[250px] rounded-tr-md rounded-tl-md"  
                  />
                  <p className="line-calmp-1 line-clamp-1  absolute top-[85%] ml-1 bg-white text-gray-500 rounded-full px-2"> #{item?.token_id.substring(0, 5)}</p>
                  <div className="absolute  bg-gradient-to-t from-black/50  rounded-tr-md rounded-tl-md w-full h-full hidden group-hover:flex transition-all duration-300 top-0"> </div>
                </div>
              </Link>
              
                <div className="bg-[#131212] rounded-br-sm rounded-bl-sm backdrop-blur-xl bg-transparent">
                  <div className="ml-2 py-2">
                    <h1 className="text-white text-[1rem] flex items-center w-fit"> {  item?.name.split(" ")[0] || ""} <MdVerified className="text-[yellow]  ml-1"/></h1>
                    <p className="flex items-start justify-start"> value : <span className="font-bold text-xl">${randomDollar()}</span></p>
                    <p className="text-sm flex items-start justify-start"> price: <i className="font-bold"> {randomEth()}eth</i> <FaEthereum className="text-blue-500 ml-1"/> </p>
                  </div>
              </div>
                  <Link prefetch={false} href={{pathname: "/OneNFT", query:{contract_address: item.contract_address, token_id: item?.token_id} }}>
                    <button type="button" className="opacity-0 group-hover:opacity-100  transition-all duration-100
                    bg-[#9c9c39] items-center justify-center w-full text-center rounded-br-md rounded-bl-md"> Details 
                    </button>
                  </Link>
            </div>
          )
        })
      }
    </div>
  )
}
