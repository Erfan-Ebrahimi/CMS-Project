// import ReactDOM from 'react-dom';
import './EditModal.scss';


const EditModal = () => {
  return (
    <div className='modal-parent active'>
        <form className='edit-modal'>
            <h1>اطلاعات جدید را وارد کنید</h1>


            <button className='btn edit-form-submit-btn'>ثبت اطلاعات</button>
        </form>
    </div>
  )
}

export default EditModal