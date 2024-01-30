import './user.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/contansts';

function UserManagement() {
  const [userData, setUserData] = useState([]);
  const [editStatus, setEditStatus] = useState({});
  const [editNickname, setEditNickName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editAbout, setEditAbout] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가

  const searchUser = (term) => {
    const filteredUsers = userData.filter(user => {
      // 검색어를 유저의 닉네임과 이메일에서 검색합니다.
      return user.nickname.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase());
    });
    setSearchResults(filteredUsers);
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      // 검색어가 변경될 때마다 검색을 수행합니다.
      searchUser(searchTerm);
    } else {
      // 검색어가 없는 경우에는 전체 유저를 표시합니다.
      setSearchResults(userData);
    }
  }, [searchTerm, userData]);

  const getData = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/user`);
      setUserData(res.data);
      // 모든 행의 수정 상태를 초기화합니다.
      const initialEditStatus = {};
      res.data.forEach(user => {
        initialEditStatus[user._id] = false;
      });
      setEditStatus(initialEditStatus);
    } catch (error) {
      console.error('user 데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const saveUserData = async (id) => {
    try {
      if (editNickname.length < 2 || editNickname.length > 10) {
        alert("닉네임은 2글자에서 10글자 사이어야 합니다");
        return;
      }

      await axios.post(`${API_URL}/admin/useredit/${id}`, { nickname: editNickname, role: editRole, about: editAbout });
      console.log('데이터 수정 성공');
      getData();
      setEditStatus(prevStatus => ({ ...prevStatus, [id]: false }));
    } catch (error) {
      console.error('데이터 수정 실패:', error);
    }
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm('정말로 사용자를 삭제하시겠습니까?');
    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/admin/user/${id}`);
        console.log('데이터 삭제 성공');
        setUserData(userData.filter(user => user._id !== id));
      } catch (error) {
        console.error('데이터 삭제 실패:', error);
      }
    }
  };

  const handleEdit = (id) => {
    setEditStatus(prevStatus => ({ ...prevStatus, [id]: true }));
  };

  return (
    <div>
      <div className='usermgmt_search_section'>
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="usermgmt_table">
        {/* 테이블 헤더 */}
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
        {/* 테이블 본문 */}
        <tbody className='usermgmt_table_tbody'>
          {searchResults.map(user => (
            <tr key={user._id} className='usermgmt_tr'>
              <td>
                {/* 수정 버튼 */}
                {editStatus[user._id] ?
                  <button onClick={() => saveUserData(user._id)}>저장</button>
                  :
                  <button onClick={() => handleEdit(user._id)}>수정</button>
                }
                &nbsp;<button onClick={() => deleteUser(user._id)}>삭제</button>
              </td>
              <td>{user.real_name}</td>
              <td>{user.id}</td>
              <td>
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
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td className='usermgmt_table_td_adress'>{user.address}</td>
              <td>{user.phone_number}</td>
              <td>
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
              <td>
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
