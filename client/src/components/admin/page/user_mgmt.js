import './user.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/contansts';


function UserManagement() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/admin/user`)
      .then(res => {
        setUserData(res.data);
      })
      .catch(error => {
        console.error('user 데이터 가져오기 실패:', error);
      });
  }, []);

  return (
    <div>
      <div className="usermgmt">유저관리</div>
      <table className="usermgmt_table">
        <thead className="usermgmt_thead">
          <tr className="usermgmt_tr">
            <th className="usermgmt_th">
              <label>
                전체선택&nbsp;&nbsp;
                <input type='checkbox' />
              </label>
            </th>
            <th className="usermgmt_th">_id (식별번호)</th>
            <th className="usermgmt_th">본명</th>
            <th className="usermgmt_th">아이디</th>
            <th className="usermgmt_th">닉네임</th>
            <th className="usermgmt_th">이메일</th>
            <th className="usermgmt_th">비밀번호</th>
            <th className="usermgmt_th">주소</th>
            <th className="usermgmt_th">휴대폰 번호</th>
            <th className="usermgmt_th">유저 상태</th>
            <th className="usermgmt_th">상점 한마디</th>
            <th className="usermgmt_th">생성 일</th>
          </tr>
        </thead>
        <tbody className='usermgmt_tbody'>   
          {userData.map(user => (
            <tr key={user._id} className='usermgmt_tr'>
              <td className='usermgmt_td'>
                <label>
                  선택&nbsp;&nbsp;
                  <input type='checkbox' />
                </label>
              </td>
              <td className='usermgmt_td'>{user._id}</td>
              <td className='usermgmt_td'>{user.real_name}</td>
              <td className='usermgmt_td'>{user.id}</td>
              <td className='usermgmt_td'>{user.nickname}</td>
              <td className='usermgmt_td'>{user.email}</td>
              <td className='usermgmt_td'>{user.password}</td>
              <td className='usermgmt_td'>{user.address}</td>
              <td className='usermgmt_td'>{user.phone_number}</td>
              <td className='usermgmt_td'>{user.role}</td>
              <td className='usermgmt_td'>{user.about}</td>
              <td className='usermgmt_td'>{user.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;