import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Submit_Data from './submit_data';

import './singo.css';

function Singo() {


    const navigate = useNavigate(); //변수 할당시켜서 사용
    const onClickBtn = () => {
        navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
    };
      

  const rendertext = (text) => {
    return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
};

  return(
    <div className="Singo_Container">
      <div className="Singo_Main">
        <div className='kk_ask_all'>
          <div className='kk_ask_section'>
              <div className='kk_ask_title'>
                  신고하기
              </div>
              <div className='kk_ask_gre_all'>
                  <div className='kk_ask_btm_section'>
                      <div className='kk_ask_btm_title'>
                          신고내용 작성하기
                      </div>
                      {/* <div className='kk_ask_btm_title_right'>
                      필수입력사항
                      </div> */}
                  </div>
                  <div className='JSW_select_category'>
                    <div className='JSW_select_title'>카테고리</div>
                    <div className='JSW_select'>
                        <select>
                            <option>광고성</option>
                            <option>상품정보 부적절</option>
                            <option>부적절한 닉네임 및 상점 내용</option>
                            <option>거래 금지 품목</option>
                            <option>사기</option>
                            <option>19금 콘텐츠</option>
                            <option>기타</option>
                        </select>
                    </div>
                  </div>
                  <table className='kk_ask_btm_table'>
                      <caption>신고하기 테이블</caption>
                      <colgroup>
                          <col width="130px" />
                          <col width="*" />
                      </colgroup>
                      {Submit_Data.map((item) => (
                          <tbody key={item.id}>
                              <tr scopte="col">
                                  <th scope="col">
                                      {item.title}
                                  </th>
                                  <td>
                                      <span className='kk_form_text' style={{ width: '100%' }}>
                                          {item.type === 'textarea' ? (
                                              <textarea
                                                  id={item.input_id}
                                                  name={item.name}
                                                  placeholder={item.holder}
                                                  className='kk_form_textarea'
                                              />
                                          ) : (
                                              <input
                                                  id={item.input_id}
                                                  name={item.name}
                                                  placeholder={item.holder}
                                                  type={item.type}
                                              />
                                          )}
                                      </span>
                                  </td>
                              </tr>
                          </tbody>
                      ))}
                  </table>
                <div className='kk_ask_btm_btn_sction'>
                    <button onClick={onClickBtn} className='kk_ask_btm_btn_cancel'>
                        <span>취소</span>
                    </button>
                    {/* 이부분은 데이터 취합해서 submit 하는 부분 만들어야함 */}
                    <button type='submit' className='kk_ask_btm_btn_reg'>
                        <span>등록하기</span> 
                    </button>
                </div>
              </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Singo