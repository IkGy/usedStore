import React, { useEffect, useState } from "react";
import cancel from "./그림1.png";
import { MdPalette } from "react-icons/md";

function RegiImage(props) {
  let [modal, setmodal] = useState(false);
  let [selectimg, setSelectimg] = useState("");
  const handleChange = (e) => {
    e.preventDefault();

    const selectedFiles = e.target.files;
    const filesArray = Array.from(selectedFiles).slice(0, 3);
    const updatedFiles = [...props.imageFile, ...filesArray];
    const updatedFilesLimited = updatedFiles.slice(0, 3);

    props.setImageFile(updatedFilesLimited);
  };

  const handleImageClick = (index) => {
    const updatedFiles = [...props.imageFile];
    updatedFiles.splice(index, 1);
    props.setImageFile(updatedFiles);
  };

  const openmodal = (img) => {
    if (modal === false) {
      setmodal(true);
      setSelectimg(img);
    } else if (modal === true) {
      setmodal(false);
      setSelectimg("");
    }
  };

  useEffect(() => {
    const body = document.body;
    if (modal) {
      body.style.overflow = "hidden"; // 모달이 열릴 때 스크롤 방지
    } else {
      body.style.overflow = "auto"; // 모달이 닫힐 때 스크롤 복원
    }

    return () => {
      body.style.overflow = "auto"; // 컴포넌트가 언마운트될 때 스크롤 복원
    };
  }, [modal]);
  return (
    <div>
      <div
        className="modalbg"
        style={modal === true ? { display: "flex" } : { display: "none" }}
      >
        {selectimg && (
          <>
            <img
              className="modalimg"
              src={URL.createObjectURL(selectimg)}
              alt="Selected"
            />
            <img
              id="regi_delete-modal"
              src={cancel}
              onClick={() => openmodal()}
            ></img>
          </>
        )}
      </div>
      <div className="regi_select">
        <div>
          <div className="regi_title">
            <div>상품 이미지</div>
            <span>({props.imageFile.length}/3)</span>
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
                    onClick={() => openmodal(file)}
                  />
                  <img
                    id="regi_delete-button"
                    src={cancel}
                    onClick={() => handleImageClick(index)}
                  ></img>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegiImage;
