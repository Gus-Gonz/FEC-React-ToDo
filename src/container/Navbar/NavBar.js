import ItemNavBar from '../../components/ItemNavBar/ItemNavBar';
import { Link } from 'react-router-dom';
// className={props.activeTabObj[0].active ?'nav-element active-nav-element' : 'nav-element'
let NavBar = (props) => {
  return (
    <nav className='header-nav'>
      <Link onClick={props.click} className={'nav-element'} to={'/'}>
        <ItemNavBar>All</ItemNavBar>
      </Link>
      <Link onClick={props.click} className={'nav-element'} to={'/active'}>
        <ItemNavBar>Active</ItemNavBar>
      </Link>
      <Link onClick={props.click} className={'nav-element'} to={'/completed'}>
        <ItemNavBar>Completed</ItemNavBar>
      </Link>
    </nav>
  );
};

export default NavBar;
