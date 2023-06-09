import { useState , useEffect } from 'react';
import './Comments.scss';
// ---------------BOOTSTRAP-------------------//
import { Form } from 'react-bootstrap';

// --------------COMPONENTS-------------------//
import {Table} from 'react-bootstrap';
import ErrorBox from '../errorBox/ErrorBox';
import DetailsModal from '../modals/detailsModal/DetailsModal';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import EditModal from '../modals/editModal/EditModal';

//-------------------ICONS--------------------//
import {BsFillEyeFill} from 'react-icons/bs'


const Comments = () => {

  const [allComments , setAllComments] = useState([])
  
  const [commentID , setCommentID] = useState(null)
  const [mainCommentBody , setMainCommentBody] = useState('')

  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowEditModal , setIsShowEditModal] = useState(false)
  const [isShowAcceptModal , setIsShowAcceptModal] = useState(false)
  const [isShowRejectModal , setIsShowRejectModal] = useState(false)



  // ------------ get all comments -----------//
  useEffect(() => {
    getAllComments()
  } , [])

  //fun for get AllComments
  const getAllComments = () => {
    fetch('http://localhost:8000/api/comments/')
    .then(res => res.json())
    .then(data => setAllComments(data))
  }
  //for cancel DeleteModal
  const cancelDeleteModal = () => {
    setIsShowDeleteModal(false)
    console.log('delete modal closed');
  }
  //for submit DeleteModal
  const submitDeleteModal = () => {
    fetch(`http://localhost:8000/api/comments/${commentID}` , {
      method:'DELETE',
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      setIsShowDeleteModal(false)
      console.log('comment deleted');
      getAllComments()
    })
  }

  //for close EditModal
  const closeEditModal = (e) => {
    e.preventDefault();
    setIsShowEditModal(false);
  }
  //for submit EditModal
  const submitEditModal = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/comments/${commentID}` , {
      method:'PUT',
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({
        body:mainCommentBody //value textarea
      })
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result , 'comment updated');
      setIsShowEditModal(false);
      getAllComments();
    })    
  }

  //for submit AcceptModal
  const submitAcceptModal = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}` , {
      method:'POST',
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      setIsShowAcceptModal(false)
      console.log('comment ACCEPTED');
      getAllComments()
    })

  }
  //for cancel AcceptModal
  const cancelAcceptModal = () => {
    setIsShowAcceptModal(false)
    
  }

  //for submit RejecttModal
  const submitRejectModal = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentID}` , {
      method:'POST',
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      setIsShowRejectModal(false)
      console.log('comment rejected');
      getAllComments()
    })

  }
   //for cancel RejectModal
   const cancelRejectModal = () => {
    setIsShowRejectModal(false)
    
  }


  return (

    <div className='comments-table'>
      {allComments.length ? 
        (
          <Table striped bordered hover className='text-center'>
            <thead>
              <tr>
                <th>#</th>
                <th>نام کاربر</th>
                <th>نام محصول</th>
                <th>کامنت</th>
                <th>تاریخ</th>
                <th>ساعت</th>
                <th>تغییزات</th>
              </tr>
            </thead>
            <tbody>
              {allComments.map((comment) => {
                return(
                  <tr key={comment.id} className={comment.isAccept ? ('e1') : ('e2')}>
                    <td>{comment.id}</td>
                    <td>{comment.userID}</td>
                    <td>{comment.productID}</td>
                    <td>
                      <button 
                        className='btn btn-info'
                        onClick={() => {
                          setMainCommentBody(comment.body)
                          setIsShowDetailsModal(true)
                        }}
                      >
                        <BsFillEyeFill/>
                      </button>
                    </td>
                    <td>{comment.date}</td>
                    <td>{comment.hour}</td>
                    <td>
                      <button 
                        className='btn btn-danger btn-EDIT'
                        onClick={() => {
                          setIsShowDeleteModal(true)
                          setCommentID(comment.id)
                        }}
                      >
                        حذف  
                      </button>
                      <button 
                        className='btn btn-primary btn-EDIT'
                        onClick={() => {
                          setIsShowEditModal(true)
                          setMainCommentBody(comment.body)
                          setCommentID(comment.id)
                        }}
                      >
                        ویرایش  
                      </button>
                      <button 
                        className='btn btn-info btn-EDIT'
                      >
                        پاسخ  
                      </button>
                      {comment.isAccept ? 
                        (
                          <button 
                            className='btn btn-danger btn-EDIT'
                            onClick={() => {
                              setIsShowRejectModal(true)
                              setCommentID(comment.id)
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
                              setCommentID(comment.id)
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

      {/* ----------DETAILS MODAL---------- */}
      {isShowDetailsModal && (
        <DetailsModal>
          <div className='details-comments-modal'>
            <p>{mainCommentBody}</p>
            <button 
              className='btn btn-danger closeBTN '
              onClick={() => setIsShowDetailsModal(false)}
            >
              بستن  
            </button>
          </div>
        </DetailsModal>
      )}

      {/* ----------DELETE MODAL---------- */}
      {isShowDeleteModal && (
        <DeleteModal 
          submitAction={submitDeleteModal} 
          cancelAction={cancelDeleteModal} 
          title='آیا از حذف اطمینان دارید ؟' 
        />
      )}

      {/* ----------EDIT MODAL---------- */}
      {isShowEditModal && (
        <EditModal hideModal={closeEditModal} submitInfos={submitEditModal}>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              value={mainCommentBody}
              onChange={(event) => setMainCommentBody(event.target.value)}
            />
        </EditModal>
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
  );
}

export default Comments;