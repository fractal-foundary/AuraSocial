import React, { useEffect, useState } from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useWeb3 } from "../api/contextapi";

const Card = ({ data }) => {
  const { account, contract } = useWeb3();
  const navigate = useNavigate();
  const [isVideo, setVideo] = useState(false);

  const handleClick = () => {
    navigate(`/nft/${data?.tokenId}`);
  };

  useEffect(() => {
    if (data?.mediType.startsWith("video/")) setVideo(true);
  }, [contract]);

  return (
    <div className="card_container">
      {data?.videoURL ? (
        isVideo === true ? (
          <video width="100%">
            <source src={data?.videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={data?.videoURL} alt={data.videoName} />
        )
      ) : (
        "No media available"
      )}

      <div className="card_body">
        <div className="card_body_up">
          <p>
            <span>
              {data?.sender
                ? `${data.sender?.slice(0, 6)}...${data.sender?.slice(
                    data.sender?.length - 4,
                    data.sender?.length
                  )}`
                : "NA"}
            </span>
          </p>
          <p>Current Price</p>
        </div>
        <div className="card_body_bottom">
          <p>
            <span>{data?.videoName.slice(0, 18)}</span>
          </p>
          <p>{ethers.formatEther(data?.price)} ETH</p>
        </div>
      </div>
      <button className="card_gallery" onClick={handleClick}>
        {account !== data.sender
          ? "Buy now"
          : data.outForSale === true
          ? "Owned"
          : "Resale"}
      </button>
    </div>
  );
};

export default Card;
