import './Sidebar.scss';


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <h1 className='sidebar-title'>به داشبور خوش آمدید</h1>
        <ul className='sidebar-links'>
            <li><a href="#1">خانه</a></li>
            <li><a href="#1">محصولات</a></li>
            <li><a href="#1">نظرات</a></li>
            <li><a href="#1">کاربران</a></li>
            <li><a href="#1">سفارشات</a></li>
            <li><a href="#1">تخفیف ها</a></li>
        </ul>

    </div>
  )
}

export default Sidebar