import './ProductsTable.scss';

import img1 from '../../../images/prof1.jfif';

const ProductsTable = () => {
  return (
    <table className='products-table'>
        <tr className='pt-heading-tr'>
            <th>عکس</th>
            <th>نام</th>
            <th>قیمت</th>
            <th>موجودی</th>
            <th>تغییرات</th>
        </tr>
        <tr>
            <td>
                <img className='pt-table' src={img1} alt="img" />
            </td>
            <td>روغن</td>
            <td>92000 تومان</td>
            <td>85</td>
            <td>
                <button className='pt-btn'>جزییات</button>
                <button className='pt-btn'>حذف</button>
                <button className='pt-btn'>ویرایش</button>
            </td>
        </tr>
    </table>
  )
}

export default ProductsTable