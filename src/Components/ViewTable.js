import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';

import { useHistory } from "react-router-dom"

export default function ViewTable() {
    const history=useHistory()
    const [savedData,setSavedData]=useState([])
    const [change,setChange]=useState(false)
     useEffect(() => {
         axios.get("http://localhost:4000")
         .then(result=>{
             setSavedData(result.data.message)
         })
         return () => {
             console.log("viewTable CleanUp")
         }
     }, [])

     let deleteHandler=(element)=>{
        console.log(element)
        axios.delete('http://localhost:4000',{
            data:{element}})
        .then(result=>{
            // console.log(result.data)
        })
        .catch(error=>console.log(error))
        setChange(!change)
     }

    return (
        <div className='container'>
            <div className="d-flex">
            <i  
            style={{ "font-size": "2rem", "color": "cornflowerblue" }}  
            className="bi bi-arrow-left-square col-1"
            onClick={()=>{history.push('/home')}}
            ></i>
                   <h1 className="col-10 ">View Table</h1>

            </div>
           
            <Table striped bordered  >
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Currency Name</th>
                        <th>ID</th>
                        <th>logo</th>
                        <th>Market Cap</th>
                        <th>Status</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {savedData.map((element, index) => {
                        return <tr key={index}>
                            <td>{element.rank}</td>
                            <td>{element.name}</td>
                            <td> {element.symbol}</td>
                            <td> <img src={element.logo_url} alt={element.symbol} style={{ width: 20, height: 20 }} ></img></td>
                            <td>{element.market_cap}</td>
                            <td>
                                <button className="button btn-danger" onClick={()=>{deleteHandler(element)}}> Delete </button>
                            </td>
                            <td>{element.price}</td>
                        </tr>
                    })}
                </tbody>
            </Table>

        </div>
    )
}
