import React from 'react'
import './User.css';


const user = (props) => {

    console.log(props)
    return <div className="User">
        <table className="table1">
            {props.posts.map(post => <tr key={post.id} className="tableRow" onClick={() => props.modalclicked(post.id)}>
                                        <th className="tableHeader"><img src={post.avatar}  alt="avatar" ></img></th>
                                        <td className="tableData1"><b>{post.first_name}</b></td>
                                     </tr>)}
        </table>
    </div>

}

export default user