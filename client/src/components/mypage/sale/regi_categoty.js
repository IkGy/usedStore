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
          {["패션의류", "패션잡화", "디지털", "가전제품"].map(
            (category, index) => (
              <div
                key={index}
                style={props.category1 === category ? { color: "green" } : {}}
                onClick={() => setCategory(category)}
              >
                {category}
              </div>
            )
          )}
        </div>
        <div className="regi_category2">
          {props.category1 === "패션의류" && (
            <>
              {["남성의류", "여성의류", "아동의류"].map(
                (subCategory, index) => (
                  <div
                    key={index}
                    style={
                      props.category2 === subCategory ? { color: "green" } : {}
                    }
                    onClick={() => setCategory(props.category1, subCategory)}
                  >
                    {subCategory}
                  </div>
                )
              )}
            </>
          )}
          {props.category1 === "패션잡화" && (
            <>
              {["악세사리", "신발"].map((subCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category2 === subCategory ? { color: "green" } : {}
                  }
                  onClick={() => setCategory(props.category1, subCategory)}
                >
                  {subCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "디지털" && (
            <>
              {[
                "휴대폰",
                "태블릿",
                "웨어러블(워치/밴드)",
                "오디오/영상/관련기기",
                "PC/노트북",
                "게임/타이틀",
                "카메라/DSLR",
                "PC부품/저장장치",
              ].map((subCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category2 === subCategory ? { color: "green" } : {}
                  }
                  onClick={() => setCategory(props.category1, subCategory)}
                >
                  {subCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "가전제품" && (
            <>
              {[
                "생활가전",
                "주방가전",
                "미용가전",
                "냉장고",
                "에어컨",
                "세탁기/건조기",
                "TV",
                "사무기기(복사기/팩스 등)",
                "기타 가전제품",
              ].map((subCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category2 === subCategory ? { color: "green" } : {}
                  }
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
                  style={
                    props.category3 === subSubCategory ? { color: "green" } : {}
                  }
                  onClick={() =>
                    setCategory(
                      props.category1,
                      props.category2,
                      subSubCategory
                    )
                  }
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "패션잡화" && props.category2 === "악세사리" && (
            <>
              {["귀고리", "장갑", "망토", "모자"].map(
                (subSubCategory, index) => (
                  <div
                    key={index}
                    style={
                      props.category3 === subSubCategory
                        ? { color: "green" }
                        : {}
                    }
                    onClick={() =>
                      setCategory(
                        props.category1,
                        props.category2,
                        subSubCategory
                      )
                    }
                  >
                    {subSubCategory}
                  </div>
                )
              )}
            </>
          )}
          {props.category1 === "패션잡화" && props.category2 === "신발" && (
            <>
              {["운동화", "슬리퍼"].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category3 === subSubCategory ? { color: "green" } : {}
                  }
                  onClick={() =>
                    setCategory(
                      props.category1,
                      props.category2,
                      subSubCategory
                    )
                  }
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "디지털" && props.category2 === "휴대폰" && (
            <>
              {[
                "스마트폰",
                "일반폰(피쳐폰)",
                "케이스/보호필름/액세서리",
                "케이블/충전기/주변기기",
                "기타 휴대폰",
              ].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category3 === subSubCategory ? { color: "green" } : {}
                  }
                  onClick={() =>
                    setCategory(
                      props.category1,
                      props.category2,
                      subSubCategory
                    )
                  }
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "디지털" && props.category2 === "태블릿" && (
            <>
              {[
                "태블릿",
                "케이스/보호필름/액세서리",
                "케이블/충전기/주변기기",
              ].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category3 === subSubCategory ? { color: "green" } : {}
                  }
                  onClick={() =>
                    setCategory(
                      props.category1,
                      props.category2,
                      subSubCategory
                    )
                  }
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "디지털" &&
            props.category2 === "웨어러블(워치/밴드)" && (
              <>
                {[
                  "스마트워치/밴드",
                  "케이스/보호필름/액세서리",
                  "케이블/충전기/주변기기",
                ].map((subSubCategory, index) => (
                  <div
                    key={index}
                    style={
                      props.category3 === subSubCategory
                        ? { color: "green" }
                        : {}
                    }
                    onClick={() =>
                      setCategory(
                        props.category1,
                        props.category2,
                        subSubCategory
                      )
                    }
                  >
                    {subSubCategory}
                  </div>
                ))}
              </>
            )}
          {props.category1 === "디지털" &&
            props.category2 === "오디오/영상/관련기기" && (
              <>
                {[
                  "이어폰",
                  "헤드폰",
                  "스피커/앰프",
                  "MP3/PMP",
                  "비디오/프로젝터",
                  "오디오/홈시어터",
                  "기타 오디오/영상/관련기기",
                ].map((subSubCategory, index) => (
                  <div
                    key={index}
                    style={
                      props.category3 === subSubCategory
                        ? { color: "green" }
                        : {}
                    }
                    onClick={() =>
                      setCategory(
                        props.category1,
                        props.category2,
                        subSubCategory
                      )
                    }
                  >
                    {subSubCategory}
                  </div>
                ))}
              </>
            )}
          {props.category1 === "디지털" && props.category2 === "PC/노트북" && (
            <>
              {[
                "데스크탑",
                "노트북/넷북",
                "모니터",
                "키보드",
                "마우스",
                "기타 PC 주변기기",
                "노트북 가방/액세서리",
                "기타 PC/노트북",
              ].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category3 === subSubCategory ? { color: "green" } : {}
                  }
                  onClick={() =>
                    setCategory(
                      props.category1,
                      props.category2,
                      subSubCategory
                    )
                  }
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "디지털" &&
            props.category2 === "게임/타이틀" && (
              <>
                {[
                  "닌텐도/NDS/Wii",
                  "소니/플레이스테이션",
                  "XBOX",
                  "PC게임",
                  "기타 게임/타이틀",
                ].map((subSubCategory, index) => (
                  <div
                    key={index}
                    style={
                      props.category3 === subSubCategory
                        ? { color: "green" }
                        : {}
                    }
                    onClick={() =>
                      setCategory(
                        props.category1,
                        props.category2,
                        subSubCategory
                      )
                    }
                  >
                    {subSubCategory}
                  </div>
                ))}
              </>
            )}
          {props.category1 === "디지털" &&
            props.category2 === "카메라/DSLR" && (
              <>
                {[
                  "필름카메라/중형카메라",
                  "DSLR/미러리스",
                  "렌즈/필터/컨버터",
                  "일반디카/토이카메라",
                  "삼각대/플래시/조명",
                  "디지털 캠코더",
                  "메모리/베터리/가방",
                  "기타 카메라",
                ].map((subSubCategory, index) => (
                  <div
                    key={index}
                    style={
                      props.category3 === subSubCategory
                        ? { color: "green" }
                        : {}
                    }
                    onClick={() =>
                      setCategory(
                        props.category1,
                        props.category2,
                        subSubCategory
                      )
                    }
                  >
                    {subSubCategory}
                  </div>
                ))}
              </>
            )}
          {props.category1 === "디지털" &&
            props.category2 === "PC부품/저장장치" && (
              <>
                {[
                  "CPU/메인보드",
                  "HDD/ODD/SSD",
                  "USB/케이블/스피커",
                  "복합기/프린터",
                  "네트워크장비",
                  "쿨러/파워서플라이",
                  "메모리/VGA",
                  "소모품",
                ].map((subSubCategory, index) => (
                  <div
                    key={index}
                    style={
                      props.category3 === subSubCategory
                        ? { color: "green" }
                        : {}
                    }
                    onClick={() =>
                      setCategory(
                        props.category1,
                        props.category2,
                        subSubCategory
                      )
                    }
                  >
                    {subSubCategory}
                  </div>
                ))}
              </>
            )}
          {props.category1 === "가전제품" && props.category2 === "생활가전" && (
            <>
              {[
                "마사지기",
                "청소기",
                "공기청정기",
                "가습기",
                "제습기",
                "선풍기/냉풍기",
                "히터/온풍기",
                "전기매트/장판",
                "다리미",
                "미싱/재봉틀",
              ].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category3 === subSubCategory ? { color: "green" } : {}
                  }
                  onClick={() =>
                    setCategory(
                      props.category1,
                      props.category2,
                      subSubCategory
                    )
                  }
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "가전제품" && props.category2 === "주방가전" && (
            <>
              {[
                "인덕션/전기레인지",
                "전기밥솥",
                "커피머신",
                "에어프라이어",
                "믹서기/블렌더",
                "식기세척기",
                "정수기",
                "오븐",
                "전기포트",
                "토스터",
                "전자레인지",
                "음식물 처리기",
              ].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category3 === subSubCategory ? { color: "green" } : {}
                  }
                  onClick={() =>
                    setCategory(
                      props.category1,
                      props.category2,
                      subSubCategory
                    )
                  }
                >
                  {subSubCategory}
                </div>
              ))}
            </>
          )}
          {props.category1 === "가전제품" && props.category2 === "미용가전" && (
            <>
              {[
                "피부케어기기",
                "고데기",
                "드라이기",
                "면도기/이발기",
                "제모기",
              ].map((subSubCategory, index) => (
                <div
                  key={index}
                  style={
                    props.category3 === subSubCategory ? { color: "green" } : {}
                  }
                  onClick={() =>
                    setCategory(
                      props.category1,
                      props.category2,
                      subSubCategory
                    )
                  }
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
