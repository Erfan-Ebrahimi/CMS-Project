import { useState , useEffect } from 'react';
import './Offs.scss';

// ---------------MUI & BOOTSTRAP-------------------//
import {Table} from 'react-bootstrap';


// --------------COMPONENTS-------------------//
import ErrorBox from '../errorBox/ErrorBox';
import DeleteModal from '../modals/deleteModal/DeleteModal';


const Offs = () => {

  const [allOffs , setAllOffs] = useState([])
  
  const [offID , setOffID] = useState(null)
  const [isActive , setIsActive] = useState(null)


  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowAcceptModal , setIsShowAcceptModal] = useState(false)
  const [isShowRejectModal , setIsShowRejectModal] = useState(false)


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

  //for submit AcceptModal
  const submitAcceptModal = () => {
    fetch(`http://localhost:8000/api/offs/active-off/${offID}` , {
      method:'PUT',
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({isActive})
    
    })
    .then(res => {
      res.json()
      console.log(res)
    })
    .then((result) => {
      console.log(result)
      console.log(isActive);

      setIsShowAcceptModal(false)
      console.log('off ACCEPTED');
      getAllOffs()
    })

  }
  //for cancel AcceptModal
  const cancelAcceptModal = () => {
    setIsShowAcceptModal(false)
    
  }

  //for submit RejecttModal
  const submitRejectModal = () => {
    fetch(`http://localhost:8000/api/offs/active-off/${offID}/${isActive}` , {
      method:'PUT',
      headers:{
        'Content-Type' : 'application/json'
      },
    
    })
    .then(res => {
      res.json()
      console.log(res)
    })
    .then((result) => {
      console.log(result)
      console.log(isActive);
      setIsShowRejectModal(false)
      console.log('comment rejected');
      getAllOffs()
    })
    .catch(err => console.log(err))

  }
   //for cancel RejectModal
   const cancelRejectModal = () => {
    setIsShowRejectModal(false)
    
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
              {allOffs.map((off) => {
                return(
                  <tr key={off.id} className={off.isActive ? ('e1') : ('e2')}>
                    <td>{off.id}</td>
                    <td>{off.adminID}</td>
                    <td>{off.productID}</td>
                    <td>{off.percent}</td>
                    <td>{off.code}</td>
                    <td>{off.date}</td>
                    <td>
                      <button 
                        className='btn btn-danger btn-EDIT'
                        onClick={() => {
                          setIsShowDeleteModal(true)
                          setOffID(off.id)
                        }}
                      >
                        حذف  
                      </button>
                      {off.isActive ? 
                        (
                          <button 
                            className='btn btn-danger btn-EDIT'
                            onClick={() => {
                              setIsShowRejectModal(true)
                              setOffID(off.id)
                              setIsActive(off.isActive)

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
                              setOffID(off.id)
                              setIsActive(off.isActive)
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

      {/* ----------ACCEPT MODAL---------- */}
      {/*for accepModal az DeleteModal estefadeh mikonim */}
      {isShowAcceptModal && (
        <DeleteModal
          cancelAction={cancelAcceptModal}
          submitAction={submitAcceptModal}
          title='آیا از تایید اطمینان دارید ؟'
        />
      )}
      {/* ----------REJECT MODAL---------- */}
      {/*for RejectModal az DeleteModal estefadeh mikonim */}
      {isShowRejectModal && (
        <DeleteModal
          cancelAction={cancelRejectModal}
          submitAction={submitRejectModal}
          title='آیا از رد اطمینان دارید ؟'
        />
      )}

    </div>
  )
}

export default Offs