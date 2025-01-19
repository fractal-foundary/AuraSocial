import { useState, useEffect } from "react";
import landpage_img from "../assets/land_img (1).png";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../api/contextapi";

function Home() {
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const navigate = useNavigate();

  const navigatehandler = () => {
    navigate("/collection");
  };

  const navigatehandlerGallery = () => {
    navigate("/gallery");
  };

  return (
    <div className="home_container">
      <div className="home_upper">
        <div className="home_container_left">
          <h1>Create, Trade, and Collect Unique NFTs</h1>
          <p>
            Mint, buy, sell, and explore unique NFTs on our platform,
            providing secure, transparent ownership of digital content.
          </p>
          <div className="home_container_button">
            <button className="button_github" onClick={navigatehandlerGallery}>
              Explore now
            </button>
            <button className="button_claim" onClick={navigatehandler}>
              <span>Upload &#x21AA;</span>
            </button>
          </div>
        </div>
        <div className="home_container_right">
          <img src={landpage_img}></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
