import './AddNewProduct.scss';
// import axios from 'axios'
// -------------ICONS----------------//
import {TbAlphabetLatin} from 'react-icons/tb'
import {BsCurrencyDollar} from 'react-icons/bs'
import {ImListNumbered} from 'react-icons/im'
import {BiImageAdd} from 'react-icons/bi'
import {AiOutlineStar} from 'react-icons/ai'
import {RiNumbersLine} from 'react-icons/ri'
import {MdOutlineColorLens} from 'react-icons/md'
import { useState } from 'react';



const AddNewProduct = () => {

    const [newProductTitle , setNewProductTitle] = useState('')
    const [newProductPrice , setNewProductPrice] = useState('')
    const [newProductCount , setNewProductCount] = useState('')
    const [newProductImg , setNewProductImg] = useState('')
    const [newProductPopularity , setNewProductPopularity] = useState('')
    const [newProductSale , setNewProductSale] = useState('')
    const [newProductColors , setNewProductColors] = useState('')

    const newProductInfos = {
        title : newProductTitle,
        price : newProductPrice,
        count : newProductCount,
        img : newProductImg,
        popularity : newProductPopularity,
        sale : newProductSale,
        colors : newProductColors
    }

    const addNewProduct =async (event) => {
        console.log(JSON.stringify(newProductInfos));
        event.preventDefault()

            // try {
            //     const response = await axios.post('http://localhost:8000/api/products/', newProductInfos);
            //     console.log(response.data);
            // } catch (error) {
            //     console.error(error);
            // }
        // try {
        //     const res = await fetch(`http://localhost:8000/api/products/`, {
        //         method: 'POST',
        //         body: JSON.stringify(newProductInfos),
        //         headers:{
        //             'Content-Type':'text/html; charset=utf-8'
        //         }  
        //     });
            
        //     const data = await res.json();
        //     console.log(data);
        // } catch (error) {
        //     console.log('Error:', error);
        // } 
        // try{

        // }
        fetch('http://localhost:8000/api/products/' , {
            method: 'POST',
            body: JSON.stringify(newProductInfos),
            headers:{
                'Content-Type':'application/json'
            }  
        })
        .then((res) => res.json()) // تبدیل متن پاسخ به یک متن معمولی
        // .then(json => JSON.parse(json)) // تبدیل متن پاسخ به یک JSON
        .then(data => console.log(data)) // نمایش دادن پاسخ دریافت شده به صورت JSON
        .catch(error => console.log('Error:', error));
         
    }

    

    

  return (
    <div className='products-main'>
        <h1 className='products-title'>افزودن محصول جدید</h1>

        <form action='#' className='add-products-form' onSubmit={addNewProduct}>
            <div className='add-products-form-wrap'>
                <div className='add-products-form-group'>
                    <TbAlphabetLatin className='icon'/>
                    <input 
                        type="text" 
                        className='add-products-input' 
                        placeholder='نام محصول'
                        value={newProductTitle}
                        onChange={(event) => setNewProductTitle(event.target.value)}
                    />
                </div>
                <div className='add-products-form-group'>
                    <BsCurrencyDollar className='icon'/>
                    <input 
                        type="number" 
                        className='add-products-input' 
                        placeholder='قیمت محصول'
                        value={newProductPrice}
                        onChange={(event) => setNewProductPrice(event.target.value)}
                    />
                </div>
                <div className='add-products-form-group'>
                    <ImListNumbered className='icon'/>
                    <input 
                        type="number" 
                        className='add-products-input' 
                        placeholder='موجودی محصول'
                        value={newProductCount}
                        onChange={(event) => setNewProductCount(event.target.value)}
                    />
                </div>
                <div className='add-products-form-group'>
                    <BiImageAdd className='icon'/>
                    <input 
                        type="text" 
                        className='add-products-input' 
                        placeholder='آدرس عکس  محصول'
                        value={newProductImg}
                        onChange={(event) => setNewProductImg(event.target.value)}
                    />
                </div>
                <div className='add-products-form-group'>
                    <AiOutlineStar className='icon'/>
                    <input 
                        type="number" 
                        className='add-products-input' 
                        placeholder='میزان محبوبیت محصول'
                        value={newProductPopularity}
                        onChange={(event) => setNewProductPopularity(event.target.value)}
                    />
                </div>
                <div className='add-products-form-group'>
                    <RiNumbersLine className='icon'/>
                    <input 
                        type="number" 
                        className='add-products-input' 
                        placeholder='میزان فروش محصول'
                        value={newProductSale}
                        onChange={(event) => setNewProductSale(event.target.value)}
                    />
                </div>
                <div className='add-products-form-group'>
                    <MdOutlineColorLens className='icon'/>
                    <input 
                        type="number" 
                        className='add-products-input' 
                        placeholder='تعداد رنگ بندی محصول'
                        value={newProductColors}
                        onChange={(event) => setNewProductColors(event.target.value)}
                    />
                </div>
            </div>
            <button className='add-btn' type='submit' >ثبت محصول</button>
        </form>
    </div>
  )
}

export default AddNewProduct