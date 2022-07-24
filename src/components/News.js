import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [page, setPage] = useState(1)
const [totalResults, setTotalResults] = useState(0)
    // document.title = `NewsHunter - ${capitalizeFirstLowercaseRest(props.category)}`;

  let updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(50);
    console.log(parsedData)
    setLoading(false)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews()
  }, [])
  

  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  let fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    setArticles(articles.concat(parsedData.articles))
    // setTotalResults(parsedData.totalResults)
  };
  document.title = `NewsHunter - ${capitalizeFirstLowercaseRest(props.category)}`;

    return (
      <>
        <h1 className='text-center' style={{ margin: "30px", marginTop: "70px" }}>NewsHunter - Top {capitalizeFirstLowercaseRest(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/photos/abstract-digital-news-concept-picture-id1192070239"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>

    )
}
News.defaultProps = {
  category: 'general',
  country: 'in',
  pageSize: 30,
  apiKey: process.env.REACT_APP_NEWS_API
}

News.propTypes = {
  category: PropTypes.string,
  country: PropTypes.string,
  pageSize: PropTypes.number
}

export default News;
