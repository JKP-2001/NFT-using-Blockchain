import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Principal } from "@dfinity/principal";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft"
import Button from "./Button";
import { opend } from "../../../declarations/opend"

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
  const [button, setButton] = useState(<Button handelClick={handleSell} text="Sell" />);
  const [price, setPrice] = useState();


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
  }

  const handleConfirmSell = async () => {
    console.log("Sell = " + pricex);
    const itemMsg = await opend.sellItem(props.id,Number(pricex));
    console.log(itemMsg);
    if(itemMsg === "Success"){
      const opendID = await opend.getOpendId();
      const msg = await actor.transferOwnerShip(opendID);
      // const msg = await actor.getName();
      console.log(msg);
    }
  }

  useEffect(() => {
    loadNFT();
  }, [])


  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"></span>
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
