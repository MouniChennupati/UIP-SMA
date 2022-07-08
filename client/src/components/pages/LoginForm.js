import { fetchData } from "../../main.js";
import { useContext } from "react";
import UserContext from "../../context/user/userContext.js";
import { useNavigate } from "react-router-dom";

function LoginForm(){
    const navigate = useNavigate();

    const {user, updateUser} = useContext(UserContext);

    const {username,userid, email, password} = user;

    const onChange = (e) => updateUser(e.target.name, e.target.value)

    const onSubmit = (e) => {
        e.preventDefault();

        fetchData("/user/login", {username, password}, "POST")
        .then((data) => {
            if(!data.message){
                console.log(data);
                updateUser("userid",data._id);
                updateUser("authenticated",true);
                
                navigate("/profile");
            }
            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <div>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                    <div className="loginForm shadow mx-5 my-5 px-5 py-5 rounded">
                        <center><i className="fa fa-user"></i></center>
                        <h2 className="mb-5 text-center">USER LOGIN</h2>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">User Name</label>
                                <input type="text" className="form-control"  aria-describedby="emailHelp" name="username" onChange={onChange} value={username} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password"  onChange={onChange} value={password} required />
                            </div>
                            <center><button type="submit" className="btn btn-lg btn-warning mt-5"><strong>Login</strong></button></center>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginForm;