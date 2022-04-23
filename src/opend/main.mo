import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";

actor OpenD {

    private type Listing = {
        itemOwner:Principal;
        nftPrice:Nat;
    };

    private type UserMoneyInfo = {
        moneyavail:Nat;
        isClaimed:Bool;
    };

    var nftHashMap = HashMap.HashMap<Principal,NFTActorClass.NFT>(1,Principal.equal,Principal.hash);
    var ownerHashMap = HashMap.HashMap<Principal,List.List<Principal>>(1,Principal.equal,Principal.hash);
    var salesNFT = HashMap.HashMap<Principal,Listing>(1,Principal.equal,Principal.hash);
    var moneyAvailable = HashMap.HashMap<Principal,UserMoneyInfo>(1,Principal.equal,Principal.hash);
    stable var openDMoney = 1000000000;
    
    public shared(msg) func Mint(name:Text,image:[Nat8]): async Principal{
        
        let owner = msg.caller;
        let newNFT = await NFTActorClass.NFT(name,owner,image);
        let newNFTId = await newNFT.getID();

        var x:UserMoneyInfo = {
            moneyavail=0;
            isClaimed = false;
        };

        nftHashMap.put(newNFTId,newNFT);
        addToOwnerMap(owner,newNFTId);
        moneyAvailable.put(owner,x);
        
        return newNFTId;
    };

    public shared(msg) func freeDang(): async Text{
        let owner:Principal = msg.caller;
        openDMoney:=openDMoney-10000;


        if(openDMoney < 0){
            return "Offer Finished";
        };

        let infoo:UserMoneyInfo = {
            moneyavail=0;
            isClaimed = false;
        };
        

        let moneycurr:UserMoneyInfo = switch(moneyAvailable.get(owner)){
            case null{
                moneyAvailable.put(owner,infoo);
                infoo
            };
            case (?result) result;
        };

        if(moneycurr.isClaimed){
            return("Already Claimed");
        };

        let moneyupdated:Nat = moneycurr.moneyavail + 10000;
        let info:UserMoneyInfo = {
            moneyavail=moneyupdated;
            isClaimed = true;
        };
        moneyAvailable.put(owner,info);
        return "Success";
    };

    public shared(msg) func checkBalance(): async Nat{
        let onwer = msg.caller;
        switch(moneyAvailable.get(onwer)){
            case null return 0;
            case (?result) return result.moneyavail;
        };        
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

    public query func getListedNFT(): async [Principal]{
        let ids = Iter.toArray(salesNFT.keys());
        return ids;
    };

    public query func getOpendId(): async Principal{
        return Principal.fromActor(OpenD);
    };

    public query func getOriginalOwner(id:Principal): async Principal{
        let idOwner: Listing = switch(salesNFT.get(id)){
            case null return Principal.fromText("");
            case (?result) result;
        };
        return idOwner.itemOwner;
    };


    public query func isListed(itemsID:Principal): async Bool{
        switch(salesNFT.get(itemsID)){
            case null return(false);
            case (?result) return(true);
        }
    };

    public query func getPrice(id:Principal): async Nat{
        let price:Listing = switch(salesNFT.get(id)){
            case null return 0;
            case (?result) result;
        };

        return price.nftPrice;

    };

    public shared(msg) func claimed(): async Bool{
        let owner:Principal = msg.caller;
        switch(moneyAvailable.get(owner)){
            case null return false;
            case (?result) return true;
        };
    };

    // public shared(msg) func transferNFT(id:Principal): async Nat{
    //     let seller:Principal = msg.caller;
    //     let owner = await getOriginalOwner(id);
    //     let requiredid = await getOpendId();
    //     if(owner == requiredid){
            
    //     }
    // }
};

