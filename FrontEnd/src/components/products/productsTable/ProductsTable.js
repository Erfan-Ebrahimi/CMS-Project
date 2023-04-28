import { useState } from 'react';
import './ProductsTable.scss';

// -------------COMPONENTS-------------//
import ErrorBox from '../../errorBox/ErrorBox';
import "react-toastify/dist/ReactToastify.css";

// ------------BOOTSTRAP--------------//
import { Table , Form } from 'react-bootstrap';

// -----------------MODALS------------//
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import DetailsModal from '../../modals/detailsModal/DetailsModal';
import EditModal from '../../modals/editModal/EditModal';

// -------------ICONS----------------//
import {GrCircleInformation} from 'react-icons/gr'
import {AiOutlineStar} from 'react-icons/ai'
import {BsCurrencyDollar} from 'react-icons/bs'
import {MdOutlineColorLens} from 'react-icons/md'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'
import {TbAlphabetLatin} from 'react-icons/tb'
import {ImListNumbered} from 'react-icons/im'
import {BiImageAdd} from 'react-icons/bi'
import {RiNumbersLine} from 'react-icons/ri'




const ProductsTable = ({allProducts , getAllProducts , notify}) => {

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)
  const [isShowEditModal , setIsShowEditModal] = useState(false)

  //state for productID
  const [productID , setProductID] = useState(null)
  //state for har products (for DetailsModal & ...)
  const [mainProductInfos , setMainProductInfos] = useState({})

  //states for EditModal inputs => bayad harkodam state joda dashte bashand
  const [productNewTitle , setProductNewTitle] = useState('')
  const [productNewPrice , setProductNewPrice] = useState('')
  const [productNewCount , setProductNewCount] = useState('')
  const [productNewImg , setProductNewImg] = useState('')
  const [productNewPopularity , setProductNewPopularity] = useState('')
  const [productNewSale , setProductNewSale] = useState('')
  const [productNewColors , setProductNewColors] = useState('')
 
  
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

  // for closeBtn EditModal
  const closeEditModal = () => {
    setIsShowEditModal(false)
    console.log('EditModal closed');
  }

  // for submit EditModal
  const updateProductInfo = (event) => {
    event.preventDefault();

    const newData = {
      title :productNewTitle,
      price :productNewPrice,
      count :productNewCount,
      img :productNewImg,
      popularity :productNewPopularity,
      sale :productNewSale,
      colors :productNewColors
    }

    fetch(`http://localhost:8000/api/products/${productID}`,{
      method:'PUT',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
    })
    .then((res) => res.json())
    .then((result) => {
        console.log(result)
        setIsShowEditModal(false)
        getAllProducts()
        notify('success' , '++ محصول با موفقیت ویرایش شد ++')
      })
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
                      <td className="align-middle">{Number(product.price).toLocaleString()} تومان</td>
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
                          <button 
                            className='pt-btn btn btn-success' 
                            onClick={() => {
                              setProductID(product.id)
                              setIsShowEditModal(true)
                              setProductNewTitle(product.title)
                              setProductNewPrice(Number(product.price).toLocaleString())
                              setProductNewCount(product.count)
                              setProductNewImg(product.img)
                              setProductNewPopularity(product.popularity)
                              setProductNewSale(Number(product.sale).toLocaleString())
                              setProductNewColors(product.colors)
                            }}
                          >
                            <AiOutlineEdit/>
                          </button>
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
                        <td>{Number(mainProductInfos.sale).toLocaleString()}</td>
                        <td>{mainProductInfos.count} عدد</td>
                        <td>{mainProductInfos.colors}</td>
                        
                    </tr>
                </tbody>
            </Table>
        </DetailsModal>
      }
      { isShowEditModal && 
          <EditModal hideModal={closeEditModal} submitInfos={updateProductInfo}>
            <div className='edit-form'>

              <Form.Group className="mb-3 edit-form-group">
                <TbAlphabetLatin className='edit-form-icon'/>
                <Form.Control 
                  type="text" 
                  value={productNewTitle}
                  placeholder="عنوان جدید را وارد کنید" 
                  onChange={(event) => setProductNewTitle(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <BsCurrencyDollar className='edit-form-icon'/>
                <Form.Control 
                  type="text" 
                  value={productNewPrice}
                  placeholder="قیمت حدید را وارد کنید" 
                  onChange={(event) => setProductNewPrice(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <ImListNumbered className='edit-form-icon'/>
                <Form.Control 
                  type="text" 
                  value={productNewCount}
                  placeholder="موجودی جدید را وارد کنید"
                  onChange={(event) => setProductNewCount(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <BiImageAdd className='edit-form-icon'/>
                <Form.Control 
                  type="text" 
                  value={productNewImg}
                  placeholder="آدرس کاور جدید را وارد کنید"
                  onChange={(event) => setProductNewImg(event.target.value)} 
                />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <AiOutlineStar className='edit-form-icon'/>
                <Form.Control 
                  type="text" 
                  value={productNewPopularity + '%'}
                  placeholder="میزان محبوبیت جدید را وارد کنید"
                  onChange={(event) => setProductNewPopularity(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <RiNumbersLine className='edit-form-icon'/>
                <Form.Control 
                  type="text" 
                  value={productNewSale}
                  placeholder="میزان فروش جدید را وارد کنید"
                  onChange={(event) => setProductNewSale(event.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3 edit-form-group">
                <MdOutlineColorLens className='edit-form-icon'/>
                <Form.Control 
                  type="text" 
                  value={productNewColors}
                  placeholder="رنگ جدید را وارد کنید"
                  onChange={(event) => setProductNewColors(event.target.value)}
                />
              </Form.Group>

            </div>
          </EditModal>  
      }
    </>
  )
}

export default ProductsTable;