
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT(name:Text, owner:Principal, content:[Nat8] ) = this{

    private let itemName = name;
    private var nftOwner:Principal = owner;
    private let imageByte = content;
    var money:Nat = 0;
    

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
    };

    

    public shared(msg) func transferOwnerShip(to:Principal): async Text{
        if(msg.caller == owner){
            nftOwner:=to;
            return("Transfered");
        }else{
            return("Error");
        }
    };
}