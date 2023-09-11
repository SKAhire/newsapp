import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export default class News extends Component {
    static defaultProps ={
        country : "in",
        pageSize : 8,
        category : "business"
    }
    static propTypes ={
        country : PropTypes.string,
        pageSize : PropTypes.number,
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a9d3b69974c4aaa9ffa3bfeb0fa6b15&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false, })
    }
    handlePrevPage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a9d3b69974c4aaa9ffa3bfeb0fa6b15&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1,
            loading: false,
        })
    }
    handleNextPage = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a9d3b69974c4aaa9ffa3bfeb0fa6b15&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                articles: parseData.articles,
                page: this.state.page + 1,
                loading: false,
            })
        }
    }
    render() {

        return (
            <div className='container my-3'>
                <h1 className='text-center my-3'>Newapp - Top Headings</h1>
                {this.state.loading && <Spinner />}
                <div className="row" >
                    {!this.state.loading && this.state.articles.map((elements) => {
                        return <div className="col-md-3 my-3" key={elements.url}>
                            <NewsItem title={elements.title ? elements.title.slice(0, 40) : ""} description={elements.description ? elements.description.slice(0, 90) : ""} imageUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevPage}>Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextPage}>Next</button>
                </div>
            </div>
        )
    }
}
