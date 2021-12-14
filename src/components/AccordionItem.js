import React from "react";
import './AccordionItem.css'

const AccordionItem = ({ children, searchHotelWithFilter, querystring, value }) => {
    return (
        <div className="AccordionItem-container">
            <div className="AccordionItem-checker"
                onClick={() => searchHotelWithFilter(querystring, value)}>
                <input type='checkbox' /></div>
            <div className="AccordionItem-filter">{children}</div>
        </div>
    )
}
export default AccordionItem;