import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
      constructor(){
        super();
        this.state={
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
      }

      async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6f72553445ec41efbf2f56eb9a041557&pageSize=${this.props.pageSize}&page=1`
        this.setState({loading:true})
        let data= await fetch(url)
        let parsedData= await data.json()
        console.log(parsedData)
        this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading: false})
      }
      
      handelPrevClick=async ()=>{
          console.log("previous")
          let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6f72553445ec41efbf2f56eb9a041557&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`
          this.setState({loading:true})
          let data= await fetch(url);
          let parsedData= await data.json()
          console.log(parsedData)
          this.setState({page: this.state.page - 1,
            articles:parsedData.articles,
            loading: false})
          }
          
          handelNextClick= async ()=>{
            console.log("Next")
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6f72553445ec41efbf2f56eb9a041557&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
            this.setState({loading:true})
            let data= await fetch(url);
            let parsedData= await data.json()
            console.log(parsedData)
            this.setState({page: this.state.page + 1, articles:parsedData.articles, loading: false})
      }

  render() {
    return (
      
      <div className="container my-3">
        <h1 className='text-center'>NewsHunter - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,60):""} description={element.description?element.description.slice(0,100):""} imageUrl={element.urlToImage?element.urlToImage:"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2022/07/covid-9-1658379777.jpg"} newsUrl={element.url}/>   
            </div>
            })}
        </div>

        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" onClick={this.handelPrevClick} className="btn btn-primary">&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handelNextClick} className="btn btn-primary">Next &rarr;</button>
        </div>
      </div>
    )
  }
}
