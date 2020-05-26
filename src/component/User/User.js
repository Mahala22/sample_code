import React from 'react'
import './User.css';


const user = (props) => {

    //console.log(props)
    return <div className="User">
        <table className="table1">
            <tr className="tableRow1">
            <th className="tableHeader1">USECASE ID</th>
            <th className="tableHeader2">USECASE NAME</th>
            </tr>
            {props.posts.map(post => <tr key={post.id} className="tableRow2" onClick={() => props.modalclicked(post.id)}>
                                        <td className="tableData1"><img src={post.avatar}  alt="avatar" ></img></td>
                                        <td className="tableData2">click here</td>
                                        {/* <td className="tableData1"><b>{post.first_name}</b></td> */}
                                     </tr>)}
        </table>
    </div>

}

export default user