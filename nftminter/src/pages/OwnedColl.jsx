import React, { useEffect, useState } from "react";
import "./ownedColl.css";
import CardHolder from "../component/CardHolder";
import VideoUpload from "../component/NFTUpload";
import { useWeb3 } from "../api/contextapi";
import { useNavigate } from "react-router-dom";

const OwnedColl = () => {
  const [prodList, setProdList] = useState([]);
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const navigate = useNavigate();

  const handleGallerynavigation = () => {
    navigate("/gallery");
  };

  const parseDataToArray = (data) => {
    const elements = data.split(",");
    const nfts = [];

    for (let i = 0; i < elements.length; i += 10) {
      const nft = {
        tokenId: elements[i],
        owner: elements[i + 1],
        sender: elements[i + 2],
        price: elements[i + 3],
        outForSale: elements[i + 4] === "true",
        videoURL: elements[i + 5],
        videoName: elements[i + 6],
        videoDescription: elements[i + 7],
        videoCategory: elements[i + 8],
        mediType: elements[i + 9],
      };
      nfts.push(nft);
    }
    return nfts;
  };

  const getAllNfts = async () => {
    try {
      const array = await contract?.allMyNFTsNotForSale();
      const arrayToString = array.toString();
      if (arrayToString) {
        const readableArray = parseDataToArray(arrayToString);
        setProdList(readableArray);
        console.log("Array of NFTs:", readableArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (contract) getAllNfts();
  }, [contract]);

  return (
    <div className="ownedColl_container">
      <div className="ownedColl_container_upper">
        <h2>Collections</h2>
        <VideoUpload />
      </div>
      <div className="ownedColl_container_lower">
        {prodList.length > 0 ? (
          <CardHolder array={prodList} activeDiv={"Collection"} />
        ) : (
          <div className="ownedColl_container_lower_card">
            <h3>
              No videos purchased yet. Visit the gallery to explore and make
              your purchase.
            </h3>
            <button
              className="ownedColl_container_lower_card_button"
              onClick={handleGallerynavigation}
            >
              Go to gallery
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnedColl;
