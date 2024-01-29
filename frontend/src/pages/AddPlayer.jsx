import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddPlayer.css";

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

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/roster", input);
      alert("Player successfully added!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="mt-2 text-center">New Player</h2>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="first_name"
          onChange={handleChange}
          placeholder="First Name"
          value={name || ""}
          name="first_name"
        />

        <input
          type="text"
          id="last_name"
          onChange={handleChange}
          placeholder="Last Name"
          name="last_name"
        />
        <input
          type="number"
          onChange={handleChange}
          placeholder="Age"
          name="age"
          id="age"
        />

        <input
          className="form-control"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          name="email"
        />

        <select
            style={{marginBottom: "2rem"}}
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
        <input type="submit" value="Save" />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddPlayer;
