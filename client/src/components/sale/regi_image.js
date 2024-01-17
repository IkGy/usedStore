import React from 'react';

function Regi_image(props) {
  const handleChange = (e) => {
    // 파일 입력을 따로 처리합니다.
    const selectedFile = e.target.files[0];
    props.setImageFile(selectedFile);

    // 이미지 프리뷰 업데이트
    const reader = new FileReader();
    reader.onloadend = () => {
      props.setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      props.setImagePreview(null);
    }
  };

  const handleImageClick = () => {
    // 이미지 클릭 시 파일 선택 인풋창 클릭
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const imageInputRef = React.createRef();
  return (
    <div className="regi_select">
      <div>
        <div className="regi_title">
          상품이미지
          {props.imageFile ? (
            <i
              style={{ color: "green", paddingLeft: "0.5vw" }}
              class="fa-solid fa-check"
            ></i>
          ) : (
            <span style={{ color: "red" }}>*</span>
          )}
        </div>
      </div>
      <div>
        <input
          ref={imageInputRef}
          style={{ display: "none" }}
          name="img"
          type="file"
          accept="image/*"
          multiple="multiple"
          onChange={handleChange}
        />
        {props.imagePreview && (
          <div>
            <img
              className="regi_img"
              src={props.imagePreview}
              alt="이미지 미리보기"
              style={{ maxWidth: "100%", cursor: "pointer" }}
              onClick={handleImageClick}
            />
          </div>
        )}
        {!props.imagePreview && (
          <button className="regi_image" onClick={handleImageClick}>
            <i class="fa-solid fa-camera"></i>
            <div>이미지 등록</div>
          </button>
        )}
      </div>
    </div>
  );
}

export default Regi_image;
