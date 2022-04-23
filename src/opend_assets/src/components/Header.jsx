import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Gallery from "./Gallery";
import homeImage from "../../assets/home-img.png";
import Minter from "./Minter";
import { opend } from "../../../declarations/opend"
import CURRENT_USER_ID from "../index";

function Header() {

  
  const [myGallery, setGallery] = useState();
  const [getListedNft, setListedNft] = useState();
  const [loader,setLoader] = useState(true);

  async function getNFTs(id) {
    const x = await opend.getAllNFT(id);
    console.log(x);
    setGallery(<Gallery title="My NFTs" nftArray={x} />)

    const y = await opend.getListedNFT();

    console.log(y);
    setListedNft(<Gallery title="NFTs For Sale" nftArray={y} />)
  }

  useEffect(() => {
    getNFTs(CURRENT_USER_ID);
  }, [])

  return (
    <>
    <BrowserRouter forceRefresh={true}>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <img className="header-logo-11" src={logo} />
            <div className="header-vertical-9"></div>
            <h5 className="Typography-root header-logo-text">OpenD</h5>
            <div className="header-empty-6"></div>
            <div className="header-space-8"></div>
            <Link to="/discover">
              <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                Discover
              </button>
            </Link>
            <Link to="/minter">
              <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                Minter
              </button>
            </Link>
            <Link to="/myNFTs" >
              <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
                My NFTs
              </button>
            </Link>
          </div>
        </header>
      </div>
      <Switch>
        <Route exact path="/">
          <img className="bottom-space" src={homeImage} />
        </Route>
        <Route path="/discover">
        
          {getListedNft}
        </Route>
        <Route path="/minter">
          <Minter />
        </Route>
        <Route path="/myNFTs">
          
          {myGallery}
        </Route>
      </Switch>
    </BrowserRouter>
    </>)
  ;
}

export default Header;
