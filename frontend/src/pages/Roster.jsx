import { useEffect, useState } from "react";
import axios from "axios";
import "./Roster.css"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Roster = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/roster");
        setPlayers(res.data);
        console.log(res);
      } catch (err) {

      }
    };
    fetchAllPlayers();
  }, []);

  

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to remove this player?")) {
        axios.delete(`http://localhost:8000/api/remove/${id}`)
        toast.success("Player successfully removed")
        setTimeout(()=> fetchAllPlayers(),500)
    }
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <h1 style={{ textAlign: "center", color:"#C0392B" }}>Red Sox Roster</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>UserID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.first_name}</td>
              <td>{player.last_name}</td>
              <td>{player.age}</td>
              <td>{player.email}</td>
              <td>{player.position}</td>
              <td>
                <Link to={`/update/${player.id}`}>
                    <button className="btn btn-edit">Edit</button>
                </Link>
                <button className="btn btn-delete" onClick= {() => deleteContact(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
        <Link className="text-white text-decoration-none" to="/add">
        <button className="btn btn-contact">Add a Player</button>
        </Link>
      
    </div>
  );
};

export default Roster;
