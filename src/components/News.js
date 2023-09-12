import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';




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
    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Newsapp`
    }
    async componentDidMount() {
        this.updateNews();
    }
    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(50);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false, })
        this.props.setProgress(100);
    }

    handlePrevPage = async () => {
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }
    handleNextPage = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize))) {
            this.setState({
                page: this.state.page + 1
            })
            this.updateNews();
        }
    }
    render() {

        return (
            <div className='container' style={{marginTop: "100px"}}>
                <h1 className='text-center my-3' >Newapp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
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
