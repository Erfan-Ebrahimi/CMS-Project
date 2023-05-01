import {useEffect , useState} from 'react';
import './Users.scss';

//----------MUI-------------//
import { DataGrid } from '@mui/x-data-grid';
import { Table , Button , TextField , Box } from '@mui/material';
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
import EditModal from '../modals/editModal/EditModal';

const Users = () => {

  const [allUsers , setAllUsers] = useState([])

  const [mainUser , setMainUser] = useState({})
  const [userID , setUserID] = useState(null)

  const [isShowDeleteModal , setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)
  const [isShowEditModal , setIsShowEditModal] = useState(false)

  //states for EditModal inputs => bayad harkodam state joda dashte bashand
  const [userNewFirstname , setUserNewFirstname] = useState('')
  const [userNewLastname , setUserNewLastname] = useState('')
  const [userNewEmail , setUserNewEmail] = useState('')
  const [userNewPhone , setUserNewPhone] = useState('')
  const [userNewScore , setUserNewScore] = useState('')
  const [userNewCity , setUserNewCity] = useState('')
  const [userNewBuy , setUserNewBuy] = useState('')
  const [userNewAddress , setUserNewAddress] = useState('')
  const [userNewPassword , setUserNewPassword] = useState('')
  const [userNewUsername , setUserNewUsername] = useState('')

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
            setIsShowEditModal(true)
            setUserNewFirstname(params.row.firstname)
            setUserNewLastname(params.row.lastname)
            setUserNewEmail(params.row.email)
            setUserNewPhone(params.row.phone)
            setUserNewScore(params.row.score)
            setUserNewCity(params.row.city)
            setUserNewBuy(params.row.buy)
            setUserNewAddress(params.row.address)
            setUserNewPassword(params.row.password)
            setUserNewUsername(params.row.username)
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

// for close EditModal
const close = (e) => {
  e.preventDefault()
  setIsShowEditModal(false)
}

//for submit EditModal
const newInfos = {
  firsname:userNewFirstname,
  lastname:userNewLastname,
  email:userNewEmail,
  phone:userNewPhone,
  score:userNewScore,
  city:userNewCity,
  buy:userNewBuy,
  address:userNewAddress,
  password:userNewPassword,
  username:userNewUsername
}
const submitUserInfos = (e) => {
  e.preventDefault()

  fetch(`http://localhost:8000/api/users/${userID}` , {
     method:'PUT',
     headers:{
      'Content-Type' : 'application/json'
     },
     body:JSON.stringify(newInfos)
   })
  .then(res => res.json())
  .then((result) => {
    console.log(result)
    setIsShowEditModal(false)
    console.log('user Updated');
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
      {/* --------EDIT MODAL-------- */}
      {isShowEditModal && (
        <EditModal
          hideModal={close}
          submitInfos={submitUserInfos}
        >
          <Box  
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' } ,fontFamily:'lale'}}
          >
            <TextField label="firstname" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewFirstname} onChange={(e) => setUserNewFirstname(e.target.value)}/>
            <TextField label="lastname" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary"  value={userNewLastname} onChange={(e) => setUserNewLastname(e.target.value)}/>
            <TextField label="phone" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewPhone} onChange={(e) => setUserNewPhone(e.target.value)}/>
            <TextField label="score" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewScore} onChange={(e) => setUserNewScore(e.target.value)}/>
            <TextField label="city" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewCity} onChange={(e) => setUserNewCity(e.target.value)}/>
            <TextField label="buy" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewBuy} onChange={(e) => setUserNewBuy(e.target.value)}/>
            <TextField label="email" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewEmail} onChange={(e) => setUserNewEmail(e.target.value)}/>
            <TextField label="address" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewAddress} onChange={(e) => setUserNewAddress(e.target.value)}/>
            <TextField label="password" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewPassword} onChange={(e) => setUserNewPassword(e.target.value)}/>
            <TextField label="username" sx={{marginBottom:2 ,fontFamily:'lale'}} color="secondary" value={userNewUsername} onChange={(e) => setUserNewUsername(e.target.value)}/>
          </Box>
        </EditModal>
      )}
    </div>
  )
}

export default Users