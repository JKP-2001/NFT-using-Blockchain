import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

actor OpenD {

    private type Listing = {
        itemOwner:Principal;
        nftPrice:Nat;
    };

    var nftHashMap = HashMap.HashMap<Principal,NFTActorClass.NFT>(1,Principal.equal,Principal.hash);
    var ownerHashMap = HashMap.HashMap<Principal,List.List<Principal>>(1,Principal.equal,Principal.hash);
    var salesNFT = HashMap.HashMap<Principal,Listing>(1,Principal.equal,Principal.hash);

    public shared(msg) func Mint(name:Text,image:[Nat8]): async Principal{
        
        let owner = msg.caller;
        let newNFT = await NFTActorClass.NFT(name,owner,image);
        let newNFTId = await newNFT.getID();

        nftHashMap.put(newNFTId,newNFT);
        addToOwnerMap(owner,newNFTId);

        return newNFTId;
    };


    private func addToOwnerMap(owner:Principal,nftId:Principal){
       
        var ownerList : List.List<Principal> = switch(ownerHashMap.get(owner)){
            case(null) List.nil<Principal>();
            case(?result) result;
        };

        ownerList:=List.push(nftId,ownerList);
        ownerHashMap.put(owner,ownerList);
    };

    public query func getAllNFT(user:Principal): async [Principal]{
        let ownerNFT : List.List<Principal> = switch(ownerHashMap.get(user)){
            case(null) List.nil<Principal>();
            case(?result) result;
        };
        
        return List.toArray(ownerNFT);
    };

    public shared(msg) func sellItem(itemId:Principal,price:Nat): async Text{
        let sellerId:Principal = msg.caller;
        
        let recieveId:NFTActorClass.NFT = switch(nftHashMap.get(itemId)){
            case null return "Item Not Found";
            case(?result) result;
        };

        let checkId:Principal = await recieveId.getOwner();

        if(Principal.equal(sellerId,checkId)){
            var item : Listing = {
                itemOwner = checkId;
                nftPrice = price;
            };

            salesNFT.put(itemId,item);
            return "Success";
        }else{
            return "This NFT Doesn't Belongs To You";
        };
    };

    public query func getOpendId(): async Principal{
        return Principal.fromActor(OpenD);
    }
};
