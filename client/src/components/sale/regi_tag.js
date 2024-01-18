function Regi_tag(props) {
  let handleKeyPress = (event) => {
    // 엔터 키의 키 코드는 13입니다.
    if (event.key === "Enter" && props.tag.length < 5 && event.target.value !== "") {
      const inputValue = event.target.value.replaceAll(" ", "");

      if (
        !props.tag.map((tagItem) => tagItem.replaceAll(" ", "")).includes(inputValue)
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
      <div>태그 ({props.tag.length}/5)</div>
      <div className="regi_tag">
        <input
          placeholder="태그을 입력해 주세요.(ex 태그명 + Enter)"
          onKeyDown={handleKeyPress}
        ></input>
        <div className="regi_selecttags">
          {props.tag[0] && (
            <>
              {"선택한 태그: "}
              <span className="regi_selecttag">
                #{props.tag[0]}
                <span className="regi_deltag" onClick={() => deletetag(0)}>
                  x
                </span>
              </span>
            </>
          )}
          {props.tag[1] && (
            <>
              {" ,"}
              <span className="regi_selecttag">
                #{props.tag[1]}
                <span className="regi_deltag" onClick={() => deletetag(1)}>
                  x
                </span>
              </span>
            </>
          )}
          {props.tag[2] && (
            <>
              {" ,"}
              <span className="regi_selecttag">
                #{props.tag[2]}
                <span className="regi_deltag" onClick={() => deletetag(2)}>
                  x
                </span>
              </span>
            </>
          )}
          {props.tag[3] && (
            <>
              {" ,"}
              <span className="regi_selecttag">
                #{props.tag[3]}
                <span className="regi_deltag" onClick={() => deletetag(3)}>
                  x
                </span>
              </span>
            </>
          )}
          {props.tag[4] && (
            <>
              {" ,"}
              <span className="regi_selecttag">
                #{props.tag[4]}
                <span className="regi_deltag" onClick={() => deletetag(4)}>
                  x
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Regi_tag;
