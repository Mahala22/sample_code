import React from 'react'
import './SearchModel.css'


const searchmodel = (props) => {
    return <div>
            <table className="searchmodel">
                {props.searchdata.map( data => <tr>
                <th>{data.first_name}</th>
                </tr>)}
            </table>
        </div>
    

}

export default searchmodel