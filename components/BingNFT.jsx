import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import {GrFormPrevious, GrFormNext, GrFormCheckmark} from 'react-icons/gr';
import {FaEthereum} from 'react-icons/fa';
import {MdVerified} from 'react-icons/md';

export default function BingNFT() {
    
    const [nft, setNFT] = useState([]);
    const moveRef = useRef();
    
    const address = "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b";
    
    useEffect(() => {
        const oneHoodie = async () => {
            const options = {
                method: 'GET',
                url: `https://api.nftport.xyz/v0/nfts/${address}`,
                params: {chain: 'ethereum', include : "metadata", page_size:"10"},
                headers: {'Content-Type': 'application/json', Authorization: "c3b768eb-2904-4e59-8c85-bc156a4a9b6a"}
              };
            try {
                const response = await axios.request(options)
                setNFT(response.data.nfts);
            } catch(error) { console.log(error)}
        }
        
        oneHoodie();
    }, [])
    
    const sliderLeft = () => { moveRef.current.scrollLeft = moveRef.current.scrollLeft + 580;}
    const sliderRight = () => { moveRef.current.scrollLeft = moveRef.current.scrollLeft - 580; }
    const randomPrice = () => Math.random(1 * 10).toPrecision(3);

    return (    
        <div className="w-[95%] flex flex-row   justify-start  items-center overflow-auto scrollbar-hide scroll-smooth" ref={moveRef} >
            {
                nft.map( item => {
                    return (
                        item.cached_file_url
                        ? 
                        <div className="w-full h-full flex gap-x-10" key={item?.contract_address}>
                            <div className="group relative w-[20rem] lg:w-[20rem] h-[20rem] mr-5 overflow-x-scroll scrollbar-hide">
                                <Image
                                    src={item?.cached_file_url}
                                    alt=""
                                    height={"500"}
                                    width={"500"}
                                    layout="responsive"
                                    objectFit='contain'
                                    loading="lazy"
                                    className="z-[99] rounded-md object-contain
                                    transition-all w-[500px] h-[500px] duration-500 hover:scale-[1] cursor-pointer hover:rounded-lg"  
                                />
                                    <div className="w-full h-full bg-black/40 absolute top-0 rounded-md z-auto group-hover:flex hidden"> </div>

                            <div className="group-hover:hidden  transition-all duration-200 text-[#f5f1f1] w-[85%] absolute text-xl z-[999] top-[80%] ml-5">
                                <div className="bg-black/20 px-2 backdrop-blur-sm rounded-md">
                                    <p className="flex items-center  gap-x-1 text-xl"> {item?.metadata?.name} <MdVerified className="text-blue-500" size={20}/></p>
                                    <p className=" flex items-center justify-be">{randomPrice()} <FaEthereum /> </p>
                                </div>
                            </div>               
                            </div> 
                        </div>
                        : ""
                    )
                })
            }
            <div className="overlfow-hidden overflow-hidden flex items-center justify-center">
                <div className="z-[999] flex items-center justify-center bg-[#FFFFFF] w-fit h-fit p-1
                rounded-full absolute text-[#f1eded]  lg:top-[150%] md:top-[170%] 
                left-[0.5%] cursor-pointer transition-all duration-500 hover:shadow-md hover:shadow-[#141414]"> 
                    <GrFormPrevious onClick={sliderLeft} size={40} />
                </div>
                <div className="z-[999] lg:top-[150%] bg-[#FFFFFF] 
                w-fit h-fit p-1 rounded-full absolute text-[#1f1e1e] 
                right-[0.5%]  md:top-[170%] transition-all duration-200 
                cursor-pointer hover:shadow-md hover:shadow-[#141414]">
                    <GrFormNext onClick={sliderRight}  size={40} />
                </div>
            </div>
        </div>
        
    )
}
