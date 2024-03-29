function Regi_tag(props) {
  let handleKeyPress = (event) => {
    // 엔터 키의 키 코드는 13입니다.
    if (
      event.key === "Enter" &&
      props.tag.length < 5 &&
      event.target.value !== ""
    ) {
      const inputValue = event.target.value.replaceAll("", "");

      if (
        !props.tag
          .map((tagItem) => tagItem.replaceAll(" ", ""))
          .includes(inputValue)
      ) {
        let copy = [...props.tag];
        copy.push(event.target.value);
        props.setTag(copy);
        event.target.value = "";
      } else {
        event.target.value = "";
      }
    } else if (event.key === "Enter" && props.tag.length >= 5) {
      event.target.value = "";
      alert("입력가능한 태크는 최대 5개 입니다.");
    }
  };

  let deletetag = (index) => {
    let copy = [...props.tag];
    copy.splice(index, 1);
    props.setTag(copy);
  };

  return (
    <div className="regi_select">
      <div style={{ marginTop: "0.7vw" }}>태그 ({props.tag.length}/5)</div>
      <div className="regi_tag">
        <input
          placeholder="태그을 입력해 주세요.(ex 태그명 + Enter)"
          onKeyDown={handleKeyPress}
        ></input>
        <div className="regi_selecttags">
          {props.tag[0] && (
            <div style={{ fontFamily: "JalnanGothic", marginTop: "0.7vw" }}>
              {"선택한 태그: "}
            </div>
          )}
          <div>
            {props.tag[0] && (
              <>
                <span className="regi_selecttag">
                  <div>
                    #{props.tag[0]}
                    <div className="regi_deltag" onClick={() => deletetag(0)}>
                      x
                    </div>
                  </div>
                </span>
              </>
            )}
            {props.tag[1] && (
              <>
                {" ,"}
                <span className="regi_selecttag">
                  <div>
                    #{props.tag[1]}
                    <div className="regi_deltag" onClick={() => deletetag(1)}>
                      x
                    </div>
                  </div>
                </span>
              </>
            )}
            {props.tag[2] && (
              <>
                {" ,"}
                <span className="regi_selecttag">
                  <div>
                    #{props.tag[2]}
                    <div className="regi_deltag" onClick={() => deletetag(2)}>
                      x
                    </div>
                  </div>
                </span>
              </>
            )}
            {props.tag[3] && (
              <>
                {" ,"}
                <span className="regi_selecttag">
                  <div>
                    #{props.tag[3]}
                    <div className="regi_deltag" onClick={() => deletetag(3)}>
                      x
                    </div>
                  </div>
                </span>
              </>
            )}
            {props.tag[4] && (
              <>
                {" ,"}
                <span className="regi_selecttag">
                  <div>
                    #{props.tag[4]}
                    <div className="regi_deltag" onClick={() => deletetag(4)}>
                      x
                    </div>
                  </div>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regi_tag;
