import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config/contansts";
import "./searchpage.css";
import nosearch from "./6179016.png";

function Categorysc() {
  let { category } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/detailsearch/${category}`).then((result) => {
      console.log(result.data);
      setData(result.data);
    });
  }, [category]);

  return (
    <div>
      <div className="searchpage_header">
        <div>
          카테고리: '{category}' 검색 결과({data.length})
        </div>
      </div>
      {data.length !== 0 ? (
        <>
          <div className="main_prod_grid">
            {data.length > 0 &&
              data.map((data) => (
                <Link to={`/detail/${data._id}`}>
                  <div className="main_prod_detail">
                    <div className="main_prod_img">
                      <img
                        className="main_prod_image"
                        src={data.images[0]}
                      ></img>
                    </div>
                    <div className="main_prod_info">
                      <p className="main_prod_title">{data.title}</p>
                      <p className="main_prod_price">
                        {data.price} 원<span>{data.date}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </>
      ) : (
        <div className="searchpage_nosearch">
          <img src={nosearch}></img>
          <div>검색 결과가 없습니다....</div>
        </div>
      )}
    </div>
  );
}

export default Categorysc;
