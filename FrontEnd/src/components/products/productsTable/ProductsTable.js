import { useState } from 'react';
import './ProductsTable.scss';
// ------------BOOTSTRAP--------------//
import { Table , Form } from 'react-bootstrap';

// -----------MODALS---------//
import DeleteModal from '../../modals/deleteModal/DeleteModal';

// -------------ICONS------------//
import {GrCircleInformation} from 'react-icons/gr'
import {AiOutlineStar} from 'react-icons/ai'
import {BsCurrencyDollar} from 'react-icons/bs'
import {MdOutlineColorLens} from 'react-icons/md'

import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'
import img1 from '../../../images/prof1.jfif';
import DetailsModal from '../../modals/detailsModal/DetailsModal';
import EditModal from '../../modals/editModal/EditModal';

const ProductsTable = () => {

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)
  const [isShowEditModal , setIsShowEditModal] = useState(false)

  const deleteModalSubmitAction = () => {
    console.log('red')
    setIsShowDeleteModal(false)
  }

  const deleteModalCancelAction = () => {
    console.log('blue')
    setIsShowDeleteModal(false)
  }

  // for close DetailsModal
  const closeDetailsModal = () => {
    setIsShowDetailsModal(false)
    console.log('DetailsModal closed');
  }

  // for close EditModal
  const closeEditModal = () => {
    setIsShowEditModal(false)
    console.log('EditModal closed');
  }

  // for close EditModal
  const updateProductInfo = (event) => {
    event.preventDefault();
    console.log('update info');
  } 

  return (
    <>
      <Table bordered hover className='products-table'>
        <thead>
          <tr className='pt-heading'>
              <th>عکس</th>
              <th>نام</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>تغییرات</th>
          </tr>
        </thead>
        <tbody >
          <tr className='pt-body'>
            <td className="align-middle">
                <img className='pt-img' src={img1} alt="img" />
            </td>
            <td className="align-middle">روغن</td>
            <td className="align-middle">92000 تومان</td>
            <td className="align-middle">85</td>
            <td className="align-middle">
                <button className='pt-btn btn btn-warning' onClick={() => setIsShowDetailsModal(true)}><GrCircleInformation/></button>
                <button className='pt-btn btn btn-success' onClick={() => setIsShowEditModal(true)}><AiOutlineEdit/></button>
                <button className='pt-btn btn btn-danger' onClick={() => setIsShowDeleteModal(true)}><RiDeleteBin6Line/></button>
            </td>
          </tr>
        </tbody>
      </Table>

      { isShowDeleteModal && <DeleteModal submitAction={deleteModalSubmitAction} cancelAction={deleteModalCancelAction} />}
      { isShowDetailsModal && <DetailsModal hideModal={closeDetailsModal}/>}
      { isShowEditModal && 
          <EditModal hideModal={closeEditModal} submitInfos={updateProductInfo}>
            <Form className='edit-form'>

              <Form.Group className="mb-3 edit-form-group">
                <AiOutlineEdit className='edit-form-icon'/>
                <Form.Control type="text" placeholder="عنوان جدید را وارد کنید" />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <BsCurrencyDollar className='edit-form-icon'/>
                <Form.Control type="text" placeholder="قیمت حدید را وارد کنید" />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <AiOutlineStar className='edit-form-icon'/>
                <Form.Control type="text" placeholder="موجودی جدید را وارد کنید" />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <MdOutlineColorLens className='edit-form-icon'/>
                <Form.Control type="text" placeholder="رنگ جدید را وارد کنید" />
              </Form.Group>

              
            
            </Form>
          </EditModal>  
      }
    </>
  )
}

export default ProductsTable