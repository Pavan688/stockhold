import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/inventory">Inventory</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/storeList">List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/addItem">Add Item</Link>
            </li>

        {
            localStorage.getItem("stock_user")
                ? <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("stock_user")
                        navigate("/", {replace: true})
                    }}>Logout</Link>
                </li>
                : ""
        }
        </ul>
    )
}
