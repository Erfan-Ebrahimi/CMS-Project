import './Sidebar.scss';

// ----------ICONS--------------//
import {AiOutlineHome} from 'react-icons/ai' 
import {MdProductionQuantityLimits} from 'react-icons/md' 
import {BiCommentDetail} from 'react-icons/bi' 
import {FiUsers} from 'react-icons/fi' 
import {BsBagCheck} from 'react-icons/bs' 
import {BsCurrencyDollar} from 'react-icons/bs' 

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <h1 className='sidebar-title'>به داشبورد خوش آمدید</h1>
        <ul className='sidebar-links'>
            <li className='active'><a href="#1"><AiOutlineHome className='icon'/>خانه</a></li>
            <li><a href="#1"><MdProductionQuantityLimits className='icon'/> محصولات</a></li>
            <li><a href="#1"><BiCommentDetail className='icon'/>نظرات</a></li>
            <li><a href="#1"><FiUsers className='icon'/>کاربران</a></li>
            <li><a href="#1"><BsBagCheck className='icon'/>سفارشات</a></li>
            <li><a href="#1"><BsCurrencyDollar className='icon'/>تخفیف ها</a></li>
        </ul>

    </div>
  )
}

export default Sidebar