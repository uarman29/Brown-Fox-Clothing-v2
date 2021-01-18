import React from 'react';
import { withRouter} from 'react-router-dom';

import './ItemCardComponent.css';

const ItemCardComponent = (props) =>{
    return(
        <div className="item-card">
            <div 
                onClick={() => props.history.push(`${props.match.url}/${props.item.id}`)}
                className="image"
                style={{backgroundImage: `url(${props.item.imageUrl})`}}
            />
            <div className="item-footer">
                <div 
                    onClick={() => props.history.push(`${props.match.url}/${props.item.id}`)} 
                    className="name"
                    style={{cursor:'pointer'}}
                >
                    {props.item.name}
                </div>
                <div className="price">${props.item.price}</div>
            </div>
        </div>
    );
};

export default withRouter(ItemCardComponent);