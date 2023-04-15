import './Products.scss';

// ----------COMPONENTS-------------//
import ErrorBox from '../errorBox/ErrorBox';
import AddNewProduct from './addNewProduct/AddNewProduct';
import ProductsTable from './productsTable/ProductsTable';
const Products = () => {
  return (
    <div>
      <ErrorBox msg='هیچ محصولی یافت نشد !!'/>
      <AddNewProduct/>
      <ProductsTable/>
    </div>
  )
}

export default Products