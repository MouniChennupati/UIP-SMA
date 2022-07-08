import UserContext from "../../context/user/userContext.js";
import { fetchData } from "../../main.js";
import { useContext, Fragment } from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function About() {
    const navigate = useNavigate();

    const { user, updateUser } = useContext(UserContext);

    const authenticated = (
        <Fragment>
            <i>{user.username}</i>
        </Fragment>
    );


    const [postData, setPost] = useState({
        userid: user.username,
        post: "",
        posttype: ""
    });

    const [postedData, setPostedData] = useState([]);

    const { userid, post, posttype } = postData;

    const onInputChange = e => {
        setPost({ ...postData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {

        const posts = await axios.post("https://my-social-proj.herokuapp.com/post/getUserPosts", {

            userid: user.username
        });
        console.log(posts.data);
        setPostedData(posts.data);

    };

    const onSubmit = async e => {
        e.preventDefault();
        console.log(postData);
        await axios.post("https://my-social-proj.herokuapp.com/post/create", postData);
        setPost({
            userid: user.username,
            post: "",
            posttype: ""
        });
        loadPosts();

    }

    const deletePost = async postid => {
        var post_id = postid;
        await axios.delete("https://my-social-proj.herokuapp.com/post/delete", {
            data: {
                postid: post_id
            }
        });
        loadPosts();

    };



    return (
        <div className="container my-5 mx-5">
            <div className="card px-5 py-5">
                <div className="row">
                    <div className="col-sm-5 card px-4 py-4">
                        <h3>User's Profile</h3>
                        <center>
                            <img src="https://media.istockphoto.com/vectors/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-vector-id1130884625?k=20&m=1130884625&s=612x612&w=0&h=OITK5Otm_lRj7Cx8mBhm7NtLTEHvp6v3XnZFLZmuB9o=" height="200" alt="" />
                            <center><h4>{authenticated}</h4></center>
                            <center><h6 className="mt-4 text-primary">Followers: 4k</h6></center>
                            <center><h6 className="text-primary">Following: 5k</h6></center>
                        </center>
                    </div>
                    <div className="col-sm-7 card px-4 py-4">
                        <h4 className="mb-4">Add a post</h4>
                        <form onSubmit={e => onSubmit(e)}>
                            <label htmlFor="">Post</label>
                            <textarea id="" rows="3" className="form-control" name="post" value={post} onChange={e => onInputChange(e)} required></textarea>
                            <label htmlFor="" className="my-3">Post Type</label>
                            <input type="text" className="form-control" name="posttype" value={posttype} onChange={e => onInputChange(e)} required />

                            <div className="d-flex justify-content-end">
                                <button className="btn btn-sm btn-success my-3"><strong>Post this content</strong></button>
                            </div>
                        </form>
                        <h4 className="mt-5 mb-3">All Your Posts</h4>
                        <div className="card px-4 py-4">
                            {
                                Object.values(postedData).map((posted, index) => (
                                    <div className="card px-2 py-2">
                                        <div className="row">

                                            <div className="col d-flex justify-content-end"><button className="btn btn-sm btn-danger" disabled>{posted.posttype}</button></div>
                                            <div className="col-xs-2 col-1  d-flex justify-content-end">
                                                <Link

                                                    onClick={() => deletePost(posted._id)} to=""
                                                >
                                                    <i className="fa fa-trash text-danger fa-2x"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <h6>{posted.post}</h6>

                                    </div>

                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;