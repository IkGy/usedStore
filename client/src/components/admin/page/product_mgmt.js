import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/contansts";

function ProductManagement() {
  const [prodData,setProdData] = useState([]);
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
    <div className="admin_prod_list">
      <table>
        {/* {prodData.map(()=>{
          return(
            <tr>

            </tr>
          )
        })} */}
      </table>
    </div>
  );
}

export default ProductManagement;