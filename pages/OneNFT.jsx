import React from 'react'
import Navbar from '../components/Navbar'
import {useRouter} from 'next/router';
import PhotoNFT from '../components/PhotoNFT';

// should be like rarible.com
export default function OneNFT() {
    const contract_address = useRouter().query.contract_address // got the contract address
    const token_id = useRouter().query.token_id // got the contract address
    const search_query = useRouter().query.address // got the contract address
    const search_name = useRouter().query?.name?.split(" ")[0] // got the contract address
    

    console.log(search_name, "one photo");
    return (
        <>
            <Navbar />
            <div className="w-full h-full px-2">
                <PhotoNFT name={search_name} contract={contract_address} token_id={token_id} search_input={search_query} />
            </div>
        </>
    )
}
