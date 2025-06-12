import '../styles/Modal.css';

const Modal = ({isVisible, onClose, children}) => {

    if (isVisible) {
        return (
            <div className="modal-overlay"> 
                <div className="modal-popup"> 
                    <div className="modal-content">
                    {children}
                    <br></br>
                    <button onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    } 
}

export default Modal;