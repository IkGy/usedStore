import React, { useEffect, useState } from "react";
import "./regi.css";
import axios from "axios";
import { getCookie } from "../../../useCookies";
import { useNavigate, useParams } from "react-router-dom";
import Regi_title from "./regi_title";
import Regi_category from "./regi_categoty";
import Regi_address from "./regi_address";
import Regi_status from "./regi_status";
import Regi_change from "./regi_change";
import Regi_price from "./regi_price";
import Regi_postprice from "./regi_postprice";
import Regi_content from "./regi_content";
import Regi_tag from "./regi_tag";
import Regi_count from "./regi_count";
import { API_URL } from "../../config/contansts";

function Regi() {
  const [title, setTitle] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const category = [category1, category2, category3];
  const [selectedAddress, setSelectedAddress] = useState("");
  const [status, setStatus] = useState("");
  const [change, setChange] = useState("");
  const [price, setPrice] = useState("");
  const [postprice, setPostprice] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  const [count, setCount] = useState("");
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    // 여기서 cookie 값을 사용하여 POST 요청을 보냅니다.
    axios
      .post(`${API_URL}/sellitemedit`, {
        _id: id,
      })
      .then((result) => {
        if (result.data.seller === getCookie("login")) {
          setSelectedAddress(result.data.location);
          setTitle(result.data.title);
          setCategory1(result.data.category[0]);
          setCategory2(result.data.category[1]);
          setCategory3(result.data.category[2]);
          setStatus(result.data.product_status);
          setChange(result.data.refund);
          setPrice(result.data.price);
          setPostprice(result.data.postprice);
          setContent(result.data.comment);
          setTag(result.data.tags);
          setCount(result.data.count);
        } else {
          navigate('/')
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/login");
        }
      });
  }, []);

  let productpost = (e) => {
    e.preventDefault();

    if (
      title === "" ||
      category1 === "" ||
      selectedAddress === "" ||
      status === "" ||
      change === "" ||
      price === "" ||
      postprice === "" ||
      content === "" ||
      count === ""
    ) {
      alert("필수입력칸을 채워주세요.");
    } else {
      let formDataWithImage = new FormData();
      formDataWithImage.append("title", title);
      formDataWithImage.append("category", JSON.stringify(category));
      formDataWithImage.append("selectedAddress", selectedAddress);
      formDataWithImage.append("status", status);
      formDataWithImage.append("change", change);
      formDataWithImage.append("price", price);
      formDataWithImage.append("postprice", postprice);
      formDataWithImage.append("content", content);
      formDataWithImage.append("tag", JSON.stringify(tag));
      formDataWithImage.append("count", count);
      formDataWithImage.append("_id", id);

      axios
        .post(`${API_URL}/productedit`, formDataWithImage, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          console.log(result.data);
          navigate("/");
        });
    }
  };
  return (
    <div className="regi">
      <div className="regi_start">
        <span>상품수정</span>
        <span style={{ color: "red" }}>*필수항목</span>
      </div>

      <Regi_title title={title} setTitle={setTitle}></Regi_title>

      <Regi_category
        category1={category1}
        setCategory1={setCategory1}
        category2={category2}
        setCategory2={setCategory2}
        category3={category3}
        setCategory3={setCategory3}
      ></Regi_category>

      <Regi_address
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      ></Regi_address>

      <Regi_status status={status} setStatus={setStatus}></Regi_status>

      <Regi_change change={change} setChange={setChange}></Regi_change>

      <Regi_price price={price} setPrice={setPrice}></Regi_price>

      <Regi_postprice
        postprice={postprice}
        setPostprice={setPostprice}
      ></Regi_postprice>

      <Regi_content content={content} setContent={setContent}></Regi_content>
      <Regi_tag tag={tag} setTag={setTag}></Regi_tag>

      <Regi_count count={count} setCount={setCount}></Regi_count>

      <div className="regi_register">
        <button onClick={productpost}>등록하기</button>
      </div>
    </div>
  );
}

export default Regi;
