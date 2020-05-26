import React, {Component} from 'react'
import axios from 'axios'
import User from '../component/User/User'
import Modal from '../component/UI/Modal/Modal'
//import Pagination from '../component/Pagination/Pagination'
import Searchbar from '../component/Searchbar/Searchbar'
import SearchModel from '../component/SearchModel/SearchModel'
import Paginate from 'react-paginate'
import './UsersInfo.css'


class UsersInfo extends Component{

    state = {
        posts: [],
        currentpage: 1,
        postsperpage: 4,
        showmodal: false,
        modaldata: {},
        queryposts: []
    }
    
    componentWillMount(){
        this.getPageData();
      
    }
    
    getPageData = async () => {
        
        const page1Data = await axios.get('https://reqres.in/api/users?page=1%27');
        const page2Data = await axios.get('https://reqres.in/api/users?page=2%27');
        const posts = [...page1Data.data.data, ...page2Data.data.data];
        this.setState({ posts: posts});
    }

    modalcancelhandler = () => {
        this.setState({showmodal: false})
    }

    modalshowhandler = (index) =>{
        const newmodaldata = this.state.posts;
        let setmodaldata = {}
        var i;
        for( i=0; i<newmodaldata.length; i++){
            if(newmodaldata[i].id === index)
                setmodaldata = {...newmodaldata[i]}
        }
        this.setState({showmodal: true,
                        modaldata: {...setmodaldata} })
    }
    searchtexthandler = (event) => {
        
        if(event.target.value){
            const filterdata = this.state.posts.filter(item => { 
            return item.first_name.toLowerCase().includes(event.target.value.toLowerCase());
            });
            this.setState({queryposts: filterdata});
        }
        else if(!event.target.value){
            this.setState({queryposts: []});
        }
    }

    pageNavigation = (pageno) =>{
        this.setState({currentpage: pageno.selected + 1})
    }

    // handlePageClick = (data) =>{
    //     console.log(data.selected)
    // }
    
    render(){
        const indexOfLast = this.state.currentpage * this.state.postsperpage;
        const indexOfirst = indexOfLast - this.state.postsperpage;
        const currentposts = this.state.posts.slice(indexOfirst, indexOfLast)
        let post = <div><h1>cant load the post</h1></div>
        let query = null
        if(this.state.posts)
            post = <User posts={currentposts} modalclicked={this.modalshowhandler}/>
        if(this.state.queryposts.length !== 0)
            query = <SearchModel searchdata={this.state.queryposts}></SearchModel>
            
                
        return<div>
                <Searchbar changetext={this.searchtexthandler}></Searchbar>
                {query}
                <Modal show={this.state.showmodal} data={this.state.modaldata} modalcancel={this.modalcancelhandler}/>
                {post}
                {/*<Pagination 
                    postperpage={this.state.postsperpage} 
                    totalposts={this.state.posts.length}
                    pageNavigation = {this.pageNavigation}
                ></Pagination>*/}
                <Paginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(this.state.posts.length / this.state.postsperpage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    onPageChange={this.pageNavigation}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={"active"}
                    
                />
            </div> 
            
        
    }



}

export default UsersInfo