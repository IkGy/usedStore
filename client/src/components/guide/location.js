import { Link } from "react-router-dom";
import "./location.css";

function Location() {
  return (

    <div className="ymj_pro_all">
      <div className="ymj_pro_link">
        <div className="ymj_pro_link1">
          <Link to={'/rules'}>번개장터</Link>
        </div>
        <div className="ymj_pro_link2">       
          <Link to={'/pro'}>프로상점</Link>
        </div>
        <div className="ymj_pro_link3">
          <Link to={'/location'}>위치기반</Link>
        </div>
      </div>

      <div>
        <h2>번개장터 위치기반서비스 이용약관</h2>
        <div>
          <h3>프로미스나인</h3>
          <div>
            <p>뜻</p>
            <span>그룹 이름은 from + idol + school = fromis (아이돌학교에서 왔다)의 줄임말이자 '팬들에게 최고의 걸그룹이 되겠다' <br />
            는 약속[14]을 담은 것이다. 뒤에 붙은 9는 그룹의 멤버가 9명임을 의미한다.</span>
          </div>
        </div>

        <div>
          <p> 정규 1집 : #me now</p>
          <div>
            <span>네모 칸 속 화려한 내 모습 And I know 나를 향해 쏟아지는 Heart 네가 몰랐던 내 안의 내 모습 When I say <br />
            넌 어떤 표정을 지을까 (너무 반짝이는 건) Yeah that's me Yeah that's me (똑바로 볼 수 없대) As you know<br />
            As you know 조명이 꺼지는 지금 Right now 꾸밈없이 Unlock 누가 뭐라 해도 Do 느껴봐 Me now 숨김없이 이대로 Like it<br />
            새로워 Me now 이게 나야 이런 난 어때 그래 난 안 뻔해 Cliché 던질래 어떤 모습이든 I don't care 때론 Chic 때론 Cool 무심해 다정해<br />
            정답 따윈 없어 I don't care (가장 반짝이는 건) Yeah that's you Yeah that's you (눈으로 볼 수 없대) Yes I know Yes I know<br />
            까맣게 칠해진 맘을 Light up 내 진심을 Unlock 너도 원할 거야 Go 느껴봐 Me now 숨김없이 이대로 Like it 새로워 Me now<br />
            이게 나야 이런 난 어때 (있는 그대로 볼래) That's my world That's my world (나를 다 보여 줄래) That's my world<br />
            That's my world 손끝에 닿았던 선을 넘어 두려움은 No more 거짓 없는 날 봐 True Just look around 두 눈을 떠<br />
            내 모든 것 자신 있어 Cross the line 똑바로 봐 너와 닮은 내가 있어 살짝 넘어 Now 낯선 느낌 그래도 Like it<br />
            너도 알잖아 전부 나야 이대로 좋아 (있는 그대로 볼래) That's my world That's my world (나를 다 보여 줄래)<br />
            That's my world That's my world 펼쳐진 세상에 손을 뻗어 고민 따윈 No more 지금 나를 봐봐 You</span>
          </div>
        </div>
      </div>


    </div>
    );
  }
  
  export default Location;