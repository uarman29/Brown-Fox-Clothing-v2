import React from 'react';

import './ItemCardComponent.css';

const ItemCardComponent = (props) =>{
    return(
        <div className="item-card">
            <div 
                className="image"
                style={{backgroundImage: `url(${props.item.imageUrl})`}}
            />
            <div className="item-footer">
                <div className="name">{props.item.name}</div>
                <div className="price">${props.item.price}</div>
            </div>
        </div>
    );
};

export default ItemCardComponent;