function Regi_title(props) {
  return (
    <div className="regi_select">
      <div className="regi_title">
        상품명
        {props.title ? (
          <i
            style={{ color: "green", paddingLeft: "0.5vw" }}
            class="fa-solid fa-check"
          ></i>
        ) : (
          <span style={{ color: "red" }}>*</span>
        )}
      </div>
      <div className="regi_title">
        <input
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          placeholder="상품명을 입력해 주세요."
        ></input>
      </div>
    </div>
  );
}

export default Regi_title;
