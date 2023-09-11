import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            
        }
    }
    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8a9d3b69974c4aaa9ffa3bfeb0fa6b15&pageSize=20';
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })
    }
    handlePrevPage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8a9d3b69974c4aaa9ffa3bfeb0fa6b15&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1,
        })
    }
    handleNextPage = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8a9d3b69974c4aaa9ffa3bfeb0fa6b15&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                articles: parseData.articles,
                page: this.state.page + 1,
            })
        }
    }
    render() {

        return (
            <div className='container my-3'>
                <h1>Newapp - Top Headings</h1>
                <div className="row" >
                    {this.state.articles.map((elements) => {
                        return <div className="col-md-3 my-2" key={elements.url}>
                            <NewsItem title={elements.title ? elements.title.slice(0, 40) : ""} description={elements.description ? elements.description.slice(0, 90) : ""} imageUrl={elements.urlToImage} newsUrl={elements.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevPage}>Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next</button>
                </div>
            </div>
        )
    }
}
