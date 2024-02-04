import React, { useEffect, useState } from "react";
import axios from "axios";
import "./category.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import SelectBar from "./selectBar";

function Category() {
  const [category, setCategory] = useState(["카테고리 선택"]);
  const [subCategory, setSubCategory] = useState([]);
  const [ssubCategory, setSSubCategory] = useState([]);
  const [dropcategories, setDropCategories] = useState({
    category1: [
      "패션의류",
      "패션잡화",
      "디지털",
      "가전제품",
      "도서·티켓·문구",
      "가구·인테리어",
      "반려동물용품",
      "분류없음",
    ],
    category2: [],
    category3: [],
  });

  useEffect(() => {
    updateDropCategories();
  }, [category, subCategory, ssubCategory]);

  const updateDropCategories = () => {
    console.log("test", category);
    console.log("subCategory", subCategory);
    const newDropCategories = { ...dropcategories };
    console.log("newDropCategories: ", newDropCategories);

    switch (category[0]) {
      case "반려동물용품":
        newDropCategories.category2 = [
          "강아지용픔",
          "강아지 사료·간식",
          "기타(강아지)",
          "고양이 용품",
          "고양이 샤료·간식",
          "기타(고양이)",
          "기타(반려동물 용품)",
          "기타(반려동물 사료·간식)",
        ];
        break;
      case "가구·인테리어":
        newDropCategories.category2 = [
          "가구",
          "침구",
          "수공예·수선",
          "셀프 인테리어 용품",
          "인테리어 소품",
          "꽃·원예",
          "조명",
          "카페트·러그·매그",
          "커튼·블라인드"
        ];
        if (subCategory[0] === "가구") {
          newDropCategories.category3 = [
            "거실가구",
            "침실가구",
            "학생·서재·사무용가구",
            "선반·수납 가구",
            "주방가구"
          ];
        } else if (subCategory[0] === "수공예·수선") {
          newDropCategories.category3 = [
            "수공예품",
            "수공예 용품·부자재",
          ];
        } else if (subCategory[0] === "인테리어 소품") {
          newDropCategories.category3 = [
            "포스터·그림·액자",
            "디퓨저·캔들",
            "쿠션·방석",
            "탁상·벽시계",
            "식탁보·테이블 매트",
            "거울",
            "기타 인테리어 소품"
          ];
        } else if (subCategory[0] === "꽃·원예") {
          newDropCategories.category3 = [
            "식물·꽃",
            "원예 용품",
          ];
        }
        break;
      case "도서·티켓·문구":
        newDropCategories.category2 = [
          "도서",
          "문구",
          "기프티콘·쿠폰",
          "상품권",
          "티켓",
        ];
        if (subCategory[0] === "도서") {
          newDropCategories.category3 = [
            "시·소설",
            "자기계발",
            "교양·인문",
            "경제·경영",
            "학습·사전·참고서",
            "아동·어린이",
            "만화",
            "예술·디자인",
            "여행·취미·레저·건강",
            "사회·정치·법",
            "과학·IT",
            "간행물",
            "기타(도서)",
          ];
        } else if (subCategory[0] === "문구") {
          newDropCategories.category3 = [
            "학습도구·문구·필기류",
            "미술·화방용품",
          ];
        } else if (subCategory[0] === "기프티콘·쿠폰") {
          newDropCategories.category3 = [
            "치킨·피자·햄버거",
            "베이커리·도넛·아이스크림",
            "커피(음료)",
            "편의점",
            "기타(기프트콘·쿠폰)",
          ];
        } else if (subCategory[0] === "상품권") {
          newDropCategories.category3 = [
            "문화·도서",
            "백화점",
            "외식",
            "기타(상품권)",
          ];
        } else if (subCategory[0] === "티켓") {
          newDropCategories.category3 = [
            "뮤지컬·연극",
            "콘서트",
            "영화(예매·관람권)",
            "여행·숙박·렌트",
            "테마파크",
            "스포츠·레저",
            "공연·전시·행사",
            "기타(티켓)",
          ];
        }
        break;
      case "디지털":
        newDropCategories.category2 = [
          "휴대폰",
          "테블릿",
          "웨어러블(워치·밴드)",
          "오디오·영상·관련기기",
          "PC·노트북",
          "게임·타이틀",
          "카메라·DSLR",
          "PC부품·저장장치",
        ];
        if (subCategory[0] === "휴대폰") {
          newDropCategories.category3 = [
            "스마트폰",
            "일반폰(피쳐폰)",
            "케이스·보호필름·액세서리",
            "케이블·충전기·주변기기",
            "기타 휴대폰",
          ];
        } else if (subCategory[0] === "테블릿") {
          newDropCategories.category3 = [
            "테블릿",
            "케이스·보호필름·액세서리",
            "케이블·충전기·주변기기",
          ];
        } else if (subCategory[0] === "웨어러블(워치·밴드)") {
          newDropCategories.category3 = [
            "스마트워치·밴드",
            "케이스·보호필름·액세서리",
            "케이블·충전기·주변기기",
          ];
        } else if (subCategory[0] === "오디오·영상·관련기기") {
          newDropCategories.category3 = [
            "이어폰",
            "헤드폰",
            "스피커·앰프",
            "MP3·PMP",
            "비디오·프로젝터",
            "오디오·홈시어터",
            "기타 오디오·영상·관련기기",
          ];
        } else if (subCategory[0] === "PC·노트북") {
          newDropCategories.category3 = [
            "데스크탑",
            "노트북·넷북",
            "모니터",
            "키보드",
            "마우스",
            "기타 PC 주변기기",
            "노트북 가방·액세서리",
            "기타 PC·노트북",
          ];
        } else if (subCategory[0] === "게임·타이틀") {
          newDropCategories.category3 = [
            "닌텐도·NDS·Wii",
            "소니·플레이스테이션",
            "XBOX",
            "PC게임",
            "기타 게임·타이틀",
          ];
        } else if (subCategory[0] === "카메라·DSLR") {
          newDropCategories.category3 = [
            "필름카메라·중형카메라",
            "DSLR·미러리스",
            "렌즈·필터·컨버터",
            "일반디카·토이카메라",
            "삼각대·플래시·조명",
            "디지털 캠코더",
            "메모리·베터리·가방",
            "기타 카메라",
          ];
        } else if (subCategory[0] === "PC부품·저장장치") {
          newDropCategories.category3 = [
            "CPU·메인보드",
            "HDD·ODD·SSD",
            "USB·케이블·스피커",
            "복합기·프린터",
            "네트워크장비",
            "쿨러·파워서플라이",
            "메모리·VGA",
            "소모품",
          ];
        }
        break;
      case "패션의류":
        newDropCategories.category2 = ["남성의류", "여성의류", "아동의류"];
        newDropCategories.category3 = ["상의", "하의", "한벌옷"];
        break;
      case "패션잡화":
        newDropCategories.category2 = ["악세사리", "신발"];
        if (subCategory[0] === "악세사리") {
          newDropCategories.category3 = ["귀고리", "장갑", "망토", "모자"];
        } else if (subCategory[0] === "신발") {
          newDropCategories.category3 = ["운동화", "슬리퍼"];
        }
        break;
      case "가전제품":
        newDropCategories.category2 = [
          "생활가전",
          "주방가전",
          "미용가전",
          "냉장고",
          "에어컨",
          "세탁기·건조기",
          "TV",
          `사무기기(복사기&팩스 등)`,
          "기타 가전제품",
        ];
        if (subCategory[0] === "생활가전") {
          newDropCategories.category3 = [
            "마사지기",
            "청소기",
            "공기청정기",
            "가습기",
            "제습기",
            "선풍기·냉풍기",
            "히터·온풍기",
            "전기매트&장판",
            "다리미",
            "미싱&재봉틀",
          ];
        } else if (subCategory[0] === "주방가전") {
          newDropCategories.category3 = [
            "인덕션·전기레인지",
            "전기밥솥",
            "커피머신",
            "에어프라이어",
            "믹서기·블렌더",
            "식기세척기",
            "정수기",
            "오븐",
            "전기포트",
            "토스터",
            "전자레인지",
            "음식물 처리기",
          ];
        } else if (subCategory[0] === "미용가전") {
          newDropCategories.category3 = [
            "피부케어기기",
            "고데기",
            "드라이기",
            "면도기·이발기",
            "제모기",
          ];
        }
        break;
      default:
        break;
    }
    setDropCategories(newDropCategories);
  };

  const selectCategory = (item) => {
    // console.log('test1',item);
    setCategory([item]);
    setSubCategory([]);
  };
  const selectSubCategory = (item) => {
    // console.log("test2", item);
    setSubCategory([item]);
    setSSubCategory([]);
  };
  const selectSSubCategory = (item) => {
    // console.log("test2", item);
    setSSubCategory([item]);
  };

  return (
    <div className="KJH_cg_container">
      <div className="KJH_cg_home_section">
        <div className="KJH_cg_home">
          <Link to="/" className="KJH_cg_home_section">
            <AiOutlineHome className="home_icon" />
            <div>홈</div>
          </Link>
        </div>
      </div>
      <SelectBar
        select={category}
        data={dropcategories.category1}
        setSelect={selectCategory}
      />
      <SelectBar
        select={subCategory}
        data={dropcategories.category2}
        setSelect={selectSubCategory}
      />
      <SelectBar
        select={ssubCategory}
        data={dropcategories.category3}
        setSelect={selectSSubCategory}
      />
    </div>
  );
}

export default Category;