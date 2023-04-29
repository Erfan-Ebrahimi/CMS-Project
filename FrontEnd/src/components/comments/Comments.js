import { useState , useEffect } from 'react';
import './Comments.scss';

// --------------COMPONENTS-------------------//
import {Table} from 'react-bootstrap';
import ErrorBox from '../errorBox/ErrorBox';
import DetailsModal from '../modals/detailsModal/DetailsModal';
import DeleteModal from '../modals/deleteModal/DeleteModal';


const Comments = () => {

  const [allComments , setAllComments] = useState([])
  
  const [commentID , setCommentID] = useState(null)
  const [mainCommentBody , setMainCommentBody] = useState('')

  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)


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
                  <tr key={comment.id}>
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
                        مشاهده متن
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
                      >
                        ویرایش  
                      </button>
                      <button 
                        className='btn btn-info btn-EDIT'
                      >
                        پاسخ  
                      </button>
                      <button 
                        className='btn btn-success btn-EDIT'
                      >
                        تایید  
                      </button>
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
        <DeleteModal submitAction={submitDeleteModal} cancelAction={cancelDeleteModal} />
      )}
    </div>
  );
}

export default Comments;