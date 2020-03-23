import React from 'react'
import './Pagination.css'

const pagination = (props) => {

    const pagedisplay = []
    for (let i = 1; i<=Math.ceil(props.totalposts / props.postperpage); i++)
    {
        pagedisplay.push(i)
    }
    return (
        <div className="Pagination" >
            {pagedisplay.map(number => (
               <a href="!#" key={number} onClick={()=>props.pageNavigation(number)}>{number}</a>
            ))}
        </div>
        
    )
}

export default pagination