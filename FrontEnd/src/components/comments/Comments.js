import { useState , useEffect } from 'react';
import './Comments.scss';

// --------------COMPONENTS-------------------//
import {Table} from 'react-bootstrap';
import ErrorBox from '../errorBox/ErrorBox';


const Comments = () => {

  const [allComments , setAllComments] = useState([])

  // ------------ get all comments -----------//
  useEffect(() => {
    fetch('http://localhost:8000/api/comments/')
    .then(res => res.json())
    .then(data => setAllComments(data))
  } , [])

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
                      <button className='btn btn-info'>مشاهده</button>
                    </td>
                    <td>{comment.date}</td>
                    <td>{comment.hour}</td>
                    <td>
                      <button className='btn btn-danger'>حذف</button>
                      <button className='btn btn-primary'>ویرایش</button>
                      <button className='btn btn-info'>پاسخ</button>
                      <button className='btn btn-success'>تایید</button>
                    </td>
                  </tr>
                )})}
            </tbody>
          </Table>
        ) 
        : 
        (<ErrorBox msg={'هیچ کامنتی یافت نشد ! !'}/>)
      }
    </div>
  );
}

export default Comments;