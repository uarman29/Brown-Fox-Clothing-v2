import React from 'react';
import { withRouter } from 'react-router-dom';

import './CategoryCardComponent.css';

const CategoryCardComponent = (props) =>{
    return(
        <div className="menu-item" onClick={() => props.history.push(`/${props.item.id}`)}>
            <div className="background-image" style={{backgroundImage: `url(${props.item.imageUrl})`}}></div>
            <div className="content">
                <h1 className="title">{props.item.id.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    );
}

export default withRouter(CategoryCardComponent);