import Comments from './components/comments/Comments';
import Products from './components/products/Products';
import Users from './components/users/Users';
import Orders from './components/orders/Orders';
import Offs from './components/offs/Offs';

const routes = [
    {path:'/products' , element: <Products/>},
    {path:'/comments' , element: <Comments/>},
    {path:'/users' , element: <Users/>},
    {path:'/orders' , element: <Orders/>},
    {path:'/offs' , element: <Offs/>},
]

export default routes;