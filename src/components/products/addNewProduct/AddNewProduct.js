import './AddNewProduct.scss';

// -------------ICONS----------------//
import {TbAlphabetLatin} from 'react-icons/tb'
import {BsCurrencyDollar} from 'react-icons/bs'
import {ImListNumbered} from 'react-icons/im'
import {BiImageAdd} from 'react-icons/bi'
import {AiOutlineStar} from 'react-icons/ai'
import {RiNumbersLine} from 'react-icons/ri'
import {MdOutlineColorLens} from 'react-icons/md'



const AddNewProduct = () => {
  return (
    <div className='products-main'>
        <h1 className='products-title'>افزودن محصول جدید</h1>

        <form action="#" className='add-products-form'>
            <div className='add-products-form-wrap'>
                <div className='add-products-form-group'>
                    <TbAlphabetLatin className='icon'/>
                    <input type="text" className='add-products-input' placeholder='نام محصول' />
                </div>
                <div className='add-products-form-group'>
                    <TbAlphabetLatin className='icon'/>
                    <input type="text" className='add-products-input' placeholder='قیمت محصول' />
                </div>
                <div className='add-products-form-group'>
                    <TbAlphabetLatin className='icon'/>
                    <input type="text" className='add-products-input' placeholder='موجودی محصول' />
                </div>
                <div className='add-products-form-group'>
                    <TbAlphabetLatin className='icon'/>
                    <input type="text" className='add-products-input' placeholder='آدرس عکس  محصول' />
                </div>
                <div className='add-products-form-group'>
                    <TbAlphabetLatin className='icon'/>
                    <input type="text" className='add-products-input' placeholder='میزان محبوبیت محصول' />
                </div>
                <div className='add-products-form-group'>
                    <TbAlphabetLatin className='icon'/>
                    <input type="text" className='add-products-input' placeholder='میزان فروش محصول' />
                </div>
                <div className='add-products-form-group'>
                    <TbAlphabetLatin className='icon'/>
                    <input type="text" className='add-products-input' placeholder='تعداد رنگ بندی محصول' />
                </div>
            </div>
            <button className='add-btn'>ثبت محصول</button>
        </form>
    </div>
  )
}

export default AddNewProduct