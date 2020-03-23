import React, {Component} from 'react'
import axios from 'axios'
import User from '../component/User/User'
import Modal from '../component/UI/Modal/Modal'
import Pagination from '../component/Pagination/Pagination'
import Searchbar from '../component/Searchbar/Searchbar'



class UsersInfo extends Component{

    state = {
        posts: [],
        currentpage: 1,
        postsperpage: 4,
        showmodal: false,
        modaldata: {},
        currentposts: [],
        queryposts: []
    }
    
    componentWillMount(){
        this.getPageData();
      
    }
    
    getPageData = async () => {
        
        const page1Data = await axios.get('https://reqres.in/api/users?page=1%27');
        const page2Data = await axios.get('https://reqres.in/api/users?page=2%27');
        const posts = [...page1Data.data.data, ...page2Data.data.data];
        const indexOfLast = this.state.currentpage * this.state.postsperpage;
        const indexOfirst = indexOfLast - this.state.postsperpage;
        const currentposts = posts.slice(indexOfirst, indexOfLast)
        this.setState({ posts: posts, currentposts: currentposts, queryposts: currentposts});
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
            const filterdata = this.state.currentposts.filter(item => { 
            return item.first_name.toLowerCase().includes(event.target.value.toLowerCase());
            });
            this.setState({queryposts: filterdata});
        }
        else if(!event.target.value){
            this.setState({queryposts: this.state.currentposts});
        }
    }

    pageNavigation = (pageno) =>{
        const indexOfLast = this.state.currentpage * this.state.postsperpage;
        const indexOfirst = indexOfLast - this.state.postsperpage;
        const currentposts = this.state.posts.slice(indexOfirst, indexOfLast)
        this.setState({
                        currentpage: pageno,
                        currentposts: currentposts,
                        queryposts: currentposts
                        })
    }
    
    render(){
        let post = <div><h1>cant load the post</h1></div>
        // const indexOfLast = this.state.currentpage * this.state.postsperpage;
        // const indexOfirst = indexOfLast - this.state.postsperpage;
        // const currentposts = this.state.posts.slice(indexOfirst, indexOfLast)
        //this.setState({currentdata: [...currentposts]})
        if(this.state.posts)
            post = <User posts={this.state.queryposts} modalclicked={this.modalshowhandler}/>
        
                
        return<div>
                <Searchbar changetext={this.searchtexthandler}></Searchbar>
                <Modal show={this.state.showmodal} data={this.state.modaldata} modalcancel={this.modalcancelhandler}/>
                {post}
                <Pagination 
                    postperpage={this.state.postsperpage} 
                    totalposts={this.state.posts.length}
                    pageNavigation = {this.pageNavigation}
                    ></Pagination>
            </div> 
            
        
    }



}

export default UsersInfo