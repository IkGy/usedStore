function Test2() {


    return (
        <>
            <form className="form-box" action="/product/new" method="POST" encType="multipart/form-data">
                {/* <h1>상품등록 테스트 페이지</h1>
                <input name="title" placeholder="판매글 제목" /><br />
                <input name="comment" placeholder="판매글 내용" /><br /> */}
                <input type="file" name="image" accept="image/*" placeholder="이미지" /><br />
                <button type="submit">전송</button>
            </form>
        </>
    )
}

export default Test2;