import React from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function SelectBar(props){
  const data = props.data;
  const selectData = props.select;
  return(
    <div className="KJH_cg_filter_section" key={0}>
      <div className="KJH_cg_r-arrow">
        <IoIosArrowForward />
      </div>
      <div
        className={`KJH_cg_filter${
          data[0] === 1 ? " selected" : ""
        }`}>
        {/* 카테고리 글자 표기 */}
        <div className="KJH_cg_dropdown_section">{selectData}</div>
        <div className="KJH_cg_dropdown">
        {data.map((item) => (
            <Link key={item} to={`/detailsearch/${item}`}onClick={(e)=>{
              props.setSelect(item)
            }}>
              {item}
            </Link>
          ))}
        </div>
          <IoIosArrowDown />
      </div>
    </div>
  )
};

export default SelectBar;