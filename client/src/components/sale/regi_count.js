function Regi_count(props) {
  return (
    <div className="regi_select" style={{ borderBottom: "none" }}>
      <div style={{display:"flex", alignItems:"center"}}>
        수량
        {props.count ? (
          <i
            style={{ color: "#2748b0", paddingLeft: "0.5vw" }}
            class="fa-solid fa-check"
          ></i>
        ) : (
          <span style={{ color: "red" }}>*</span>
        )}
      </div>
      <div className="regi_price">
        <input
          value={props.count}
          onChange={(e) => {
            const enteredValue = e.target.value;
            const isNumeric = /^\d*$/.test(enteredValue);
            if (isNumeric && enteredValue.length <= 3) {
              props.setCount(enteredValue);
            }
          }}
          placeholder="갯수를 입력해주세요."
        />
        <span>개</span>
      </div>
    </div>
  );
}

export default Regi_count;
