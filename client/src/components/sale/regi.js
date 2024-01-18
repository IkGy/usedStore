import React, { useEffect, useState } from "react";
import "./regi.css";
import { FaCamera } from "react-icons/fa";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { grey } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import axios from "axios";

function Regi() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
  console.log("-------------------------------------");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 선택 후 state에 저장
        const fullAddress = `${data.address} ${data.buildingName || ""}`;
        setSelectedAddress(fullAddress);

        // 여기에 주소 선택 후 처리할 코드를 작성할 수도 있습니다.
        console.log(data);
      },
    }).open();
  };

  const handleAddressFocus = (event) => {
    event.target.blur();
  };

  const handlePriceChange = (event) => {
    if (event.target.value.length < 12) {
      const numericValue = event.target.value.replace(/[^0-9]/g, "");
      const formattedPrice = Number(numericValue).toLocaleString();
      setPrice(formattedPrice);
    }
  };

  const handleChange = (e) => {
    // 파일 입력을 따로 처리합니다.
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);

    // 이미지 프리뷰 업데이트
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageClick = () => {
    // 이미지 클릭 시 파일 선택 인풋창 클릭
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const imageInputRef = React.createRef();

  let handleKeyPress = (event) => {
    // 엔터 키의 키 코드는 13입니다.
    if (event.key === "Enter" && tag.length < 5 && event.target.value !== "") {
      const inputValue = event.target.value.replaceAll(" ", "");

      if (
        !tag.map((tagItem) => tagItem.replaceAll(" ", "")).includes(inputValue)
      ) {
        let copy = [...tag];
        copy.push(event.target.value);
        setTag(copy);
        event.target.value = "";
      } else {
        event.target.value = "";
      }
    } else if (event.key === "Enter" && tag.length >= 5) {
      event.target.value = "";
      alert("입력가능한 태크는 최대 5개 입니다.");
    }
  };

  let deletetag = (index) => {
    let copy = [...tag];
    copy.splice(index, 1);
    setTag(copy);
  };
  console.log(tag);

  let productpost = (e) => {
    e.preventDefault();
  
    let formDataWithImage = new FormData();
    formDataWithImage.append("img", imageFile);
    formDataWithImage.append("title", title);
    formDataWithImage.append("category", category);
    formDataWithImage.append("selectedAddress", selectedAddress);
    formDataWithImage.append("status", status);
    formDataWithImage.append("change", change);
    formDataWithImage.append("price", price);
    formDataWithImage.append("postprice", postprice);
    formDataWithImage.append("content", content);
    formDataWithImage.append("tag", tag);
    formDataWithImage.append("count", count);
  
    axios.post("http://localhost:8080/product", formDataWithImage, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      console.log(result.data);
    });
  };

  return (
    <div className="regi">
      <div className="regi_start">
        <span>기본정보</span>
        <span style={{ color: "red" }}>*필수항목</span>
      </div>
      <div className="regi_select">
        <div>
          <div className="regi_title">
          상품이미지<span style={{ color: "red" }}>*</span>
          </div>
        </div>
        <div>
          <button className="regi_image">
            <FaCamera />
            <i class="fa-solid fa-camera"></i>
            <div>이미지 등록</div>
          </button>
        </div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          상품명<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_content">
          <input placeholder="상품명을 입력해 주세요."></input>
        </div>
      </div>
      <div className="">
        <div className="regi_title">
          카테고리<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_category">
          <div className="regi_category1">
            <div
              style={category1 === "패션의류" ? { color: "green" } : {}}
              onClick={() => {
                setCategory1("패션의류");
                setCategory2("");
                setCategory3("");
              }}
            >
              패션의류
            </div>
            <div
              style={category1 === "패션잡화" ? { color: "green" } : {}}
              onClick={() => {
                setCategory1("패션잡화");
                setCategory2("");
                setCategory3("");
              }}
            >
              패션잡화
            </div>
          </div>
          <div className="regi_category2">
            {category1 === "패션의류" && (
              <>
                <div
                  style={
                    category1 === "패션의류" && category2 === "남성의류"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    setCategory2("남성의류");
                    setCategory3("");
                  }}
                >
                  남성의류
                </div>
                <div
                  style={
                    category1 === "패션의류" && category2 === "여성의류"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    setCategory2("여성의류");
                    setCategory3("");
                  }}
                >
                  여성의류
                </div>
                <div
                  style={
                    category1 === "패션의류" && category2 === "아동의류"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    setCategory2("아동의류");
                    setCategory3("");
                  }}
                >
                  아동의류
                </div>
              </>
            )}
            {category1 === "패션잡화" && (
              <>
                <div
                  style={
                    category1 === "패션잡화" && category2 === "악세사리"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    setCategory2("악세사리");
                    setCategory3("");
                  }}
                >
                  악세사리
                </div>
                <div
                  style={
                    category1 === "패션잡화" && category2 === "신발"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    setCategory2("신발");
                    setCategory3("");
                  }}
                >
                  신발
                </div>
              </>
            )}
          </div>

          <div className="regi_category3">
            {category1 === "패션의류" && category2 === "남성의류" && (
              <>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "남성의류" &&
                    category3 === "상의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("상의")}
                >
                  상의
                </div>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "남성의류" &&
                    category3 === "하의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("하의")}
                >
                  하의
                </div>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "남성의류" &&
                    category3 === "한벌옷"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("한벌옷")}
                >
                  한벌옷
                </div>
              </>
            )}
            {category1 === "패션의류" && category2 === "여성의류" && (
              <>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "여성의류" &&
                    category3 === "상의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("상의")}
                >
                  상의
                </div>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "여성의류" &&
                    category3 === "하의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("하의")}
                >
                  하의
                </div>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "여성의류" &&
                    category3 === "한벌옷"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("한벌옷")}
                >
                  한벌옷
                </div>
              </>
            )}
            {category1 === "패션의류" && category2 === "아동의류" && (
              <>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "아동의류" &&
                    category3 === "상의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("상의")}
                >
                  상의
                </div>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "아동의류" &&
                    category3 === "하의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("하의")}
                >
                  하의
                </div>
                <div
                  style={
                    category1 === "패션의류" &&
                    category2 === "아동의류" &&
                    category3 === "한벌옷"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("한벌옷")}
                >
                  한벌옷
                </div>
              </>
            )}

            {category1 === "패션잡화" && category2 === "악세사리" && (
              <>
                <div
                  style={
                    category1 === "패션잡화" &&
                    category2 === "악세사리" &&
                    category3 === "귀고리"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("귀고리")}
                >
                  귀고리
                </div>
                <div
                  style={
                    category1 === "패션잡화" &&
                    category2 === "악세사리" &&
                    category3 === "장갑"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("장갑")}
                >
                  장갑
                </div>
                <div
                  style={
                    category1 === "패션잡화" &&
                    category2 === "악세사리" &&
                    category3 === "망토"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("망토")}
                >
                  망토
                </div>
                <div
                  style={
                    category1 === "패션잡화" &&
                    category2 === "악세사리" &&
                    category3 === "모자"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("모자")}
                >
                  모자
                </div>
              </>
            )}
            {category1 === "패션잡화" && category2 === "신발" && (
              <>
                <div
                  style={
                    category1 === "패션잡화" &&
                    category2 === "신발" &&
                    category3 === "운동화"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("운동화")}
                >
                  운동화
                </div>
                <div
                  style={
                    category1 === "패션잡화" &&
                    category2 === "신발" &&
                    category3 === "슬리퍼"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => setCategory3("슬리퍼")}
                >
                  슬리퍼
                </div>
              </>
            )}
          </div>
        </div>
        <div></div>
        <div className="regi_selcetcategory" style={{ marginTop: "1vw" }}>
          {category1 && (
            <>
              <span style={{ fontSize: "1vw" }}>선택된 카테고리:</span>{" "}
              {category1} {">"}{" "}
            </>
          )}
          {category1 && category2 && `${category2} > `}
          {category1 && category2 && category3 && `${category3}`}
        </div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          거래지역<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_address">
          <button>기본 위치</button>
          <button onClick={handleAddressClick}>새 위치</button>
          <div>
            <input
              readonly
              onFocus={handleAddressFocus}
              value={selectedAddress}
            ></input>
          </div>
        </div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          상품상태<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_status">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="새상품 (미사용)"
                onClick={(e) => setStatus(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="새상품 (미사용)"
              />
              <FormControlLabel
                value="사용감 없음"
                onClick={(e) => setStatus(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="사용감 없음"
              />
              <FormControlLabel
                value="사용감 적음"
                onClick={(e) => setStatus(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="사용감 적음"
              />
              <FormControlLabel
                value="사용감 많음"
                onClick={(e) => setStatus(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="사용감 많음"
              />
              <FormControlLabel
                value="고장/파손 상품"
                onClick={(e) => setStatus(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="고장/파손 상품"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          교환<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_change">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="가능"
                onClick={(e) => setChange(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="가능"
              />
              <FormControlLabel
                value="불가"
                onClick={(e) => setChange(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="불가"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          가격<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_price">
          <input
            type="text"
            placeholder="가격을 입력해주세요."
            value={price}
            onChange={handlePriceChange}
          />
          <span>원</span>
        </div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          배송비<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_postprice">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="배송비포함"
                onClick={(e) => setPostprice(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="배송비포함"
              />
              <FormControlLabel
                value="배송비별도"
                onClick={(e) => setPostprice(e.target.value)}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.5vw",
                      },
                      color: grey[600],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                } // 스타일을 적용한 라디오 버튼
                label="배송비별도"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          설명<span style={{ color: "red" }}>*</span>
        </div>
        <div>이미지등록</div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          태그<span style={{ color: "red" }}>*</span>
        </div>
      </div>
      <div className="regi_select">
        <div className="regi_title">
          수량<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_price">
          <input
            value={count}
            onChange={(e) => {
              const enteredValue = e.target.value;
              const isNumeric = /^\d*$/.test(enteredValue);
              if (isNumeric && enteredValue.length <= 3) {
                setCount(enteredValue);
              }
            }}
            placeholder="갯수를 입력해주세요."
          />
          <span>개</span>
        </div>
      </div>
      <div className="regi_register">
        <button onClick={productpost}>등록하기</button>
      </div>
    </div>
  );
}

export default Regi;
