import React from "react";

function RegiImage(props) {
  const handleChange = (e) => {
    const selectedFiles = e.target.files;

    // 최대 3개까지만 선택하도록 제한
    const filesArray = Array.from(selectedFiles).slice(0, 3);

    // 이전에 선택한 이미지와 새로 선택한 이미지를 합침
    const updatedFiles = [...props.imageFile, ...filesArray];

    // 최대 3개까지 유지하도록 다시 제한
    const updatedFilesLimited = updatedFiles.slice(0, 3);

    props.setImageFile(updatedFilesLimited); // 이미지 파일들을 배열로 설정
  };

  const handleImageClick = (index) => {
    // 이미지 클릭 시 해당 인덱스의 이미지를 삭제
    const updatedFiles = [...props.imageFile];
    updatedFiles.splice(index, 1);
    props.setImageFile(updatedFiles);
  };

  return (
    <div className="regi_select">
      <div>
        <div className="regi_title">
          상품 이미지 <span>({props.imageFile.length}/3)</span>
          {props.imageFile.length !== 0 ? (
            <i
              style={{ color: "green", paddingLeft: "0.5vw" }}
              className="fa-solid fa-check"
            ></i>
          ) : (
            <span style={{ color: "red" }}>*</span>
          )}
        </div>
      </div>
      <div className="regi_imageform">
        {props.imageFile.length < 3 && (
          <>
            <input
              name="img"
              type="file"
              accept="image/*"
              multiple="multiple"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <button
              className="regi_image"
              onClick={() => document.getElementsByName("img")[0].click()}
            >
              <i className="fa-solid fa-camera"></i>
              <div>이미지 등록</div>
            </button>
          </>
        )}

        {props.imageFile && (
          <>
            {props.imageFile.map((file, index) => (
              <div key={index} className="regi_image-container">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview-${index}`}
                  className="preview-image"
                  onClick={() => handleImageClick(index)}
                />
                <button
                  className="delete-button"
                  onClick={() => handleImageClick(index)}
                >
                  X
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default RegiImage;