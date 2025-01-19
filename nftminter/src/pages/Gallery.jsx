import React, { useEffect, useState } from "react";
import "./gallery.css";
import CardHolder from "../component/CardHolder";
import { useWeb3 } from "../api/contextapi";

const Gallery = () => {
  const [selectedDiv, setSelectedDiv] = useState("All");
  const [prodList, setProdList] = useState([]);
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const handleDivClick = (divNumber) => {
    setSelectedDiv(divNumber);
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
      if (elements[i + 4] === "true") nfts.push(nft);
    }
    return nfts;
  };

  const getAllNfts = async () => {
    try {
      const array = await contract?.nftsForSale();
      // console.log(array);
      // console.log(array);
      const arrayToString = array.toString();
      // console.log(arrayToString);
      const readableArray = parseDataToArray(arrayToString);
      setProdList(readableArray);

      // console.log("Array of NFTs:", readableArray);
    } catch (error) {
      console.log("error in gallery", error);
    }
  };

  useEffect(() => {
    if (contract) getAllNfts();
  }, [contract]);

  return (
    <div className="gallery_container">
      <div className="gallery_container_upper">
        <h2>Gallery</h2>
        <hr className="hr"></hr>
      </div>
      <div className="gallery_container_middle">
        <div
          className={`${
            selectedDiv === "All" ? "tab_active" : ""
          }  gallery_tab`}
          onClick={() => handleDivClick("All")}
        >
          All
        </div>
        <div
          className={`${
            selectedDiv === "sport" ? "tab_active" : ""
          }  gallery_tab`}
          onClick={() => handleDivClick("sport")}
        >
          Sport
        </div>
        <div
          className={`${
            selectedDiv === "photography" ? "tab_active" : ""
          }  gallery_tab`}
          onClick={() => handleDivClick("photography")}
        >
          Photography
        </div>
        <div
          className={`${
            selectedDiv === "music" ? "tab_active" : ""
          }  gallery_tab`}
          onClick={() => handleDivClick("music")}
        >
          Music
        </div>
      </div>
      <div className="gallery_container_lower">
        <CardHolder array={prodList} activeDiv={selectedDiv} />
      </div>
    </div>
  );
};

export default Gallery;
