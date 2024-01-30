import './user.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/contansts';

function UserManagement() {
  const [userData, setUserData] = useState([]);
  const [editStatus, setEditStatus] = useState({}); // 수정 상태를 관리하는 객체

  const [editNickname, setEditNickName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editAbout, setEditAbout] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/admin/user`)
      .then(res => {
        console.log(res);
        setUserData(res.data);
        // 모든 행의 수정 상태를 초기화합니다.
        const initialEditStatus = {};
        res.data.forEach(user => {
          initialEditStatus[user._id] = false;
        });
        setEditStatus(initialEditStatus);
      })
      .catch(error => {
        console.error('user 데이터 가져오기 실패:', error);
      });
  }, []);

  const saveUserData = async (id, field, value) => {
    await axios.post(`${API_URL}/admin/useredit/${id}`, { [field]: value })
      .then((res) => {
        console.log('데이터 수정 성공:', res.data);
        setUserData(userData.map(user => user._id === id ? { ...user, [field]: value } : user));
        // 저장 후 해당 행의 수정 상태를 비활성화합니다.
        setEditStatus(prevStatus => ({ ...prevStatus, [id]: false }));
      })
      .catch(error => {
        console.error('데이터 수정 실패:', error);
      });
  };

  const handleEdit = (id) => {
    // 수정 버튼 클릭 시 해당 행의 수정 상태를 활성화합니다.
    setEditStatus(prevStatus => ({ ...prevStatus, [id]: true }));
  };

  const handleSave = (id, field, value) => {
    saveUserData(id, field, value); // 수정된 내용을 저장하는 함수입니다.
  };

  const handleFieldChange = (id, field, value) => {
    if (field === 'nickname') {
      setEditNickName(value);
    } else if (field === 'role') {
      setEditRole(value);
    } else if (field === 'about') {
      setEditAbout(value);
    }
    setUserData(userData.map(user => user._id === id ? { ...user, [field]: value } : user));
  };

  return (
    <div>
      <table className="usermgmt_table">
        <colgroup>
          <col style={{ width: "7%" }} />
          <col style={{ width: "6%" }}  />
          <col style={{ width: "6%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "12%" }}  />
          <col style={{ width: "7%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "6%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead>
          <tr className='usermgmt_table_tr'>
            <th>유저관리</th>
            <th>본명</th>
            <th>아이디</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>비밀번호</th>
            <th>주소</th>
            <th>휴대폰 번호</th>
            <th>유저 상태</th>
            <th>상점 한마디</th>
          </tr>
        </thead>
        <tbody className='usermgmt_table_tbody'>
          {userData.map(user => (
            <tr key={user._id}>
              <td>
                {/* 수정 버튼 */}
                  {editStatus[user._id] ? 
                    <button onClick={() => handleSave(user._id, 'nickname', editNickname, 'role', editRole, 'about', editAbout)}>저장</button>
                    :
                    <button onClick={() => handleEdit(user._id)}>수정</button>
                  }
                &nbsp;<button>삭제</button>
              </td>
              {/* 본명 */}
              <td>{user.real_name}</td>
              {/* 아이디 */}
              <td>{user.id}</td>
              {/* 닉네임 */}
              <td>
                {editStatus[user._id] ? (
                  <input
                    id='user_nickname'
                    type='text'
                    value={editNickname}
                    onChange={(e) => setEditNickName(e.target.value)}
                  />
                ) : (
                  <div>{user.nickname}</div>
                )}
              </td>
              {/* 이메일 */}
              <td>{user.email}</td>
              {/* 비밀번호 */}
              <td>{user.password}</td>
              {/* 주소 */}
              <td>{user.address}</td>
              {/* 휴대폰 번호 */}
              <td>{user.phone_number}</td>
              {/* 유저 상태 */}
              <td>
                {editStatus[user._id] ? (
                  <input
                    id='user_role'
                    type='text'
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                  />
                ) : (
                  <div>{user.role}</div>
                )}
              </td>
              {/* 상점 한마디 */}
              <td>
                {editStatus[user._id] ? (
                  <input
                    id='user_about'
                    type='text'
                    value={editAbout}
                    onChange={(e) => setEditAbout(e.target.value)}
                  />
                ) : (
                  <span>{user.about}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;