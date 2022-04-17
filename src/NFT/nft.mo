
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT(name:Text, owner:Principal, content:[Nat8] ) = this{

    let itemName = name;
    let nftOwner = owner;
    let imageByte = content;

    public query func getName(): async Text{
        return itemName;
    };

    public query func getOwner() : async Principal{
        return nftOwner;
    };

    public query func getByte() : async [Nat8]{
        return imageByte;
    };

    public query func getID() : async Principal{
        return Principal.fromActor(this);
    }

}