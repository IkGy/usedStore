import './report.css'
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

function Report() {
    return (
      <div className='KJH_admin-report_container'>
        <FaArrowUp />
        <div className='KJH_admin-report_title_section'>
          <div className='KJH_admin-report_title_info'>
            <div className='KJH_admin-report_title'>
              신고내역
            </div>
            <div className='KJH_admin-report_count'>
              n 건
            </div>
          </div>
          <div className='KJH_admin-report_table_container'>
            <table className='KJH_admin-report_table_setcion'>
              <colgroup>
                <col style={{ width: "5%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
                <col/>
                <col/>
              </colgroup>
              <thead>
                <tr className='KJH_admin-report_table_tr'>
                  <th>구분</th>
                  <th>신고 종류</th>
                  <th>해당 게시글</th>
                  <th>신고 내용</th>
                  <th>일자</th>
                  <th>판매자</th>
                  <th>신고자</th>
                </tr>
              </thead>
              <tbody className='KJH_admin-report_table_tbody'>
                <td className='KJH_index'>1</td>
                <td className='KJH_type'>시세 주작</td>
                <td className='KJH_post'><Link to='/detail/65b0b76a67zfc5776aeef539f' target='_blank'>에어 조던 1 로우</Link></td>
                <td className='KJH_type'>가격이 이상해요</td>
                <td className='KJH_date'>24.01.28 (수) - 하루전</td>
                <td className='KJH_seller'><b>Kuhn0808</b><br />(junho2088@naver.com)</td>
                <td className='KJH_buyer'><b>구름</b><br />(qwer1234@gmail.com)</td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
export default Report;