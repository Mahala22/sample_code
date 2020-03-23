import React from 'react';
import "./Searchbar.css";


const searchbar = (props) =>{

    return <div className="Searchbar">
        <input onChange={event => props.changetext(event)} placeholder=" search..."></input>
        </div>;
    

}
export default searchbar;