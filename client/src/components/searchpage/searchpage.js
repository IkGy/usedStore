import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config/contansts";
import "./searchpage.css";

function Searchpage() {
  let { search } = useParams();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("관련순")

  let highscore = () => {
    axios.get(`${API_URL}/search/${search}`).then((result) => {
      setData(result.data);
      setStatus("관련순")
    });
  }

  let highdate = () => {
    axios.get(`${API_URL}/search/${search}`).then((result) => {
      // MongoDB에서 최신순으로 정렬된 날짜 필드가 있다고 가정 (예: createdAt)
      let sortedData = result.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setData(sortedData);
      setStatus("최신순")
    });
  };

  let lowprice = () => {
    axios.get(`${API_URL}/search/${search}`).then((result) => {
      // MongoDB에서 가격이 문자열로 저장되고 쉼표가 천 단위로 사용된 경우
      let sortedData = result.data.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/,/g, ''), 10);
        const priceB = parseInt(b.price.replace(/,/g, ''), 10);
        return priceA - priceB;
      });
      setData(sortedData);
      setStatus("저가순");
    });
  };

  let highprice = () => {
    axios.get(`${API_URL}/search/${search}`).then((result) => {
      // MongoDB에서 가격이 문자열로 저장되고 쉼표가 천 단위로 사용된 경우
      let sortedData = result.data.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/,/g, ''), 10);
        const priceB = parseInt(b.price.replace(/,/g, ''), 10);
        return priceB - priceA;
      });
      setData(sortedData);
      setStatus("고가순");
    });
  };

  useEffect(() => {
    axios.get(`${API_URL}/search/${search}`).then((result) => {
      console.log(result.data);
      setData(result.data);
    });
  }, [search]);

  return (
    <div>
      <div className="searchpage_header">
        <div>'{search}' 검색 결과({data.length})</div>
        <div className='searchpage_statussel'>
          <div style={status === "관련순" ? {color: "green"} : {}} onClick={highscore}>관련순</div>
          <div style={{margin: "0 0.5vw"}}>|</div>
          <div style={status === "최신순" ? {color: "green"} : {}} onClick={highdate}>최신순</div>
          <div style={{margin: "0 0.5vw"}}>|</div>
          <div style={status === "저가순" ? {color: "green"} : {}} onClick={lowprice}>저가순</div>
          <div style={{margin: "0 0.5vw"}}>|</div>
          <div style={status === "고가순" ? {color: "green"} : {}} onClick={highprice}>고가순</div>
        </div>
      </div>
      <div className="main_prod_grid">
        {data.length > 0 &&
          data.map((data) => (
            <Link to={`/detail/${data._id}`}>
              <div className="main_prod_detail">
                <div className="main_prod_img">
                  <img className="main_prod_image" src={data.images[0]}></img>
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
    </div>
  );
}

export default Searchpage;
