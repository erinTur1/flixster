import '../styles/Modal.css';

const Modal = ({isVisible, onClose, children}) => {

    if (!isVisible) return null;
    return (
        <div className="modal-overlay"> 
            <div className="modal-popup"> 
                <div className="modal-content">
                    <button onClick={onClose}>Close</button>
                   {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;