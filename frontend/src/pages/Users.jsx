import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const schema = yup.object({
    first_name: yup.string().required()
})



const Users = () => {
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
} = useForm({
    resolver: yupResolver(schema)
})

const onSubmit = (data) => console.log(data)

console.log(errors)

const navigate = useNavigate()

// const handleChange =  (e) => {
//     setLoginSignin(prev=>({...prev, [e.target.name]: e.target.value}))
// }

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
        <form className="mt-4 pt-3 pb-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <input 
                className="form-control"
                type="text"
                // onChange={handleChange}
                placeholder="First Name"
                name="first_name"
                register = {{ ...register("first_name")}}
                                
                />
                <div>
                    {errors.name?.type === "required && first name requred"}
                </div>
            </div>
            <div className="mb-3">
                <input 
                className="form-control"
                type="text"
                // onChange={handleChange}
                placeholder="Last Name"
                name="last_name"
                register= {{...register("last_name")}}
                />
                
            </div>
            <div className="mb-3">
                <input 
                className="form-control"
                type="email"
                // onChange={handleChange}
                placeholder="Email"
                name="email"
                register = {{...register("email")}} 
                />
                <p>{errors.email?.message}</p>
            </div>
            <div className="mb-3">
                <input 
                className="form-control"
                type="password"
                // onChange={handleChange}
                placeholder="Password"
                name="password"
                register = {{...register("email")}} 
                />
                <p>{errors.password?.message}</p>
            </div>
        
      </form>
      <input  className="btn btn-danger text-white text-decoration-none"type="submit" onClick={handleClick}/>
    </div>
)}
          
 
export default Users;