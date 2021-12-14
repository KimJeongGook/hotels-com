import React from "react";
import './Caption.css'

const Caption = ({ id, destinationId, caption, setCaption, highlight }) => {
    return (
        <div className={`Caption-container ${highlight === id ? 'highlight' : ''}`}
            id={id}
            data-destinationid={destinationId}
            onClick={setCaption}
            dangerouslySetInnerHTML={{ __html: caption }}></div>
    )
}
export default Caption;

Caption.defaultProps = {
    highlight: 0
}