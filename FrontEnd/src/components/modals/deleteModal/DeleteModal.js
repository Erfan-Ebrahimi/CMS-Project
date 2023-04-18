import ReactDOM from 'react-dom';
import './DeleteModal.scss';


const DeleteModal = ({submitAction , cancelAction}) => {
  return ReactDOM.createPortal(
    <div className="modal-parent active">
        <div className="delete-modal">
            <h1>آیا از حذف اطمینان دارید ؟</h1>
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