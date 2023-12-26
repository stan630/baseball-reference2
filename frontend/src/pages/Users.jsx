import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const Users = (props) => {
    const [loginSignin, setLoginSignin] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    })

const {
    register,
    control,
    handleSubmit,
    formState: {errors},
} = useForm()

const [error, setError] = useState(false)

const navigate = useNavigate()

const handleChange =  (e) => {
    setLoginSignin(prev=>({...prev, [e.target.name]: e.target.value}))
}

const handleClick =  async (e) => {
    e.preventDefault()
    try {
         await axios.post("http://localhost:8000/users",loginSignin)
        navigate("/")
    } catch (err) {
        alert("bad connection")
        console.log(err)
    }
}

return(
    <div className="container"><h2>Register</h2>
        <form className="mt-4 pt-3 pb-2">
            <div className="mb-3">
                <input 
                className="form-control"
                type="text"
                onChange={handleChange}
                placeholder="First Name"
                name="first_name"
                // {...register("first_name", {
                //     required: {
                //         value: true,
                //         message: "First Name is required"
                //     }
                // })}
                />
                <p>{errors.first_name?.message}</p>
            </div>
            <div className="mb-3">
                <input 
                className="form-control"
                type="text"
                onChange={handleChange}
                placeholder="Last Name"
                name="last_name"
                // {...register("last_name", {
                //     required: {
                //         value: true,
                //         message: "Last Name is required"
                //     }
                // })}
                />
                {errors.last_name && <p>Name must contain at least 2 letters</p>}
            </div>
            <div className="mb-3">
                <input 
                className="form-control"
                type="email"
                onChange={handleChange}
                placeholder="Email"
                name="email"
                // {...register("email", {
                //     required: {
                //         value: true,
                //         message: "Email is required"
                //     }
                // })}
                />
                <p>{errors.email?.message}</p>
            </div>
            <div className="mb-3">
                <input 
                className="form-control"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                name="password"
                // {...register("password", {
                //     required: {
                //         value: true,
                //         message: "Password is required"
                //     }
                // })}
                />
                <p>{errors.password?.message}</p>
            </div>
        
      </form>
      <button  className="btn btn-danger text-white text-decoration-none"onClick={handleClick}>Submit</button>
    </div>
)}
          
 
export default Users;