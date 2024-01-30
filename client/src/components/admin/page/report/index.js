import './report.css'
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { API_URL } from '../../../config/contansts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 날짜 계산

// 등록된 시간 : 'yy년 mm월 dd일 HH시 MM분'
function formatDateTime(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${(date.getMonth() + 1)}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
}

// 경과 시간 : 'n일 n시간 n분전'
function getTimeDifference(dateString) {
  const reportDate = new Date(dateString);
  const now = new Date();

  if (reportDate.toDateString() === now.toDateString()) {
    return "오늘";
  }

  const diff = now - reportDate;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffDays}일 ${diffHours}시간 ${diffMinutes}분전`;
}

function Report() {

  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchreport = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/report`);
        const sortedData = res.data.sort((a, b) => new Date(a.report_date) - new Date(b.report_date));
        console.log(sortedData);
        setReport(sortedData);
      } catch (error) {
        console.error('조회 에러', error);
      }
    };
    fetchreport();
  }, []);

    return (
      <div className='KJH_admin-report_uparrow'>
        <FaArrowUp />
        <div className='KJH_admin-report_container'>
          <div className='KJH_admin-report_title_section'>
            <div className='KJH_admin-report_title_info'>
              <div className='KJH_admin-report_title'>
                신고내역
              </div>
              <div className='KJH_admin-report_count'>
                {report.length}건
              </div>
            </div>
            <div className='KJH_admin-report_table_container'>
              <table className='KJH_admin-report_table_setcion'>
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "20%" }} />
                  <col/>
                  <col/>
                  <col/>
                </colgroup>
                <thead>
                  <tr className='KJH_admin-report_table_tr'>
                    <th>구분</th>
                    <th>신고 종류</th>
                    <th>게시글</th>
                    <th>신고 내용</th>
                    <th>일자</th>
                    <th>판매자</th>
                    <th>신고자</th>
                  </tr>
                </thead>
                <tbody className='KJH_admin-report_table_tbody'>
                  {report.map((item, index) => (
                    <tr key={index}>
                      <td className='KJH_index'>{index + 1}</td>
                      <td className='KJH_type'>{item.report_type}</td>
                      <td className='KJH_post'>
                        <Link to={`${item.reported_link}`} target='_blank'>{item.reported_post}</Link>
                      </td>
                      <td className='KJH_content'>{item.report_content}</td>
                      <td className='KJH_date'>
                      <div className='KJH_date_created'>{formatDateTime(item.report_date)}</div>
                      <div className='KJH_date_ago'>({getTimeDifference(item.report_date)})</div>
                      </td>
                      <td className='KJH_seller'>
                        <b>{item.reported_user_nickname}</b><br />{item.reported_user_email}
                      </td>
                      <td className='KJH_reporter'>
                        <b>{item.reporter_nickname}</b><br />{item.reporter_email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Report;