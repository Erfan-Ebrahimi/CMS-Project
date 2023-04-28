import { useEffect , useState } from 'react';
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

  return (
    <div>
      <AddNewProduct getAllProducts={getAllProducts}/>
      <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts}/>
    </div>
  )
}

export default Products