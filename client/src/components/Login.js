import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const Login = () => {
    const [credentials,setCrendentials]=useState({email:"",password:""})
    const context = useContext(NoteContext);
  const {showAlert}=context;
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
    
        });

        const json=await response.json();
        console.log(json);

        if(json.success){
            //Save the auth token
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            showAlert("Login Successfully","success");
        }else{
            showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e) => {
        setCrendentials({ ...credentials, [e.target.name]: e.target.value });
      };

  return (
   <div className="container">
    <h2 className="my-3">Login to continue to iNotebook</h2>
     <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          name="email"
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange={onChange}
        />
      </div>
     
      <button type="submit" className="btn btn-primary" >
        Submit
      </button>
    </form>
   </div>
  );
};

export default Login;
