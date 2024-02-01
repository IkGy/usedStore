import axios from "axios";
import { useEffect } from "react";
import { getCookie } from "../../../useCookies";
import { API_URL } from "../../config/contansts";

function Regi_address(props) {
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

  const nomaladdress = () => {
    axios.get(`${API_URL}/user/address/${getCookie("login")}`).then((result) => {
      props.setSelectedAddress(result.data);
    });
  };

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = `${data.address} ${data.buildingName || ""}`;
        props.setSelectedAddress(fullAddress);
      },
    }).open();
  };
  //${data.buildingName || ""}
  const handleAddressFocus = (event) => {
    event.target.blur();
  };

  return (
    <div className="regi_select">
      <div className="regi_title">
        거래지역
        {props.selectedAddress ? (
          <i
            style={{ color: "#2748b0", paddingLeft: "0.5vw" }}
            class="fa-solid fa-check"
          ></i>
        ) : (
          <span style={{ color: "red" }}>*</span>
        )}
      </div>
      <div className="regi_address">
        <div className="regi_addressbtnbox">
          <button onClick={nomaladdress}>기본 위치</button>
          <button onClick={() => props.setSelectedAddress("전국")}>전국</button>
          <button onClick={handleAddressClick}>새 위치</button>
        </div>

        <div>
          <input
            readonly
            onFocus={handleAddressFocus}
            value={props.selectedAddress}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Regi_address;
