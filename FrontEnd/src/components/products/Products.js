import { useEffect , useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import './Products.scss';

// ----------COMPONENTS-------------//
import AddNewProduct from './addNewProduct/AddNewProduct';
import ProductsTable from './productsTable/ProductsTable';


const Products = () => {

  //state for all products
  const [allProducts , setAllProducts] = useState([])

  useEffect(() => {
    getAllProducts()
  } , [])
  
  // -------GET data from API----------------//
  const getAllProducts = () => {
    fetch('http://localhost:8000/api/products/')
    .then((res) => res.json())
    .then((data) => setAllProducts(data))
  }

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

  return (
    <div>
      <AddNewProduct getAllProducts={getAllProducts} notify={notify}/>
      <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} notify={notify}/>

      {/* ---------TOSTIFY-------------- */}
      <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody"></ToastContainer>

    </div>
  )
}

export default Products