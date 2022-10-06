import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Image from 'next/image';
import Link from "next/link";

export default function SearchBar({address}) {

  const [nft, setNFT] = useState([]);

  useEffect(() => {

    const getNFTData = setTimeout(async () => {
        if (!address) { setNFT([]); return}
        
        const options = {
          method: 'GET',
          url: 'https://api.nftport.xyz/v0/search',
          params: {text: `${address}`, chain: 'ethereum', order_by: 'relevance', page_size: "50"},
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'c3b768eb-2904-4e59-8c85-bc156a4a9b6a'
          }
        };
        
        try {
          const response = await axios.request(options);
          uniquesOnly(await response.data.search_results)
        } catch(error) { console.log(error)}  
    }, 2000);
    return () => clearTimeout(getNFTData)
  }, 
  [address]);   

  const uniquesOnly = async (data) => {
    
    let uni = [];
    
    data.forEach(item => {
      if (! uni.includes(item?.contract_address)) { 
        uni.push(item); uni.push(item.contract_address)
      }
    })
    setNFT(uni.filter(item => typeof(item) === "object"));
  }
  return (
    <div className=" rounded-md p-1 absolute  flex-col items-center justify-start md:left-[13%] z-[1] top-[12%] md:w-[35%]  w-[90%]  left-[6%] bg-[#222428]
    h-[50%] overflow-auto ">
      {
        nft.map((item, index) => {
          return (
            <div className="rounded-xl w-full px-2 gap-x-2 flex flex-row flex-wrap 
            justify-start items-center cursor-pointer bg-[#191B1F] mt-1"              key={item?.contract_address + "/" + item?.token_id}>
              {
                item?.cached_file_url
                ? <>
                    <Link prefetch={false} href={{pathname: "/OneNFT", query:{contract_address: item.contract_address, token_id: item?.token_id, address} }} >
                      <div className="w-[5rem] p-1"> 
                        <Image
                          src={item?.cached_file_url}
                          alt={item?.name}
                          height={50}
                          width={50}
                          loading="eager"
                          layout="responsive"
                          objectFit="contain"
                          className="rounded-full"
                          />
                      </div>
                    </Link>
                    <Link prefetch={false} href={{pathname: "/OneNFT", query:{contract_address: item.contract_address, token_id: item?.token_id} }}>
                      <div><span className="text-[0.6rem] md:text-[0.8rem] font-semibold "> {item.contract_address}</span> </div>
                    </Link>
                  </>
                : ""
              }
            </div>
          )
        })
      }
    </div>
  )
}