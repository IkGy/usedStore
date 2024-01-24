import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/contansts";


const NaverLoginButton = () => {   
	const navigate = useNavigate();

	const [naverLoginButton, setNaverLoginButton] = useState();	

	const createMarkup = (html) => {
		return {__html: html};
	}
	const MyComponent = (html) => {
		return <div dangerouslySetInnerHTML={createMarkup(html)} />;
	}

  useEffect(()=> {
		axios.get(`${API_URL}/naver/naverlogin`)
		.then(res => {
			console.log(res.data);
			setNaverLoginButton(MyComponent(res.data));
		}).catch(e => {
			console.error(e);
		})

		userAccessToken();
	}, []);

  const userAccessToken = () => { 	 
    // window.location.href는 현재 페이지의 URL을 문자열로 반환하는 속성입니다.
    // includes 메소드를 사용하여 URL에 'code'이라는 문자열이 포함되어 있는지 확인합니다.
    // 만약 포함되어 있다면 getToken() 함수를 호출합니다.
    window.location.href.includes('code') && getToken();
		console.log(window.location.href.includes('code'));
	}

  const getToken = async () => {
		console.log('test');
    //?code=c4HdngWVGK3jEDwp2y&state=NAVER_STATE
    const code = window.location.href.split('=')[1].split('&')[0];
    const state = window.location.href.split('=')[2];
		
    // 이후 로컬 스토리지 또는 state에 저장하여 사용하기
    localStorage.setItem('code', code);
    localStorage.setItem('state', state);

		const callbackRes = await axios.get(`${API_URL}/naver/callback?code=${code}&state=${state}`);
		console.log("callbackRes: ", callbackRes);

		const memberRes = await axios.get(`${API_URL}/naver/member?access_token=${callbackRes.data.access_token}`);
		console.log("memberRes: ", memberRes);
		console.log(memberRes.data.response.email);
		console.log(memberRes.data.response.name);

		const userEmail = memberRes.data.response.email;
		const userName = memberRes.data.response.name;
	
		localStorage.setItem('naver_infoE', userEmail);
		localStorage.setItem('naver_infoN', userName);

			if(memberRes.status === 200){
				navigate('/sign_up'); 
				window.history.pushState({}, document.title, window.location.pathname);
			}
		}     

	return (
		<>
			{naverLoginButton}
		</>
	);
};

export default NaverLoginButton