import React, { useEffect, useState } from "react";
import "./category.css";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

function Category(props) {
  const [category, setCategory] = useState([]);
  const [dropcategories, setDropCategories] = useState({
    category1: ["패션의류", "패션잡화", "카드"],
    category2: [],
    category3: [],
  });

  useEffect(() => {
    if (props.info.category) {
      setCategory(props.info.category);
      updateDropCategories();
    }
  }, [props.info.category, category]);

  const updateDropCategories = () => {
    const newDropCategories = { ...dropcategories };
    console.log("newDropCategories: ",newDropCategories);

    switch (category[0]) {
      case "카드":
        newDropCategories.category2 = ["하스스톤", "유희왕"];
        if (category[1] === "하스스톤") {
          newDropCategories.category3 = ["전설", "특급", "희귀", "일반", "무료"];
        } else if (category[1] === "유희왕") {
          newDropCategories.category3 = ["몬스터", "마법", "함정"];
        }
        break;
      case "패션의류":
        newDropCategories.category2 = ["남성의류", "여성의류", "아동의류"];
        newDropCategories.category3 = ["상의", "하의", "한벌옷"];
        break;
      case "패션잡화":
        newDropCategories.category2 = ["악세사리", "신발"];
        if (category[1] === "악세사리") {
          newDropCategories.category3 = ["귀고리", "장갑", "망토", "모자"];
        } else if (category[1] === "신발") {
          newDropCategories.category3 = ["운동화", "슬리퍼"];
        }
        break;
      default:
        break;
    }

    setDropCategories(newDropCategories);
  };

  const renderDropdown = (categoryName, dropdownItems, index) => (
    <div className="KJH_cg_filter_section" key={categoryName}>
      <div className="KJH_cg_r-arrow">
        <IoIosArrowForward />
      </div>
      <div className={`KJH_cg_filter${category[index] === categoryName ? ' selected' : ''}`}>
        <div className="KJH_cg_dropdown_section">{category[index]}</div>
        <div className="KJH_cg_dropdown">
          {dropdownItems.map((item) => (
            <Link key={item} to={`/detailsearch/${item}`}>
              {item}
            </Link>
          ))}
        </div>
        <IoIosArrowDown />
      </div>
    </div>
  );
  
  return (
    <>
      <div className="KJH_cg_container">
        <div className="KJH_cg_home_section">
          <div className="KJH_cg_home">
            <Link to="/" className="KJH_cg_home_section">
              <AiOutlineHome />
              <div>홈</div>
            </Link>
          </div>
        </div>
  
        {Object.entries(dropcategories).map(([categoryName, dropdownItems], index) =>
          renderDropdown(categoryName, dropdownItems, index)
        )}
      </div>
    </>
  );
}

export default Category;