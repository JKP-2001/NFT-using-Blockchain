import React, { useState, useEffect} from 'react'
import { opend } from "../../../declarations/opend";
import { principal } from "@dfinity.principal";
import CURRENT_USER_ID from '../index';
import Button from './Button';



function MyMoney(props) {

    const handle = async ()=>{
        setLoader(false);
        const x = await opend.freeDang();
        console.log(x);
        const y = await opend.checkBalance();
        setLoader(true);
        setMoney(y.toString());
        setButton();
    }

    const [money, setMoney] = useState();
    const [loader, setLoader] = useState(true);
    const [button,setButton] = useState();

    async function myMoney() {
        const x = await opend.checkBalance();
        const y = await opend.claimed();
        if(y){
            setButton();
        }
        else{
            setButton(<Button text={"Claim Free Dang"} handelClick={handle} />)
        }
        setMoney(x.toString());
    }

    useEffect(() => {
      myMoney();
    }, [])
    

    return (
        <div className="disCardContent-root">
            <div className="lds-ellipsis" hidden={loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
                Balance = {money}
            </h2>
            {button}
        </div>
    )
}

export default MyMoney;