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
  
  const getData = async()=>{
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
  }

  useEffect(() => {
    getData()
  }, []);

  const saveUserData = async (id) => {
    await axios.post(`${API_URL}/admin/useredit/${id}`, { nickname:editNickname, role: editRole, about: editAbout})
      .then((res) => {
        console.log('데이터 수정 성공:', res.data);
        getData();
        setEditStatus(null);
      })
      .catch(error => {
        console.error('데이터 수정 실패:', error);
      });
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm('정말로 사용자를 삭제하시겠습니까?');
    if (confirmed) {
    await axios.delete(`${API_URL}/admin/user/${id}`)
      .then((res) => {
        console.log('데이터 삭제 성공:', res.data);
        setUserData(userData.filter(user => user._id !== id));
      })
      .catch(error => {
        console.error('데이터 삭제 실패:', error);
      });
    }
  };

  const handleEdit = (id) => {
    // 수정 버튼 클릭 시 해당 행의 수정 상태를 활성화합니다.
    setEditStatus(prevStatus => ({ ...prevStatus, [id]: true }));
  };

  const handleSave = (id) => {
    saveUserData(id); // 수정된 내용을 저장하는 함수입니다.
    setEditStatus(prevStatus => ({ ...prevStatus, [id]: false }));
  };

  const handleFieldChange = (id, field, value) => {
    if (field === 'nickname') {
      setEditNickName(value);
    } else if (field === 'role') {
      setEditRole(value);
    } else if (field === 'about') {
      setEditAbout(value);
    }
    setUserData(userData && userData.map(user => user._id === id ? { ...user, [field]: value } : user));
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
          {userData && userData.map(user => (
            <tr key={user._id}>
              <td className='usermgmt_update_btn'>
                {/* 수정 버튼 */}
                  {editStatus[user._id] ? 
                    <button onClick={() => handleSave(user._id)}>저장</button>
                    :
                    <button onClick={() => handleEdit(user._id)}>수정</button>
                  }
                &nbsp;<button onClick={() => deleteUser(user._id)}>삭제</button>
              </td>
              {/* 본명 */}
              <td className='usermgmt_real_name'>{user.real_name}</td>
              {/* 아이디 */}
              <td className='usermgmt_id'>{user.id}</td>
              {/* 닉네임 */}
              <td className='usermgmt_nickname'>
                {editStatus[user._id] ? (
                  <input
                    id='user_nickname'
                    type='text'
                    defaultValue={user.nickname}
                    onChange={(e) => setEditNickName(e.target.value)}
                  />
                ) : (
                  <div>{user.nickname}</div>
                )}
              </td>
              {/* 이메일 */}
              <td className='usermgmt_email'>{user.email}</td>
              {/* 비밀번호 */}
              <td className='usermgmt_password'>{user.password}</td>
              {/* 주소 */}
              <td className='usermgmt_address'>{user.address}</td>
              {/* 휴대폰 번호 */}
              <td className='usermgmt_phone_number'>{user.phone_number}</td>
              {/* 유저 상태 */}
              <td className='usermgmt_role'>
                {editStatus[user._id] ? (
                  <input
                    id='user_role'
                    type='text'
                    defaultValue={user.role}
                    onChange={(e) => setEditRole(e.target.value)}
                  />
                ) : (
                  <div>{user.role}</div>
                )}
              </td>
              {/* 상점 한마디 */}
              <td className='usermgmt_about'>
                {editStatus[user._id] ? (
                  <input
                    id='user_about'
                    type='text'
                    defaultValue={user.about}
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