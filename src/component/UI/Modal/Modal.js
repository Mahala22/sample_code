import React from 'react'
import Backdrop from "../Backdrop/Backdrop"
import "./Modal.css"

const modal = (props) =>{

    return(
        <div>
            <Backdrop show={props.show} clicked={props.modalcancel}/>
            <div className="Modal"
                style={{
                        transform: props.show ? 'translateZ(0)' : 'translateZ(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                <img src={props.data.avatar} alt="avatar"></img>
                <h4>profile ID</h4>
                <p>{props.data.id}</p>
                <h4>Full Name</h4>
                <p>{props.data.first_name} {props.data.last_name}</p>
                <h4>EMAIL ID</h4>
                <p>{props.data.email}</p>
            </div>
        </div>
        )
}
 
export default modal