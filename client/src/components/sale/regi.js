import React, { useEffect, useState } from "react";
import "./regi.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function Regi() {
  const [selectedAddress, setSelectedAddress] = useState("");

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

  const radioStyle = {
    color: "gray", // 라디오 버튼의 기본 색상
    "&.Mui-checked": {
      color: "red", // 클릭 시 라디오 버튼의 색상 변경
    },
    "&:hover": {
      color: "red", // 호버 시 라디오 버튼의 색상 변경
    },
  };

  return (
    <div className="regi">
      <div className="regi_start">
        <span>기본정보</span>
        <span>*필수항목</span>
      </div>
      <div className="regi_select">
        <div>
          상품이미지<span style={{ color: "red" }}>*</span>
        </div>
        <div>
          <button className="regi_image">
            <i class="fa-solid fa-camera"></i>
            <div>이미지 등록</div>
          </button>
        </div>
      </div>
      <div className="regi_select">
        <div>
          상품명<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_title">
          <input placeholder="상품명을 입력해 주세요."></input>
        </div>
      </div>
      <div className="regi_select">
        <div>
          카테고리<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_category">
          <div className="regi_category1">
            <div>여성의류1</div>
            <div>여성의류2</div>
            <div>여성의류3</div>
            <div>여성의류4</div>
          </div>
          <div className="regi_category2">
            <div>여성의류1</div>
            <div>여성의류2</div>
            <div>여성의류3</div>
            <div>여성의류4</div>
          </div>
        </div>
      </div>
      <div className="regi_select">
        <div>
          거래지역<span style={{ color: "red" }}>*</span>
        </div>
        <div className="regi_address">
          <button>기본 위치</button>
          <button onClick={handleAddressClick}>새 위치</button>
          <input
            readonly
            onFocus={handleAddressFocus}
            value={selectedAddress}
          ></input>
        </div>
      </div>
      <div className="regi_select">
        <div>
          상품상태<span style={{ color: "red" }}>*</span>
        </div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="새상품 (미사용)"
              control={<Radio style={radioStyle} />} // 스타일을 적용한 라디오 버튼
              label="새상품 (미사용)"
            />
            <FormControlLabel
              value="사용감 없음"
              control={<Radio style={radioStyle} />} // 스타일을 적용한 라디오 버튼
              label="사용감 없음"
            />
            <FormControlLabel
              value="사용감 적음"
              control={<Radio style={radioStyle} />} // 스타일을 적용한 라디오 버튼
              label="사용감 적음"
            />
            <FormControlLabel
              value="사용감 많음"
              control={<Radio style={radioStyle} />} // 스타일을 적용한 라디오 버튼
              label="사용감 많음"
            />
            <FormControlLabel
              value="고장/파손 상품"
              control={<Radio style={radioStyle} />} // 스타일을 적용한 라디오 버튼
              label="고장/파손 상품"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="regi_select">
        <div>
          교환<span style={{ color: "red" }}>*</span>
        </div>
        <div>이미지등록</div>
      </div>
      <div className="regi_select">
        <div>
          가격<span style={{ color: "red" }}>*</span>
        </div>
        <div>이미지등록</div>
      </div>
      <div className="regi_select">
        <div>
          배송비<span style={{ color: "red" }}>*</span>
        </div>
        <div>이미지등록</div>
      </div>
      <div className="regi_select">
        <div>
          설명<span style={{ color: "red" }}>*</span>
        </div>
        <div>이미지등록</div>
      </div>
      <div className="regi_select">
        <div>
          태그<span style={{ color: "red" }}>*</span>
        </div>
        <div>이미지등록</div>
      </div>
      <div className="regi_select">
        <div>
          수량<span style={{ color: "red" }}>*</span>
        </div>
        <div>이미지등록</div>
      </div>
    </div>
  );
}

export default Regi;
