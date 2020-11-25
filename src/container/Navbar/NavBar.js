import ItemNavBar from '../../components/ItemNavBar/ItemNavBar';
import {Link} from "react-router-dom"


let NavBar = (props) =>{
    return (
        <nav className='header-nav'>
            <Link className='nav-element' to={'/'}><ItemNavBar>All</ItemNavBar></Link>
            <Link className='nav-element' to={'/active'}><ItemNavBar>Active</ItemNavBar></Link>
            <Link className='nav-element' to={'/completed'}><ItemNavBar>Completed</ItemNavBar></Link>
        </nav>
    )
}

export default NavBar ;