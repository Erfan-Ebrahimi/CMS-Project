import ReactDOM from 'react-dom';
import './DeleteModal.scss';

// az deleteModal ham dar accept estefadeh mikonim ham da cancel ya delete kardan chizi
const DeleteModal = ({submitAction , cancelAction , title}) => {
  return ReactDOM.createPortal(
    <div className="modal-parent active">
        <div className="delete-modal">
            <h1>{title}</h1>
            <div className="dm-btns">
                <button className='dm-btn btn btn-danger' onClick={() => submitAction()}>بله</button>
                <button className='dm-btn btn btn-success' onClick={() => cancelAction()}>خیر</button>
            </div>
        </div>
    </div> , document.getElementById('modals-parent')
  )
}

// class activero zamani midim ke karbar dar productsTable click kard roy btns
// from prop sub & cancel ro migirim -> from productsTable
export default DeleteModal;