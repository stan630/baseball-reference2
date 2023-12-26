import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const Roster = () => {
    const [players, setPlayers] = useState([])

useEffect(()=>{
    const fetchAllPlayers = async ()=> {
        try{
            const res = await axios.get("http://localhost:8000/roster")
            setPlayers(res.data)
            console.log(res)
        } catch(err){
            console.log(err)
        }
    }
    fetchAllPlayers()
},[])

return(
    <div className="container">
        <h2 style={{ textAlign: "center"}}>Red Sox Roster</h2>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>UserID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            
              <tr key={player.user_id}>
                <td>{player.user_id}</td>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.age}</td>
                <td>{player.email}</td>
                <td>{player.position}</td>
              </tr>
            
          ))}
        </tbody>
      </Table>
      <button  className="btn btn-danger">
        <Link className="text-white text-decoration-none" to="/add">Add a Player</Link>
      </button>
    </div>
)}
          
 
export default Roster;