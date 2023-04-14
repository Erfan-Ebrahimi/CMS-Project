import './Products.scss';

// ----------COMPONENTS-------------//
import ErrorBox from '../errorBox/ErrorBox';
import AddNewProduct from './addNewProduct/AddNewProduct';
const Products = () => {
  return (
    <div>
      <ErrorBox msg='هیچ محصولی یافت نشد !!'/>
      <AddNewProduct/>
    </div>
  )
}

export default Products