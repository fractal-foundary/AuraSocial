import React, { useRef, useEffect, useState } from "react";
import "./NFTPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useWeb3 } from "../api/contextapi";
import { ethers } from "ethers";

const NFTPage = () => {
  const { account, contract } = useWeb3();
  const videoRef = useRef(null);
  const [alertShown, setAlertShown] = useState(false);
  const { tid } = useParams();
  const [prodList, setProdList] = useState({});
  const [url, setUrl] = useState("");
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideo, setVideo] = useState(false);

  const parseDataToArray = (data) => {
    const elements = data.split(",");
    return {
      tokenId: elements[0],
      owner: elements[1],
      sender: elements[2],
      price: elements[3],
      outForSale: elements[4] === "true",
      videoURL: elements[5],
      videoName: elements[6],
      videoDescription: elements[7],
      videoCategory: elements[8],
      mediType: elements[9],
    };
  };

  const getVideoDetail = async () => {
    try {
      const array = await contract?.getNFTDetails(tid);
      if (array) {
        const arrayToString = array.toString();
        const readableArray = parseDataToArray(arrayToString);
        setProdList(readableArray);
        setUrl(readableArray?.videoURL);
        if (readableArray?.videoURL?.mediType?.startsWith("video/"))
          setVideo(true);
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const stopsaleHandle = async () => {
    try {
      if (account === prodList.sender) {
        const stopSale = await contract?.stopSale(tid);
        await stopSale.wait();
        toast.success(`Video successfully removed from sale`, {
          position: "top-right",
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyVideo = async () => {
    try {
      if (account !== prodList.sender) {
        const buyVideo = await contract.buyNFT(tid, {
          value: prodList.price,
        });
        await buyVideo.wait();
        toast.success(`Video successfully purchased`, {
          position: "top-right",
          theme: "dark",
        });
      } else if (prodList.outForSale === false) {
        const resaleVideo = await contract.resale(tid);
        await resaleVideo.wait();
        toast.success(`Video successfully uploaded for resale`, {
          position: "top-right",
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (contract && tid) {
      getVideoDetail();
    }
  }, [contract]);

  useEffect(() => {
    try {
      const videoElement = videoRef.current;

      if (videoElement) {
        const handleLoadedMetadata = () => {
          setVideoDuration(videoElement.duration);
        };

        const handleTimeUpdate = () => {
          const maxTime = 3;
          if (videoElement.currentTime >= maxTime) {
            videoElement.pause();
            videoElement.currentTime = maxTime;
            videoElement.controls = false;
            if (!alertShown) {
              toast.info("Buy the video to view more!", {
                position: "bottom-right",
                theme: "dark",
              });
              setAlertShown(true);
            }
          }
        };

        if (account !== prodList.sender) {
          videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
          videoElement.addEventListener("timeupdate", handleTimeUpdate);
        }

        return () => {
          videoElement.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [alertShown, url, isVideo]);

  return (
    <div className="videopage_container">
      <ToastContainer />
      <div className="videopage_left">
        {/* <div className="watermark-container">
          {url ?
          isVideo : (
            <>
              <video
                ref={videoRef}
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          ) : account !== prodList.sender ? (
            <>
              <img src={url} alt="Pinata content" width="100%" />
              <div className="watermark">NFTANCE</div>
              <div className="watermark2">NFTANCE</div>
            </>
          ) : (
            <img src={url} alt="Pinata content" width="100%" />
          )?""}
        </div> */}

        {url ? (
          <div className="watermark-container">
            {prodList?.mediType?.startsWith("video") ? (
              <>
                <video
                  ref={videoRef}
                  width="100%"
                  controls
                  controlsList="nodownload"
                >
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </>
            ) : account !== prodList.sender ? (
              <>
                <img src={url} alt="Pinata content" width="100%" />
                <div className="watermark">NFTANCE</div>
                <div className="watermark2">NFTANCE</div>
              </>
            ) : (
              <img src={url} alt="Pinata content" width="100%" />
            )}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
      <div className="videopage_right">
        <div className="videopage_right_upper">
          <div className="videopage_right_upper_title">
            <h2>{prodList?.videoName?.slice(0, 20)} </h2>
            <button
              onClick={stopsaleHandle}
              disabled={
                account !== prodList.sender || prodList.outForSale === false
              }
            >
              Stop sale
            </button>
          </div>
          <p>
            Owned by{" "}
            <span>
              {prodList.sender
                ? `${prodList.sender.slice(0, 6)}...${prodList.sender.slice(
                    -4
                  )}`
                : "NA"}
            </span>
          </p>
        </div>
        <div className="videopage_right_middle">
          {prodList.videoDescription}
        </div>
        <div className="videopage_right_lower">
          <div className="videopage_right_lower_price">
            <p>Current price</p>
            <h2>
              {prodList.price ? ethers.formatEther(prodList.price) : "0"} ETH
            </h2>
          </div>
          <div>
            <button
              className="videopage_button_container"
              onClick={handleBuyVideo}
            >
              {account !== prodList.sender
                ? "Buy now"
                : prodList.outForSale === true
                ? "Owned"
                : "Resale"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
