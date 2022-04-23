import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Principal } from "@dfinity/principal";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft"
import Button from "./Button";
import { opend } from "../../../declarations/opend"
import CURRENT_USER_ID from "../index";
import Price from "./Price";

function Item(props) {
  let pricex;
  const handleSell = async () => {
    console.log("Sell Clicked");
    setPrice(<input
      placeholder="Price in DANG"
      type="number"
      className="price-input"
      value={pricex}
      onChange={(e) => pricex = e.target.value}
    />)
    setButton(<Button handelClick={handleConfirmSell} text="Confirm" />)
  }

  const [name, setName] = useState();
  const [owner, setId] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [price, setPrice] = useState();
  const [loader, setLoader] = useState(true);
  const [frontendPrice, setFPrice] = useState();
  const [blur,setBlur] = useState();
  const [isListed,setIsListed] = useState();

  const idx = props.id;

  const localhost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localhost });
  agent.fetchRootKey();
  let actor;
  async function loadNFT() {
    actor = await Actor.createActor(idlFactory, {
      agent: agent,
      canisterId: idx,
    });
    const name = await actor.getName();
    setName(name);

    const id = await actor.getOwner();
    const owner = id.toText();
    setId(owner);

    const imageArray = await actor.getByte();
    const imageContent = new Uint8Array(imageArray);
    const image = URL.createObjectURL(new Blob([imageContent.buffer]), { type: "image/png" });
    setImage(image);

    const pricett = await opend.getPrice(props.id);
    setFPrice(<Price price={pricett.toString()} />);
    const x = await opend.isListed(props.id);
    if (x) {
      const y = await opend.getOriginalOwner(props.id);
      if (y.toText() === CURRENT_USER_ID.toText()) {
        setButton();
        setFPrice();
        setBlur({filter:"blur(4px)"});
        setIsListed(" Listed");
      }
      else {        
        setButton(<Button handelClick={handleSell} text="Buy" />)
      }
    }
    else {
      setButton(<Button handelClick={handleSell} text="Sell" />)
    }
  }

  const handleConfirmSell = async () => {
    setBlur({filter:"blur(4px)"});
    setLoader(false);
    console.log("Sell = " + pricex);
    const itemMsg = await opend.sellItem(props.id, Number(pricex));
    console.log(itemMsg);
    if (itemMsg === "Success") {
      const opendID = await opend.getOpendId();
      const msg = await actor.transferOwnerShip(opendID);
      setLoader(true);
      const ownerx = opendID.toText();
      setId(ownerx);
      setButton();
      setFPrice();
      setIsListed(" Listed") 
            // const msg = await actor.getName();
      console.log(msg);
    }
  }

  useEffect(() => {
    loadNFT();
  }, [owner])


  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />
        <div className="disCardContent-root">
          <div className="lds-ellipsis" hidden={loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {frontendPrice}
            {name}<span className="purple-text">{isListed}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
            {price}
          </p>
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
