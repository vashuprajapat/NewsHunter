import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    category: 'general',
    country: 'in',
    pageSize: 30,
    apiKey: process.env.REACT_APP_NEWS_API
  }

  static propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsHunter - ${this.capitalizeFirstLowercaseRest(this.props.category)}`;
  }
  updateNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(50);
    console.log(parsedData)
    this.setState({ loading: false, articles: parsedData.articles, totalResults: parsedData.totalResults })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews()
  }

  capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults })
  };

  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: "30px" }}>NewsHunter - Top {this.capitalizeFirstLowercaseRest(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2022/07/covid-9-1658379777.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>

    )
  }
}
