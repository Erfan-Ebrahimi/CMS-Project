import './Products.scss';

// ----------COMPONENTS-------------//
import AddNewProduct from './addNewProduct/AddNewProduct';
import ProductsTable from './productsTable/ProductsTable';
const Products = () => {
  return (
    <div>
      <AddNewProduct/>
      <ProductsTable/>
    </div>
  )
}

export default Products