import React from "react";
import { isArrayNull } from "../lib/helpers";
import { AccordionItem } from "components";
import './Accordion.css'

const Accordion = ({ title, items, displayFilter, querystring, searchHotelWithFilter }) => {
    return (
        <div className="Accordion-container">
            <div className="Accordion-menu" onClick={displayFilter}>
                <div className="Accordion-arrow"></div>
                <div className="Accordion-title">{title}</div>
            </div>
            <div className="Accordion-items">
                {!isArrayNull(items) && items.map(item => {
                    return (
                        <AccordionItem key={item.value} value={item.value}
                            querystring={querystring}
                            searchHotelWithFilter={searchHotelWithFilter}>
                            {item.label}
                        </AccordionItem>
                    )
                })}
            </div>
        </div>
    )
}
export default Accordion;