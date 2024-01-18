function Regi_category(props){
  return (
    <div className="regi_select">
        <div className="regi_title">
          카테고리
          {props.category1 ? (
            <i
              style={{ color: "green", paddingLeft: "0.5vw" }}
              class="fa-solid fa-check"
            ></i>
          ) : (
            <span style={{ color: "red" }}>*</span>
          )}
        </div>
        <div className="regi_category">
          <div className="regi_category1">
            <div
              style={props.category1 === "패션의류" ? { color: "green" } : {}}
              onClick={() => {
                props.setCategory1("패션의류");
                props.setCategory2("");
                props.setCategory3("");
              }}
            >
              패션의류
            </div>
            <div
              style={props.category1 === "패션잡화" ? { color: "green" } : {}}
              onClick={() => {
                props.setCategory1("패션잡화");
                props.setCategory2("");
                props.setCategory3("");
              }}
            >
              패션잡화
            </div>
          </div>
          <div className="regi_category2">
            {props.category1 === "패션의류" && (
              <>
                <div
                  style={
                    props.category1 === "패션의류" && props.category2 === "남성의류"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    props.setCategory2("남성의류");
                    props.setCategory3("");
                  }}
                >
                  남성의류
                </div>
                <div
                  style={
                    props.category1 === "패션의류" && props.category2 === "여성의류"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    props.setCategory2("여성의류");
                    props.setCategory3("");
                  }}
                >
                  여성의류
                </div>
                <div
                  style={
                    props.category1 === "패션의류" && props.category2 === "아동의류"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    props.setCategory2("아동의류");
                    props.setCategory3("");
                  }}
                >
                  아동의류
                </div>
              </>
            )}
            {props.category1 === "패션잡화" && (
              <>
                <div
                  style={
                    props.category1 === "패션잡화" && props.category2 === "악세사리"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    props.setCategory2("악세사리");
                    props.setCategory3("");
                  }}
                >
                  악세사리
                </div>
                <div
                  style={
                    props.category1 === "패션잡화" && props.category2 === "신발"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => {
                    props.setCategory2("신발");
                    props.setCategory3("");
                  }}
                >
                  신발
                </div>
              </>
            )}
          </div>

          <div className="regi_category3">
            {props.category1 === "패션의류" && props.category2 === "남성의류" && (
              <>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "남성의류" &&
                    props.category3 === "상의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("상의")}
                >
                  상의
                </div>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "남성의류" &&
                    props.category3 === "하의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("하의")}
                >
                  하의
                </div>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "남성의류" &&
                    props.category3 === "한벌옷"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("한벌옷")}
                >
                  한벌옷
                </div>
              </>
            )}
            {props.category1 === "패션의류" && props.category2 === "여성의류" && (
              <>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "여성의류" &&
                    props.category3 === "상의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("상의")}
                >
                  상의
                </div>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "여성의류" &&
                    props.category3 === "하의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("하의")}
                >
                  하의
                </div>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "여성의류" &&
                    props.category3 === "한벌옷"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("한벌옷")}
                >
                  한벌옷
                </div>
              </>
            )}
            {props.category1 === "패션의류" && props.category2 === "아동의류" && (
              <>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "아동의류" &&
                    props.category3 === "상의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("상의")}
                >
                  상의
                </div>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "아동의류" &&
                    props.category3 === "하의"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("하의")}
                >
                  하의
                </div>
                <div
                  style={
                    props.category1 === "패션의류" &&
                    props.category2 === "아동의류" &&
                    props.category3 === "한벌옷"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("한벌옷")}
                >
                  한벌옷
                </div>
              </>
            )}

            {props.category1 === "패션잡화" && props.category2 === "악세사리" && (
              <>
                <div
                  style={
                    props.category1 === "패션잡화" &&
                    props.category2 === "악세사리" &&
                    props.category3 === "귀고리"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("귀고리")}
                >
                  귀고리
                </div>
                <div
                  style={
                    props.category1 === "패션잡화" &&
                    props.category2 === "악세사리" &&
                    props.category3 === "장갑"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("장갑")}
                >
                  장갑
                </div>
                <div
                  style={
                    props.category1 === "패션잡화" &&
                    props.category2 === "악세사리" &&
                    props.category3 === "망토"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("망토")}
                >
                  망토
                </div>
                <div
                  style={
                    props.category1 === "패션잡화" &&
                    props.category2 === "악세사리" &&
                    props.category3 === "모자"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("모자")}
                >
                  모자
                </div>
              </>
            )}
            {props.category1 === "패션잡화" && props.category2 === "신발" && (
              <>
                <div
                  style={
                    props.category1 === "패션잡화" &&
                    props.category2 === "신발" &&
                    props.category3 === "운동화"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("운동화")}
                >
                  운동화
                </div>
                <div
                  style={
                    props.category1 === "패션잡화" &&
                    props.category2 === "신발" &&
                    props.category3 === "슬리퍼"
                      ? { color: "green" }
                      : {}
                  }
                  onClick={() => props.setCategory3("슬리퍼")}
                >
                  슬리퍼
                </div>
              </>
            )}
          </div>
        </div>
        <div></div>
        <div className="regi_selcetcategory" style={{ marginTop: "1vw" }}>
          {props.category1 && (
            <>
              <span>선택된 카테고리:</span>{" "}
              {props.category1}
            </>
          )}
          {props.category1 && props.category2 && ` > ${props.category2}`}
          {props.category1 && props.category2 && props.category3 && ` > ${props.category3}`}
        </div>
      </div>
  )
}

export default Regi_category