import '../styles/Modal.css';

const Modal = ({isVisible, onClose, children}) => {

    if (!isVisible) return null;
    return (
        <div className="modal-overlay"> 
            <div className="modal-popup"> 
                <div className="modal-content">
                   {children}
                   <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;