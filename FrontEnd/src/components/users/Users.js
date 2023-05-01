import {useEffect , useState} from 'react';
import './Users.scss';

//----------MUI-------------//
import { DataGrid } from '@mui/x-data-grid';
import { Table , Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


//--------------COMPONENTS-------------//
import ErrorBox from '../errorBox/ErrorBox';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import DetailsModal from '../modals/detailsModal/DetailsModal';

const Users = () => {

  const [allUsers , setAllUsers] = useState([])

  const [mainUser , setMainUser] = useState({})

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)
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
  { field: 'fullname', headerName: 'نام و نام خانوادگی', width: 140,
     renderCell: (params) => {
        return(
          <span>{params.row.firstname} {params.row.lastname}</span>
        )
      }
  },
  { field: 'username', headerName: 'نام کاربری', width: 150 },
  { field: 'password', headerName: 'رمز', width: 110 },
  { field: 'score', headerName: 'امتیاز', width: 70 , 
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
            console.log(mainUser);
          }}
          >
          ویرایش
        </button>
        <button 
          className='btn btn-warning  mx-1' 
          onClick={() => {
            setUserID(params.row.id)
            setIsShowDetailsModal(true)
            setMainUser(params.row)
            console.log(params.row);
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
                  boxShadow: 2,
                  border: 2,
                  padding:2,
                  justifyContent:'center',
                  textAlign:'center',
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
      {/* --------DETAILS MODAL-------- */}
      {isShowDetailsModal && (
        <DetailsModal>
          <TableContainer component={Paper}>
            <Table sx={{ border:1 , width:500,height:100,fontSize:30,borderRadius:10 }} >
              <TableHead >
                <TableRow >
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>شماره تلفن</TableCell>
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>ایمیل</TableCell>
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>استان</TableCell>
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>شهر</TableCell>
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>مقدار خرید</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center' scope="row">{mainUser.phone}</TableCell>
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>{mainUser.email}</TableCell>
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>{mainUser.address}</TableCell>
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>{mainUser.city}</TableCell>
                  <TableCell sx={{fontSize:20 , fontFamily:'lale'}} align='center'>{mainUser.buy}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button sx={{fontSize:20 , fontFamily:'lale'}} onClick={() => setIsShowDetailsModal(false)}>بستن</Button>
        </DetailsModal>
      )}
    </div>
  )
}

export default Users