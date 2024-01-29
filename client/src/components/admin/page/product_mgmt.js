import axios from "axios";
import React, { useEffect } from "react";
import { API_URL } from "../../config/contansts";

function ProductManagement() {
  const getData = async ()=>{
    await axios.get(`${API_URL}/admin/prodAll`)
    .then((response)=>{
      console.log(response);
    })
    .catch((err)=>{
      console.error(err);
    })
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div>
      
    </div>
  );
}

export default ProductManagement;