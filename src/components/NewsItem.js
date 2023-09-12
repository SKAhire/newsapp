import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div>
                <div className="card" style={{height: "475px"}}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "50%", zIndex: 1}}>
    {source}
  </span>
                    <img src={imageUrl?imageUrl:"https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2023/09/0/0/Untitled-design-1039.png?ve=1&tl=1"} style={{height : "200px"}} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">
                            {description}...
                        </p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unkown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark">
                            Read More
                        </a>
                    </div>
                </div>

            </div>
        )
    }
}
