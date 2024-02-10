import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddPlayer.css";
import { toast } from "react-toastify";

const initialState = {
  first_name: "",
  last_name: "",
  age: "",
  email: "",
  position: "",
};

const AddPlayer = () => {
  const [state, setState] = useState(initialState);

  const { first_name, last_name, age, email, position } = state;

  const navigate = useNavigate();

  const { id } = useParams;

  useEffect(() => {
    axios.get(`http://localhost:8000/api/get/${id}`).then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !age || !email || !position) {
      toast.error("A field is missing");
    } else {
      if (!id) {
        axios.post("http://localhost:8000/api/post", {
            first_name,
            last_name,
            age,
            email,
            position,
          })
          .then(() => {
            setState({
              first_name: "",
              last_name: "",
              age: "",
              email: "",
              position: ""
            });
          }).catch((err) => toast.error(err.response.data));
        toast.success("Player successfully added!");
      } else {
        axios
          .put(`http://localhost/api/update/${id}`, {
            first_name,
            last_name,
            age,
            email,
            position,
          }).then(() => {
            setState({
              first_name: "",
              last_name: "",
              age: "",
              email: "",
              position: "",
            });
          }).catch((err) => toast.error(err.response.data));
        toast.success("Player updated successfully");
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
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
          style={{ marginBottom: "2rem" }}
          name="position"
          id="position"
          onChange={handleChange}
          //   {...register("position")}
        >
          <option defaultValue={""}>Select a position</option>
          <option value={"Pitcher"}>Pitcher</option>
          <option value={"Catcher"}>Catcher</option>
          <option value={"First"}>First</option>
          <option value={"Second"}>Second</option>
          <option value={"Third"}>Third</option>
          <option value={"Shortstop"}>Shortstop</option>
          <option value={"Outfield"}>Outfield</option>
        </select>
        <input type="submit" value={id ? "Update" : "Save"}/>
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddPlayer;
