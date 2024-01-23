import './modal.css';

function Modal({ show, onClose, image }) {
    if (!show) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <img src={image} alt="Modal Content" />
                <button className="close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default Modal;
