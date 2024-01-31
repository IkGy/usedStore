function Regi_content(props){
  return (
    <div className="regi_select">
        <div className="regi_title">
          설명
          {props.content ? (
            <i
              style={{ color: "#2748b0", paddingLeft: "0.5vw" }}
              class="fa-solid fa-check"
            ></i>
          ) : (
            <span style={{ color: "red" }}>*</span>
          )}
        </div>
        <div className="regi_content">
          <textarea
            spellcheck="false"
            value={props.content}
            onChange={(e) => {
              const enteredValue = e.target.value;

              // 입력된 값이 2000자 이하일 때만 업데이트
              if (enteredValue.length <= 2000) {
                props.setContent(enteredValue);
              }
            }}
            placeholder="상품 내용을 입력해주세요"
          />
          <div className="regi_contentlength">{props.content.length}/2000</div>
        </div>
      </div>
  )
}

export default Regi_content