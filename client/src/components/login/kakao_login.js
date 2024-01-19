// import React, { useEffect } from 'react';

// function KakaoLogin({ onKakaoLogin }) {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.Kakao.init('90b9cec28ae877d95b8c171eabad92f5');
//       console.log('Kakao 계정으로 성공적으로 로그인 하였습니다');
//     };

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   function handleKakaoLogin() {
//     window.Kakao.Auth.login({
//       scope: 'profile_nickname',
//       success: function (authObj) {
//         console.log(authObj);
//         window.Kakao.API.request({
//           url: '/v2/user/me',
//           success: (res) => {
//             const kakao_account = res.kakao_account;
//             console.log(kakao_account);
//             localStorage.setItem('kakao_account', JSON.stringify(kakao_account.profile));
//             onKakaoLogin(); // 부모 컴포넌트에서 전달받은 콜백 호출
//           },
//         });
//       },
//     });
//   }

//   return (
//     <button
//       onClick={handleKakaoLogin}
//       style={{
//         backgroundColor: 'yellow',
//         color: 'black',
//         width: '100%',
//         marginBottom: '2px',
//       }}
//     >
//       카카오톡 계정으로 로그인
//     </button>
//   );
// }

// export default KakaoLogin;
