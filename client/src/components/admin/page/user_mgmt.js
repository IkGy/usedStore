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

  const [editingId, setEditingId] = useState(null);

  const saveUserData = async (id, field, value) => {
    await axios.post(`${API_URL}/admin/useredit/${id}`, { [field]: value, [field]: value })
      .then((res) => {
        console.log('데이터 수정 성공:', res.data);
        setUserData(userData.map(user => user._id === id ? { ...user, [field]: value } : user));

      })
      .catch(error => {
        console.error('데이터 수정 실패:', error);
      });
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id, field, value) => {
    saveUserData(id, field, value);
    setEditingId(null);
  };

  const handleFieldChange = (id, field, value) => {
    setUserData(userData.map(user => user._id === id ? { ...user, [field]: value } : user));
  };

  return (
    <div>
      <div className="usermgmt">유저관리</div>
      <table className="usermgmt_table">
        <thead className="usermgmt_thead">
          <tr className="usermgmt_tr">
            <th className="usermgmt_th" style={{ width: '7%' }}>유저관리</th>
            <th className="usermgmt_th" style={{ width: '6%' }}>본명</th>
            <th className="usermgmt_th" style={{ width: '6%' }}>아이디</th>
            <th className="usermgmt_th" style={{ width: '8%' }}>닉네임</th>
            <th className="usermgmt_th" style={{ width: '12%' }}>이메일</th>
            <th className="usermgmt_th" style={{ width: '7%' }}>비밀번호</th>
            <th className="usermgmt_th" style={{ width: '18%' }}>주소</th>
            <th className="usermgmt_th" style={{ width: '8%' }}>휴대폰 번호</th>
            <th className="usermgmt_th" style={{ width: '6%' }}>유저 상태</th>
            <th className="usermgmt_th" style={{ width: '20%' }}>상점 한마디</th>
          </tr>
        </thead>
        <tbody className='usermgmt_tbody'>
        {userData.map(user => (
            <tr key={user._id} className='usermgmt_tr'>
              <td className='usermgmt_td' style={{ width: '7%' }}>
                {/* 수정 버튼 */}
                <button onClick={() => handleEdit(user._id)}>수정</button>
              </td>
              {/* 본명 */}
              <td className='usermgmt_td' style={{ width: '6%' }}>
                <span>{user.real_name}</span>
              </td>
              {/* 아이디 */}
              <td className='usermgmt_td' style={{ width: '6%' }}>
                <span>{user.id}</span>
              </td>
              {/* 닉네임 */}
              <td className='usermgmt_td' style={{ width: '8%' }}>
                {editingId === user._id ? (
                  <input
                    type='text'
                    value={user.nickname}
                    onChange={(e) => handleFieldChange(user._id, 'nickname', e.target.value)}
                    onBlur={() => handleSave(user._id, 'nickname', user.nickname)}
                  />
                ) : (
                  <span>{user.nickname}</span>
                )}
              </td>
              {/* 이메일 */}
              <td className='usermgmt_td' style={{ width: '12%' }}>
                <span>{user.email}</span>
              </td>
              {/* 비밀번호 */}
              <td className='usermgmt_td' style={{ width: '7%' }}>
                <span>{user.password}</span>
              </td>
              {/* 주소 */}
              <td className='usermgmt_td' style={{ width: '18%' }}>
                <span>{user.address}</span>
              </td>
              {/* 휴대폰 번호 */}
              <td className='usermgmt_td' style={{ width: '8%' }}>
                <span>{user.phone_number}</span>
              </td>
              {/* 유저 상태 */}
              <td className='usermgmt_td' style={{ width: '6%' }}>
                {editingId === user._id ? (
                  <input
                    type='text'
                    value={user.role}
                    onChange={(e) => handleFieldChange(user._id, 'role', e.target.value)}
                    onBlur={() => handleSave(user._id, 'role', user.role)}
                  />
                ) : (
                  <span>{user.role}</span>
                )}
              </td>
              {/* 상점 한마디 */}
              <td className='usermgmt_td' style={{ width: '20%' }}>
                {editingId === user._id ? (
                  <input
                    type='text'
                    value={user.about}
                    onChange={(e) => handleFieldChange(user._id, 'about', e.target.value)}
                    onBlur={() => handleSave(user._id, 'about', user.about)}
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
