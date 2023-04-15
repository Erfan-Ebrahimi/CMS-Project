import { NavLink } from 'react-router-dom';
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
            <li><NavLink to="/"><AiOutlineHome className='icon'/>خانه</NavLink></li>
            <li><NavLink to="/products"><MdProductionQuantityLimits className='icon'/> محصولات</NavLink></li>
            <li><NavLink to="/comments"><BiCommentDetail className='icon'/>نظرات</NavLink></li>
            <li><NavLink to="/Users"><FiUsers className='icon'/>کاربران</NavLink></li>
            <li><NavLink to="/orders"><BsBagCheck className='icon'/>سفارشات</NavLink></li>
            <li><NavLink to="/offs"><BsCurrencyDollar className='icon'/>تخفیف ها</NavLink></li>
        </ul>

    </div>
  )
}

export default Sidebar;