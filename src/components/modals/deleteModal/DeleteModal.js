import ReactDOM from 'react-dom';
import './DeleteModal.scss';


const DeleteModal = () => {
  return ReactDOM.createPortal(
    <div className="modal-parent active">
        <div className="delete-modal">
            <h1>آیا از حذف اطمینان دارید ؟</h1>
            <div className="dm-btns">
                <button className='dm-btn btn btn-danger'>بله</button>
                <button className='dm-btn btn btn-success'>خیر</button>
            </div>
        </div>
    </div> , document.getElementById('modals-parent')
  )
}

// class activero zamani midim ke karbar vared shod
export default DeleteModal;