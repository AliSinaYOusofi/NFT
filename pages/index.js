import BingNFT from "../components/BingNFT";
import Header from "../components/Navbar";
import NewNotable from "../components/NewNotable";
import NFTCards from "../components/NFTCards";
import PopularContracts from "../components/PopularContracts";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const contract_address = [
    "0x495f947276749ce646f68ac8c248420045cb7b5e",
    "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    "0x705b9dbd0d5607beafe12e2fb74d64268d3ba35f"
  ];

  return (
    <>
      <Header />
      <h1 className="text text-center mt-10 cards font-semibold text-5xl">Explore, collect, and sell NFTs</h1>
      <div className="flex items-center justify-center w-full h-full ">
        <NFTCards address={contract_address[0]} />
      </div>
      
      <PopularContracts address={contract_address[2]}/>
      
    </>
  );
}
