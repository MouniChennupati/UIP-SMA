import { fetchData } from "../../main.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user/userContext.js";
function RegisterForm() {

    const navigate = useNavigate();
    const {user, updateUser} = useContext(UserContext);

    const {username, email, password, confirmpassword} = user;



    const onChange = (e) => updateUser(e.target.name, e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(password !== confirmpassword){
            console.log("Passwords must match!!!");
        }
        else{
            console.log("Success!!!");
        }

        fetchData("/user/register", {username, email, password}, "POST")
        .then((data) => {
            if(!data.message){
                console.log(data);
                navigate("/login");
            }
            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                    <div className="loginForm shadow mx-5 my-5 px-5 py-5 rounded">
                        <center><i className="fa fa-user-plus"></i></center>
                        <h2 className="mb-5 text-center">REGISTER HERE</h2>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">User Name</label>
                                <input type="text" className="form-control" aria-describedby="emailHelp" name="username" onChange={onChange} value={username} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" aria-describedby="emailHelp" name="email" onChange={onChange} value={email} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" onChange={onChange} value={password} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" name="confirmpassword" onChange={onChange} value={confirmpassword} required />
                            </div>
                            <center><button type="submit" className="btn btn-lg btn-warning mt-5"><strong>Register</strong></button></center>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RegisterForm;