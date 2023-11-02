import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    setInput();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/roster,input");
      navigate = "/";
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
            {...register("first_name", {
              required: true,
              pattern: "^[A-Za-z]{2,}$",
            })}
          />
          {errors.firstname && <p>Name must contain at least 2 letters</p>}
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            placeholder="Last Name"
            name="last_name"
            {...register("last_name", {
              required: true,
              pattern: "^[A-Za-z]{2,}$",
            })}
          />
          {errors.lastname && <p>Name must contain at least 2 letters</p>}
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            placeholder="Age"
            name="age"
            {...register("age", { required: true })}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            name="email"
            {...register("email", { required: true })}
          />
        </div>
        <select
          className="form-select mb-3"
          name="position"
          id="position"
          onChange={handleChange}
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
      <button onClick={handleClick}>Add player</button>
      </div>
      
    </div>
  );
};

export default AddPlayer;
