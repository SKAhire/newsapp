import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imageUrl?imageUrl:"https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2023/09/0/0/Untitled-design-1039.png?ve=1&tl=1"} style={{height : "220px"}} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">
                            {description}...
                        </p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark">
                            Read More
                        </a>
                    </div>
                </div>

            </div>
        )
    }
}
