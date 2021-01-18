import React from 'react';
import { withRouter } from 'react-router-dom';

import './CategoryCardComponent.css';

const CategoryCardComponent = (props) =>{

    const computerUrl = () =>
    {
        if(props.match.url === "/")
            return `/${props.item.id}`;
        else
            return `${props.match.url}/${props.item.id}`;
    }

    return(
        <div className="menu-item" onClick={() => props.history.push(computerUrl())}>
            <div className="background-image" style={{backgroundImage: `url(${props.item.imageUrl})`}}></div>
            <div className="content">
                <h1 className="title">{props.item.id.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    );
}

export default withRouter(CategoryCardComponent);