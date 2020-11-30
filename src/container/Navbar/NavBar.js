import ItemNavBar from '../../components/ItemNavBar/ItemNavBar';
import { Link } from 'react-router-dom';
// className={props.activeTabObj[0].active ?'nav-element active-nav-element' : 'nav-element'

let NavBar = ({activeTabObj}) => {
  return (
    <nav className='header-nav'>
      <Link className={activeTabObj[0].active ?'nav-element active-nav-element' : 'nav-element'} to={'/'}>
        <ItemNavBar>All</ItemNavBar>
      </Link>
      <Link className={activeTabObj[1].active ?'nav-element active-nav-element' : 'nav-element'} to={'/active'}>
        <ItemNavBar>Active</ItemNavBar>
      </Link>
      <Link className={activeTabObj[2].active ?'nav-element active-nav-element' : 'nav-element'} to={'/completed'}>
        <ItemNavBar>Completed</ItemNavBar>
      </Link>
    </nav>
  );
};

export default NavBar;
