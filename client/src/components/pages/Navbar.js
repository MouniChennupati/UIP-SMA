import {Link, Outlet} from "react-router-dom";
import UserContext from "../../context/user/userContext.js";
import {useContext, Fragment} from 'react';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const {user, updateUser} = useContext(UserContext);

    const authenticated = (
        <Fragment>
            <i>{user.username}'s</i>
        </Fragment>
    );

    const Logout = (e) => {
        updateUser("authenticated", false);
        navigate("/login");
    } 

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <div className="container">
                    <Link className="navbar-brand" to="/"><h3>Social Media App</h3></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active mx-lg-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {user.authenticated?
                            <>
                            <li className="nav-item">
                                <Link className="nav-link mx-lg-5" to="profile">Profile</Link>
                            </li>
                            <li className="nav-item me-5">
                                <button onClick={Logout} className="btn btn-warning">Logout</button>
                            </li>
                            </>:
                            <>
                            <li className="nav-item">
                                <Link className="nav-link mx-lg-5" to="login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-lg-5" to="register">Register</Link>
                            </li></>}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;