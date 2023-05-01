import {useEffect , useState} from 'react';
import './Users.scss';

//----------MUI-------------//
import { DataGrid } from '@mui/x-data-grid';


//--------------COMPONENTS-------------//
import ErrorBox from '../errorBox/ErrorBox';
import DeleteModal from '../modals/deleteModal/DeleteModal';

const Users = () => {

  const [allUsers , setAllUsers] = useState([])

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [userID , setUserID] = useState(null)

  //get AllUsers from API
  useEffect(() => {
    getAllUsers()
  } , [])
  
  const getAllUsers = () => {
    
    fetch('http://localhost:8000/api/users/')
    .then(res => res.json())
    .then(data => {
      setAllUsers(data)
      console.log(data);
    })
  }

  const rows = allUsers.map(user => ({ 
    id: user.id, 
    firstname: user.firsname, 
    lastname: user.lastname, 
    username: user.username, 
    password: user.password, 
    phone: user.phone, 
    email: user.email,
    address: user.address,
    buy: user.buy,
    score: user.score,
    city: user.city,
    fullname: `${user.firsname} ${user.lastname}`, 
  }));
  
  const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'fullname', headerName: 'نام و نام خانوادگی', width: 110,
     renderCell: (params) => {
        return(
          <span>{params.row.firstname} {params.row.lastname}</span>
        )
      }
  },
  { field: 'username', headerName: 'نام کاربری', width: 110 },
  { field: 'password', headerName: 'رمز', width: 100 },
  { field: 'phone', headerName: 'شماره تلفن', width: 110 },
  { field: 'email', headerName: 'ایمیل', width: 150 },
  { field: 'score', headerName: 'امتیاز', width: 50 , 
      renderCell: (params) => {
        return(
          <p className={params.row.score > 50 ? ('d1') : ('d2') }>{params.row.score}</p>
        )
      }
  },
  { field: 'action', headerName: 'action', width: 240 , renderCell: (params) => {
    return(
      <>
        <button
          className='btn btn-danger mx-1' 
          onClick={() => {
            setIsShowDeleteModal(true)
            setUserID(params.row.id)
          }}
        >
          حذف
        </button>
        <button 
          className='btn btn-info mx-1' 
          onClick={() => {
            setUserID(params.row.id)
          }}
        >
          ویرایش
        </button>
        <button 
          className='btn btn-warning  mx-1' 
          onClick={() => {
            setUserID(params.row.id)
          }}
        >
          جزییات
        </button>
      
      </>
    )
  }},
];

// for cancel DeleteModal
const cancelDeleteModal = () => {
  setIsShowDeleteModal(false)
}

// for submit DeleteModal
const submitDeleteModal = () => {
  fetch(`http://localhost:8000/api/users/${userID}` , {
     method:'DELETE',
   })
  .then(res => res.json())
  .then((result) => {
    console.log(result)
    setIsShowDeleteModal(false)
    console.log('user deleted');
    getAllUsers()
  })
}

  return (
    <div className='users-table'>
      {
        allUsers.length ? 
          (
            <>
              <h1>لیست کاربران</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                  // width:900,
                  boxShadow: 2,
                  border: 2,
                  padding:2,
                  fontFamily:'lale',
                  borderColor: '#2c2fe9',
                  '& .MuiDataGrid-cell:hover': {
                    color: 'blue',
                  }}}
              />
            </>
          ) 

          :

          (
            <ErrorBox msg='هیچ کاربری یافت نشد ! !'/>
          )
      }

      {/* --------DELETE MODAL-------- */}
      {isShowDeleteModal && (
        <DeleteModal
          cancelAction={cancelDeleteModal}
          submitAction={submitDeleteModal}
          title='آیا از حذف اطمینان دارید ؟'
        />
      )}
    </div>
  )
}

export default Users