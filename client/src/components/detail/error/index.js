import { Link } from "react-router-dom";

function Detail_Error() {
    return (
        <>
            <div>
                <h2>존재하지 않는 상품입니다.</h2>
                <br />
                <Link to='/'>홈으로가기</Link>
            </div>
        </>
    )
}

export default Detail_Error;