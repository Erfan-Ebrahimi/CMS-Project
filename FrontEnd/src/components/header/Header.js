import './Header.scss';

// -------IMG--------//
import img1 from '../../images/prof1.jfif'

// ---------ICONS-----------//
import {AiOutlineBell} from 'react-icons/ai'
import {BsFillSunFill} from 'react-icons/bs'
import {FcSearch} from 'react-icons/fc'


const Header = () => {
  return (
    <div className='header'>
        <div className="h-right">
            <img src={img1} alt="profImg" />
            <div className='description'>
                <h1>محمد ابراهیمی</h1>
                <h3>توسعه دهنده فرانت</h3>
            </div>
        </div>
        <div className="h-left">
            <div className="search-box">
                <input type="search" placeholder='دنبال چی می گردی؟؟' />
                <button><FcSearch/></button>
            </div>
            <button className='left-icon'><AiOutlineBell/></button>
            <button className='left-icon'><BsFillSunFill/></button>
        </div>
    </div>
  )
}

export default Header