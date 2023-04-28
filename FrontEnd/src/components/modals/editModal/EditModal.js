import { useEffect } from 'react';
import './EditModal.scss';
import { Form } from 'react-bootstrap';

//hideModal az ProductsTable miad
const EditModal = ({ children , hideModal , submitInfos }) => {

    useEffect(() => {
        const closed = (event) => {
            // 27 => ESCAPE in keyboard
            if (event.keyCode === 27){
                hideModal()
            }
        }
        
        window.addEventListener('keydown' , closed)

        //baray jelogiri az tadakhol event anra bad az unMouting remove mikonim
        //baray faze unMouting dar useEffect bayad return anjam dahim

        return () => window.removeEventListener('keydown' , closed)
    })

  return (
    <div className='modal-parent active'>
        <Form className='edit-modal' method='#' onSubmit={submitInfos}>
            <button className='btn-close' onClick={hideModal}></button>
            <h1>اطلاعات جدید را وارد کنید</h1>
            {/* CHILDREN */}
            {children}

            <button className='btn edit-form-submit-btn' type='submit'>ثبت اطلاعات</button>
        </Form>
    </div>
  )
}

export default EditModal