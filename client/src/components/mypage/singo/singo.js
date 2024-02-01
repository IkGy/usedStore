import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./singo.css";
import axios from "axios";
import { API_URL } from "../../config/contansts";
import { getCookie } from "../../../useCookies";

function Singo() {
  const [singonickname, setSingonickname] = useState("");
  const [usernickname, setUsernickname] = useState("");
  const [singocontent, setSingocontent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("광고성");
  const [title, setTitle] = useState("")
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };
  const [data, setData] = useState("");
  let { product_id } = useParams();


  let singo = () => {
    const report_type = selectedCategory;
    const reported_post = data.productinfo.title;
    const report_content = singocontent.trim();
    const report_date = new Date();
    const reported_link = `/detail/${product_id}`;
    const reported_user_nickname = singonickname;
    const reported_user_email = data.seller.email;
    const reporter_nickname = usernickname;
    const reporter_email = data.userinfo.email;
    const reported_product_id = product_id;

    if (report_content === "") {
      alert("신고내용을 입력해주세요.");
      setSingocontent("");
    } else {
      axios
        .post(`${API_URL}/report/singo`, {
          report_type: report_type,
          reported_post: reported_post,
          report_content: report_content,
          report_date: report_date,
          reported_link: reported_link,
          reported_user_nickname: reported_user_nickname,
          reported_user_email: reported_user_email,
          reporter_nickname: reporter_nickname,
          reporter_email: reporter_email,
          reported_product_id: reported_product_id,
        })
        .then((result) => {
          alert("신고가 접수되었습니다.");
          navigate("/");
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/report/singo/${product_id}/${getCookie("login")}`)
      .then((result) => {
        if (result.data === "이미신고함") {
          alert("이미 신고하신 상품입니다.");
          navigate(`/detail/${product_id}`);
        } else {
          setData(result.data);
          setUsernickname(result.data.userinfo.nickname);
          setSingonickname(result.data.seller.nickname);
          setTitle(result.data.productinfo.title)
        }
      });
  }, []);

  return (
    <div className="Singo_Container">
      <div className="Singo_Main">
        <div className="kk_ask_all">
          <div className="kk_ask_section">
            <div className="kk_ask_title">신고하기</div>
            <div className="kk_ask_gre_all">
              <div className="JSW_select_category">
                <div className='hm_title'>신고게시글 :</div>
                <div className='hm_content'>{title}</div>
              </div>
              <div className="JSW_select_category">
                <div className="JSW_select_title">카테고리</div>
                <div className="JSW_select">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option>광고성</option>
                    <option>상품정보 부적절</option>
                    <option>거래 금지 품목</option>
                    <option>사기</option>
                    <option>19금 콘텐츠</option>
                    <option>기타</option>
                  </select>
                </div>
              </div>
              <table className="kk_ask_btm_table">
                <caption>신고하기 테이블</caption>
                <tbody>
                  <tr scopte="col">
                    <th scope="col">신고대상자</th>
                    <td>
                      <span className="kk_form_text" style={{ width: "100%" }}>
                        <input
                          value={singonickname}
                          style={{ cursor: "default" }}
                          disabled
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr scopte="col">
                    <th scope="col">신고자</th>
                    <td>
                      <span className="kk_form_text" style={{ width: "100%" }}>
                        <input
                          value={usernickname}
                          style={{ cursor: "default" }}
                          disabled
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr scopte="col">
                    <th scope="col">신고내용 ({singocontent.length}/20)</th>
                    <td>
                      <span className="kk_form_text" style={{ width: "100%" }}>
                        <input
                          style={{ width: "100%" }}
                          placeholder="20자 이내로 작성해주세요."
                          value={singocontent}
                          onChange={(e) => {
                            let content = e.target.value;
                            if (content.length < 21) {
                              setSingocontent(e.target.value);
                            }
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="kk_ask_btm_btn_sction">
                <button onClick={onClickBtn} className="kk_ask_btm_btn_cancel">
                  <span>취소</span>
                </button>
                {/* 이부분은 데이터 취합해서 submit 하는 부분 만들어야함 */}
                <span onClick={singo} className="kk_ask_btm_btn_reg">
                  <span>등록하기</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singo;
