import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Axios from "axios";

import Swal from 'sweetalert2'




function App() {

  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [years, setYears] = useState();

  const [listEmployes, setEmployes] = useState([])

  const [update, setUpdate] = useState(false)

  const addNew = () => {
    Axios.post("http://localhost:3001/create", {
      id: id,
      name: name,
      age: age,
      country: country,
      position: position,
      years: years
    }).then(() => {
      getEmployes();
      clean();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "the employe " + name + " has been registed",
        showConfirmButton: true
        //timer: 1500
      });
    })
  }
  const updateEmploye = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: name,
      age: age,
      country: country,
      position: position,
      years: years
    }).then(() => {
      getEmployes();
      clean();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "the employe " + name + " has been updated",
        showConfirmButton: true
        //timer: 1500
      });
    })
  }
  const deleteEmploye = (val) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure to delete " +val.name+ "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmployes();
          clean();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        });

      } else {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          icon: "error",
          showConfirmButton: true
        });
      }
    });

  }

  const getEmployes = () => {
    Axios.get("http://localhost:3001/employes").then((res) => {
      setEmployes(res.data);
      clean();
    })
  }

  const modifyEmploye = (val) => {

    setUpdate(true);

    setId(val.id);
    setName(val.name);
    setAge(val.age);
    setCountry(val.country);
    setPosition(val.position);
    setYears(val.years);
  }

  const clean = () => {
    setYears("");
    setAge("");
    setName("");
    setCountry("");
    setPosition("");
    setId("");
    setUpdate(false);
  }


  return (

    <div className="App">
      <div className="d-flex flex-colum justify-content-center ">
        <div className="app">
          <div className="datos">
            <div className="d-flex flex-colum justify-content-center mt-5 w-100 align-items-center">
              <div className="input-group mb-3 w-10 h-3 p-1">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">name</span>
                </div>
                <input type="text" value={name} className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { setName(event.target.value) }} ></input>
              </div>
            </div>
            <div className="d-flex flex-colum justify-content-center w-100 align-items-center">
              <div className="input-group mb-3 w-10 h-3 p-1">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">age</span>
                </div>
                <input type="number" value={age} className="form-control" placeholder="age" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { setAge(event.target.value) }}></input>
              </div>

            </div>
            <div className="d-flex flex-colum justify-content-center w-100 align-items-center">
              <div className="input-group mb-3 w-10 h-3 p-1">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">country</span>
                </div>
                <input type="text" value={country} className="form-control" placeholder="country" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { setCountry(event.target.value) }}></input>
              </div>

            </div>
            <div className="d-flex flex-colum justify-content-center w-100 align-items-center">
              <div className="input-group mb-3 w-10 h-3 p-1">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">position</span>
                </div>
                <input type="text" value={position} className="form-control" placeholder="Position in the company" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { setPosition(event.target.value) }}></input>
              </div>

            </div>
            <div className="d-flex flex-colum justify-content-center w-100 align-items-center">
              <div className="input-group mb-3 w-10 h-3 p-1">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">years</span>
                </div>
                <input type="number" value={years} className="form-control" placeholder="years in the company" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { setYears(event.target.value) }}></input>
              </div>
            </div>
            {
              update ? <div> <button className="btn btn-outline-success" onClick={updateEmploye}>update</button>
                <button className="btn btn-outline-danger m-3" onClick={clean}>cancel</button></div>
                :
                <div> <button className="btn btn-outline-dark" onClick={addNew}>new employe</button>
                  <button className="btn btn-dark m-3" onClick={getEmployes}>employes</button>
                </div>
            }

          </div>
        </div>
      </div>
      <div>
        <table className="table table-dark table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Country</th>
              <th scope="col">position </th>
              <th scope="col">years</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {
              listEmployes.map((val, key) => {
                return <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{val.name}</td>
                  <td>{val.age}</td>
                  <td>{val.country}</td>
                  <td>{val.position}</td>
                  <td>{val.years}</td>
                  <td><button type="button" className="btn btn-info me-1" onClick={() => {
                    modifyEmploye(val);
                  }}>Modify</button>
                    <button type="button" className="btn btn-danger " onClick={() => {
                      deleteEmploye(val);
                    }}>Delete</button></td>
                </tr>
              })
            }

          </tbody>
        </table>
      </div>
    </div>

  );
}

export default App;
