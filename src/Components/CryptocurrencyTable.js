import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'

function CryptocurrencyTable() {
  let history = useHistory();
  const [data, setData] = useState([])
  const [backendRank, setBackendRank] = useState([])

  const [add,setAdd]=useState(false)


  const [displayData, setdisplayData] = useState([])
  const pagination = 5
  const [pageIndex, setPageIndex] = useState(1)
  const [search, setsearch] = useState(false)
  //  console.log(displat)

  useEffect(() => {
    // let apiResponse=
    axios({
      method: 'get',
      url: 'https://api.nomics.com/v1/currencies/ticker',
      params: {
        key: '9d14da26e2e40d355404468bbe4723f3bd62fba8',
        'interval': '1d',
        'convert': 'USD',
        'per-page': '30',
        'page': '1'
      }
      // responseType: 'stream'
    })
      .then(function (response) {
        let format = response.data.map((element) => {
          return ({
            "id": element.id,
            "name": element.name,
            "logo_url": element.logo_url,
            "symbol": element.symbol,
            "rank": element.rank,
            "market_cap": element.market_cap,
            "price": element.price
          })
        })
        // console.log(format.map((element) => element.rank))
        // apiResponse=format
        setData(format)
        //  return format
      });




    axios.get("http://localhost:4000")
      .then(response => {
        // console.log(response.data.message)
        setBackendRank(response.data.message
          // .map(element => element.rank)
          )
        // console.log(backendRank)
      })
      .catch(err => console.log(err))


    let apiResponse = data
    // let backendResponse=backendRank
    apiResponse.map(element => {
      element.showViewButton = false
      backendRank.map(backendApi=>{
        if (element.name === backendApi.name) {
          // if item found, show view button
          element.showViewButton = true;
      } 
      })
    })
    // console.log(apiResponse)


    setdisplayData(data.filter((accumulator, index) => index < pagination))
    console.log("useEffect first")

    return () => {
      console.log("cleanUp")
    }

  }, [data, pagination,add])

  useEffect(() => {
    console.log("second useeffect")
    if (pageIndex < 1 && pageIndex > data.length / pagination) {
      alert("paggination error")
      // console.log("")
    }
    setdisplayData(data.filter((element, index) => (
      (((pagination * pageIndex) - pagination) <= index) && index < (pagination * pageIndex)))
    )
    return () => {
      console.log("pagination useEffect")
    }
  }, [pageIndex,data,search])


  let onChangeHandler = (e) => {
    let searchString = e.target.value
    let search = (data.filter((element) => { return (element.name.toLowerCase().match(searchString)) }))
    // console.log(sea)
    if (searchString !== '') {
      setdisplayData(search)
    } else {setsearch(!search)}
    
  }

  let addHandle = (e) => {
    // console.log("add button is clicked")
    // console.log(e)
    // setData(data)
      setAdd(!add)
    // (data.map(element=>(element.showViewButton=true)))
    axios.post('http://localhost:4000',{e})
    .then((response)=>{
      console.log(response.data)
      
    })
    .catch(err=>console.log(err))

  }

  let viewHandle=(e)=>{
    console.log("view button is clicked")
    console.log(e)
    history.push('/view')
  }

  return (
    <div className="container">
      <h1>Cryptocurrency Table </h1>

      <div className="mt-5 mb-2 d-flex justify-content-evenly">
        <h3>Search using Currency Name</h3>
        <input type="text" className="m-2" style={{}} onChange={onChangeHandler}></input>
        <i style={{ "font-size": "2rem", "color": "cornflowerblue" }} class="bi bi-search"></i>
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
          {displayData.map((element, index) => {
            return <tr key={index}>
              <td>{element.rank}</td>
              <td>{element.name}</td>
              <td> {element.symbol}</td>
              <td> <img src={element.logo_url} alt={element.symbol} style={{ width: 20, height: 20 }} ></img></td>
              <td>{element.market_cap}</td>
              <td>
                {element.showViewButton ?
                  <button className="button btn-primary" onClick={()=>{viewHandle(element)}} >view</button>
                  :
                  <button className="button btn-info" onClick={() => { addHandle(element) }} > add </button>
                }
              </td>
              <td>{element.price}</td>
            </tr>
          })}
        </tbody>
      </Table>

      <div className="d-flex align-items-center">
        <div className="d-flex col-4 justify-content-evenly align-items-center ">
          {/* <h6 className="">Number of Entries per page </h6> */}
          {(pagination * pageIndex) - (pagination) + 1}-{pagination * pageIndex} of {data.length}
          {/* <input type="number" className="w-50 m-3 p-2"></input> */}
        </div>

        <div className="col-8 d-flex justify-content-evenly">
          <i onClick={() => setPageIndex(pageIndex - 1)} style={{ "font-size": "2rem", "color": "cornflowerblue" }} class="bi bi-arrow-left-square"></i>
          <p style={{ "font-size": "2rem", "color": "cornflowerblue" }}> {pageIndex} </p> 
          <i onClick={() => { setPageIndex(pageIndex + 1) }} style={{ "font-size": "2rem", "color": "cornflowerblue" }} class="bi bi-arrow-right-square"></i>
        </div>

      </div>

    </div>
  )
}

export default CryptocurrencyTable
