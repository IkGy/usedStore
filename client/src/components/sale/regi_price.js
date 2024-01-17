function Regi_price(props) {
  const handlePriceChange = (event) => {
    if (event.target.value.length < 12) {
      const numericValue = event.target.value.replace(/[^0-9]/g, "");
      const formattedPrice = Number(numericValue).toLocaleString();
      props.setPrice(formattedPrice);
    }
  };
  return (
    <div className="regi_select">
      <div className="regi_title">
        가격
        {props.price ? (
          <i
            style={{ color: "green", paddingLeft: "0.5vw" }}
            class="fa-solid fa-check"
          ></i>
        ) : (
          <span style={{ color: "red" }}>*</span>
        )}
      </div>
      <div className="regi_price">
        <input
          type="text"
          placeholder="가격을 입력해주세요."
          value={props.price}
          onChange={handlePriceChange}
        />
        <span>원</span>
      </div>
    </div>
  );
}

export default Regi_price;
