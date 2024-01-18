import './main.css';
import { Link } from "react-router-dom";
import ImageSlide from "./imageSlide";
import AdComponent from "./advertCom";
import Products from "./products";

function Main(){
  return(
    <div>
      <ImageSlide />
      <AdComponent />
      <Products />
    </div>
  )
};

export default Main;