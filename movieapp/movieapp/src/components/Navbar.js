import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class Navbar extends Component {
  render() {
    return (
      <div style={{display : 'flex' , alignItems:'center'}}>
        {/* <h1>Movies App</h1>
        <h2 style={{marginLeft:"2rem" , marginTop :'0.7rem'}}>Favourites</h2> */}
        <Link to='/'> <h1>Movies App</h1> </Link>
        <Link to='favourites'><h2 style={{marginLeft:"2rem" , marginTop :'0.7rem'}}>Favourites</h2></Link>
      </div>
    )
  }
}

export default Navbar