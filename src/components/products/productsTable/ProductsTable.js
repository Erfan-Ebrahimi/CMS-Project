import { useState } from 'react';
import './ProductsTable.scss';
import { Table } from 'react-bootstrap';
import img1 from '../../../images/prof1.jfif';

// -----------COMPONENTS---------//
import DeleteModal from '../../modals/deleteModal/DeleteModal';

// -------------ICONS------------//
import {GrCircleInformation} from 'react-icons/gr'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'

const ProductsTable = () => {

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)

  const deleteModalSubmitAction = () => {
    console.log('red')
    setIsShowDeleteModal(false)
  }

  const deleteModalCancelAction = () => {
    console.log('blue')
    setIsShowDeleteModal(false)
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
                <button className='pt-btn btn btn-warning'><GrCircleInformation/></button>
                <button className='pt-btn btn btn-success' onClick={() => setIsShowDeleteModal(true)}><AiOutlineEdit/></button>
                <button className='pt-btn btn btn-danger'><RiDeleteBin6Line/></button>
            </td>
          </tr>
        </tbody>
      </Table>

      { isShowDeleteModal && <DeleteModal submitAction={deleteModalSubmitAction} cancelAction={deleteModalCancelAction} />}
    </>
  )
}

export default ProductsTable