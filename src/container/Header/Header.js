import H1 from '../../components/H1/H1';
import NavBar from '../Navbar/NavBar';



let Header = (props) =>{
    return (
        <header>
            <H1 text="#Todo"></H1>
            <NavBar activeTabObj={props.activeTabObj} click={props.navBarClick}/>
        </header>
    )
}

export default Header ;