import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";

actor OpenD {
    public shared(msg) func Mint(name:Text,image:[Nat8]): async Principal{
        let owner = msg.caller;
        let newNFT = await NFTActorClass.NFT(name,owner,image);
        let newNFTId = await newNFT.getID();
        return newNFTId;
    }
};
