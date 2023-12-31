import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import '../App.css'
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const AddPlayer = (props) => {
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    position: "",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput(prev=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/roster",input);
      alert("Player successfully added!")
    navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-2">New Player</h2>
      <form className="mt-4 pt-3 pb-2">
        <div className="mb-3">
          <input
            className="form-control "
            type="text"
            onChange={handleChange}
            placeholder="First Name"
            name="first_name"
        //    {...register("first_name", {
        //       required: {
        //         value: true,
        //         message: "First Name is required"
        //       },
             
        //     })}
          />
          <p>{errors.firstname?.message} </p>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            placeholder="Last Name"
            name="last_name"
            // {...register("last_name", {
            //   required: true,
            //   message: "Last Name is required"
            // })}
          />
          {errors.lastname && <p>Name must contain at least 2 letters</p>}
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            name="age"
            placeholder="Age"
                // {...register("age", { required: true })}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            name="email"
            // {...register("email", { 
            //     pattern: {
            //         value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            //         message: 'Invalid email format'
            //     }, 
            // })}
            />
        </div>
        <select
          className="form-select mb-3"
          name="position"
          id="position"
          onChange={handleChange}
        //   {...register("position")}
        >
          <option selected>Select a position</option>
          <option value={"Pitcher"}>Pitcher</option>
          <option value={"Catcher"}>Catcher</option>
          <option value={"First"}>First</option>
          <option value={"Second"}>Second</option>
          <option value={"Third"}>Third</option>
          <option value={"Shortstop"}>Shortstop</option>
          <option value={"Outfield"}>Outfield</option>
        </select>
      </form>
      <div className="text-center mt-3">
      <button className="btn btn-danger" onClick={handleClick}>Add player</button>
      
      </div>
      
    </div>
  );
};

export default AddPlayer;
