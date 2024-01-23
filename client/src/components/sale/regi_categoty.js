import React from "react";

function Regi_category(props) {
  const setCategory = (category, subCategory = "", subSubCategory = "") => {
    props.setCategory1(category);
    props.setCategory2(subCategory);
    props.setCategory3(subSubCategory);
  };

  return (
    <div className="regi_select">
      <div className="regi_title">
        카테고리
        {props.category1 ? (
          <i
            style={{ color: "green", paddingLeft: "0.5vw" }}
            className="fa-solid fa-check"
          ></i>
        ) : (
          <span style={{ color: "red" }}>*</span>
        )}
      </div>
      <div className="regi_category">
        <div className="regi_category1">
          {["패션의류", "패션잡화", "카드"].map((category, index) => (
            <div
              key={index}
              style={props.category1 === category ? { color: "green" } : {}}
              onClick={() => setCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="regi_category2">
          {props.category1 === "패션의류" && (
            <>
              {["남성의류", "여성의류", "아동의류"].map((subCategory, index) => (
                <div
                  key={index}
                  style={props.category2 === subCategory ? { color: "green" } : {}}
                  onClick={() => setCategory(props.category1, subCategory)}
                >
                  {subCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "패션잡화" && (
            <>
              {["악세사리", "신발"].map((subCategory, index) => (
                <div
                  key={index}
                  style={props.category2 === subCategory ? { color: "green" } : {}}
                  onClick={() => setCategory(props.category1, subCategory)}
                >
                  {subCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "카드" && (
            <>
              {['하스스톤', "유희왕"].map((subCategory, index) => (
                <div
                  key={index}
                  style={props.category2 === subCategory ? { color: "green" } : {}}
                  onClick={() => setCategory(props.category1, subCategory)}
                >
                  {subCategory}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="regi_category3">
          {props.category1 === "패션의류" && props.category2 && (
            <>
              {["상의", "하의", "한벌옷"].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={props.category3 === subSubCategory ? { color: "green" } : {}}
                  onClick={() => setCategory(props.category1, props.category2, subSubCategory)}
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "패션잡화" && props.category2 === "악세사리" && (
            <>
              {["귀고리", "장갑", "망토", "모자"].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={props.category3 === subSubCategory ? { color: "green" } : {}}
                  onClick={() => setCategory(props.category1, props.category2, subSubCategory)}
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "패션잡화" && props.category2 === "신발" && (
            <>
              {["운동화", "슬리퍼"].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={props.category3 === subSubCategory ? { color: "green" } : {}}
                  onClick={() => setCategory(props.category1, props.category2, subSubCategory)}
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "카드" && props.category2 === "하스스톤" && (
            <>
              {["전설", "특급", "희귀", "일반", "무료"].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={props.category3 === subSubCategory ? { color: "green" } : {}}
                  onClick={() => setCategory(props.category1, props.category2, subSubCategory)}
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "카드" && props.category2 === "유희왕" && (
            <>
              {["몬스터", "마법", "함정"].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={props.category3 === subSubCategory ? { color: "green" } : {}}
                  onClick={() => setCategory(props.category1, props.category2, subSubCategory)}
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div></div>
      <div className="regi_selcetcategory" style={{ marginTop: "1vw" }}>
        {props.category1 && (
          <>
            <span>선택된 카테고리:</span> {props.category1}
          </>
        )}
        {props.category2 && ` > ${props.category2}`}
        {props.category3 && ` > ${props.category3}`}
      </div>
    </div>
  );
}

export default Regi_category;