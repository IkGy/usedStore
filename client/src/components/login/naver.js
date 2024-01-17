// import React, { useEffect } from 'react';

// const NaverLogin = () => {
//   useEffect(() => {

//     const naverLoginScript = document.createElement("script");
//     naverLoginScript.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
//     naverLoginScript.charset = "utf-8";
//     document.body.appendChild(naverLoginScript);

//     const jqueryScript = document.createElement("script");
//     jqueryScript.src = "http://code.jquery.com/jquery-1.11.3.min.js";
//     document.body.appendChild(jqueryScript);

//     naverLoginScript.onload = () => {

//       var naver_id_login = new window.naver_id_login("YOUR_CLIENT_ID", "YOUR_CALLBACK_URL");
//       var state = naver_id_login.getUniqState();


//       naver_id_login.setButton("white", 2, 40);
//       naver_id_login.setDomain("YOUR_SERVICE_URL");
//       naver_id_login.setState(state);
//       naver_id_login.setPopup();
//       naver_id_login.init_naver_id_login();
//     };
//   }, []); 

//   // return (
//   //   <div id="naver_id_login">
//   //     {/* 네이버 로그인 버튼 노출 영역 */}
//   //   </div>
//   // );
// }

// export default NaverLogin;
