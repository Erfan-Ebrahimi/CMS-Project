import { useState , useEffect } from 'react';
import './Offs.scss';

// ---------------MUI & BOOTSTRAP-------------------//
import { TextField , Box } from '@mui/material';
import {Table} from 'react-bootstrap';


// --------------COMPONENTS-------------------//
import ErrorBox from '../errorBox/ErrorBox';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import EditModal from '../modals/editModal/EditModal';


const Offs = () => {

  const [allOffs , setAllOffs] = useState([])
  
  const [offID , setOffID] = useState(null)

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowAcceptModal , setIsShowAcceptModal] = useState(false)
  const [isShowRejectModal , setIsShowRejectModal] = useState(false)

  //states for EditModal inputs => bayad harkodam state joda dashte bashand
  const [offNewPercent , setOffNewPercent] = useState('')
  const [offNewCode , setOffNewCode] = useState('')
  const [offNewDate , setOffNewDate] = useState('')

  // ------------ get all comments -----------//
  useEffect(() => {
    getAllOffs()
  } , [])

  //fun for get AllComments
  const getAllOffs = () => {
    fetch('http://localhost:8000/api/offs/')
    .then(res => res.json())
    .then(data => {
      setAllOffs(data)
      console.log(data);
    })
  }

  //for cancel DeleteModal
  const cancelDeleteModal = () => {
    setIsShowDeleteModal(false)
    console.log('delete modal closed');
  }
  //for submit DeleteModal
  const submitDeleteModal = () => {
    fetch(`http://localhost:8000/api/offs/${offID}` , {
      method:'DELETE',
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      setIsShowDeleteModal(false)
      console.log('offs deleted');
      getAllOffs()
    })
  }

  return (
    <div className='offs'>
      {allOffs.length ? 
        (
          <Table striped bordered hover className='text-center'>
            <thead>
              <tr>
                <th>#</th>
                <th>نام کاربر</th>
                <th>نام محصول</th>
                <th>درصد تخفیف</th>
                <th>کد تخفیف</th>
                <th>تاریخ اعتبار</th>
                <th>تغییرات</th>
              </tr>
            </thead>
            <tbody>
              {allOffs.map((Off) => {
                return(
                  <tr key={Off.id} className={Off.isActive ? ('e1') : ('e2')}>
                    <td>{Off.id}</td>
                    <td>{Off.adminID}</td>
                    <td>{Off.productID}</td>
                    <td>{Off.percent}</td>
                    <td>{Off.code}</td>
                    <td>{Off.date}</td>
                    <td>
                      <button 
                        className='btn btn-danger btn-EDIT'
                        onClick={() => {
                          setIsShowDeleteModal(true)
                          setOffID(Off.id)
                        }}
                      >
                        حذف  
                      </button>
                      {Off.isActive ? 
                        (
                          <button 
                            className='btn btn-danger btn-EDIT'
                            onClick={() => {
                              setIsShowRejectModal(true)
                              setOffID(Off.id)
                            }}
                          >
                            رد
                          </button>
                        )
                        :
                        (
                          <button 
                            className='btn btn-success btn-EDIT'
                            onClick={() => {
                              setIsShowAcceptModal(true)
                              setOffID(Off.id)
                            }}
                          >
                            تایید  
                          </button>
                        )
                      }
                      
                    </td>
                  </tr>
                )})}
            </tbody>
          </Table>
        ) 
        : 
        (<ErrorBox msg={'هیچ کامنتی یافت نشد ! !'}/>)
      }

      
      {/* ----------DELETE MODAL---------- */}
      {isShowDeleteModal && (
        <DeleteModal 
          submitAction={submitDeleteModal} 
          cancelAction={cancelDeleteModal} 
          title='آیا از حذف اطمینان دارید ؟' 
        />
      )}

    </div>
  )
}

export default Offs