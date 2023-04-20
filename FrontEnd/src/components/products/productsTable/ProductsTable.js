import { useState , useEffect } from 'react';
import './ProductsTable.scss';

//-------------COMPONENTS-------------//
import ErrorBox from '../../errorBox/ErrorBox';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
import DetailsModal from '../../modals/detailsModal/DetailsModal';
import EditModal from '../../modals/editModal/EditModal';




const ProductsTable = () => {

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)
  const [isShowEditModal , setIsShowEditModal] = useState(false)
  //state for all products
  const [allProducts , setAllProducts] = useState([])
  //state for productID
  const [productID , setProductID] = useState(null)
  //state for har products (for DetailsModal & ...)
  const [mainProductInfos , setMainProductInfos] = useState({})

  //-------------NOTIFAY-----------------//
  const notify = (type , msg) => {
    if(type === 'success'){
      toast.success(msg)
    }else if(type === 'error'){
      toast.error(msg)
    }else{
      toast.warning(msg)
    }
  }
  //dar kol talash mikonim ta hade momken kamtar darkhast befrestim samt server masalan for EditModal az hamin state allProducts estefadeh mikonim
  useEffect(() => {
    getAllProducts()
  } , [])
  
  // -------GET data from API----------------//
  const getAllProducts = () => {
    fetch('http://localhost:8000/api/products/')
    .then((res) => res.json())
    .then((data) => setAllProducts(data))
  }
  
  // for close DeleteModal $ submit
  const deleteModalSubmitAction = () => {

    fetch(`http://localhost:8000/api/products/${productID}` , {
      method:'DELETE'
    })
      .then(res => res.json())
      .then(result => {
        setIsShowDeleteModal(false)
        getAllProducts() // show new data(products)
        notify('success' , '++ محصول با موفقیت حذف شد ++')
      })
  }
  // for close DeleteModal
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
          
      {allProducts.length ? 
        (
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

              {allProducts.map((product) => {
                return(
                    <tr className='pt-body' key={product.id}>
                      <td className="align-middle">
                          <img className='pt-img' src={product.img} alt="img" />
                      </td>
                      <td className="align-middle">{product.title}</td>
                      <td className="align-middle">{product.price} تومان</td>
                      <td className="align-middle">{product.count}</td>
                      <td className="align-middle">
                          <button 
                            className='pt-btn btn btn-warning' 
                            onClick={() => {
                              setIsShowDetailsModal(true)
                              setMainProductInfos(product)//khode product ro set mikonim
                            }}
                          >
                            <GrCircleInformation/>
                          </button>
                          <button className='pt-btn btn btn-success' onClick={() => setIsShowEditModal(true)}><AiOutlineEdit/></button>
                          <button
                           className='pt-btn btn btn-danger' 
                           onClick={() => {
                            setIsShowDeleteModal(true)
                            setProductID(product.id)
                           }}
                          >
                            <RiDeleteBin6Line/>
                          </button>
                      </td>
                    </tr>
                )
              })}
            </tbody>
          </Table>
          
        )
        :
        (<ErrorBox msg='هیچ محصولی یافت نشد !!'/>)
      }

      { isShowDeleteModal && <DeleteModal submitAction={deleteModalSubmitAction} cancelAction={deleteModalCancelAction} />}
      { isShowDetailsModal && 
        <DetailsModal>
          <button type="button" className="btn-close" aria-label="Close" onClick={closeDetailsModal}></button>
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th>نام محصول</th>
                        <th>محبوبیت</th>
                        <th>فروش</th>
                        <th>موجودی</th>
                        <th>تعداد رنگ بندی</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{mainProductInfos.title}</td>
                        <td>% {mainProductInfos.popularity}</td>
                        <td>{mainProductInfos.sale}</td>
                        <td>{mainProductInfos.count} عدد</td>
                        <td>{mainProductInfos.colors}</td>
                        
                    </tr>
                </tbody>
            </Table>
        </DetailsModal>
      }
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
      {/* ---------TOSTIFY-------------- */}
      <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody"></ToastContainer>
    </>
  )
}

export default ProductsTable;