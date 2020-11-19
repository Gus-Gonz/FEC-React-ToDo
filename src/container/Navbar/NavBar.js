import ItemNavBar from '../../components/ItemNavBar/ItemNavBar';

let NavBar = (props) =>{
    return (
        <nav>
            <ItemNavBar text="All"/>
            <ItemNavBar text="Active"/>
            <ItemNavBar text="Completed"/>
        </nav>
    )
}

export default NavBar ;