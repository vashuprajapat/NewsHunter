import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {

  static defaultProps = {
    category: 'general',
    country: 'in',
    pageSize: 18
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
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title= `NewsHunter - ${this.capitalizeFirstLowercaseRest(this.props.category)}`;
  }
  updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=cef615925db34a31a3a15f10d941d970&pageSize=${this.props.pageSize}&page=${this.state.page}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ loading: false, articles: parsedData.articles, totalResults: parsedData.totalResults })
  }
  async componentDidMount() {
    this.updateNews()
  }

  handelPrevClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }

  handelNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  }

  capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{ margin: "30px" }}>NewsHunter - Top {this.capitalizeFirstLowercaseRest(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2022/07/covid-9-1658379777.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>

        <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handelPrevClick} className="btn btn-primary">&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handelNextClick} className="btn btn-primary">Next &rarr;</button>
        </div>
      </div>
    )
  }
}
