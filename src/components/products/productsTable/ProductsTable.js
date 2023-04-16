import { useState } from 'react';
import './ProductsTable.scss';
// ------------BOOTSTRAP--------------//
import { Table } from 'react-bootstrap';

// -----------MODALS---------//
import DeleteModal from '../../modals/deleteModal/DeleteModal';

// -------------ICONS------------//
import {GrCircleInformation} from 'react-icons/gr'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'
import img1 from '../../../images/prof1.jfif';
import DetailsModal from '../../modals/detailsModal/DetailsModal';

const ProductsTable = () => {

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)

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
                <button className='pt-btn btn btn-success'><AiOutlineEdit/></button>
                <button className='pt-btn btn btn-danger' onClick={() => setIsShowDeleteModal(true)}><RiDeleteBin6Line/></button>
            </td>
          </tr>
        </tbody>
      </Table>

      { isShowDeleteModal && <DeleteModal submitAction={deleteModalSubmitAction} cancelAction={deleteModalCancelAction} />}
      { isShowDetailsModal && <DetailsModal hideModal={closeDetailsModal}/>}
    </>
  )
}

export default ProductsTable