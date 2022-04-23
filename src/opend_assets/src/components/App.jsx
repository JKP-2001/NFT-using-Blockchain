import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import Minter from "./Minter";

function App() {
  function loader(){
    return( <div className="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>)
  }
 
  // const id = "rrkah-fqaaa-aaaaa-aaaaq-cai";
  return (
    <div className="App">
    
      <Header />
      <Footer />
    </div>
  );
}

export default App;
