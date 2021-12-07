import React from "react";
import { Link } from "react-router-dom";

import { isArrayNull, handleNullObj } from "../lib/helpers";
import './HotelItem.css'

const HotelItem = ({ hotel }) => {
    // const { id, name, optimizedThumbUrls, starRating, address, landmarks, guestReviews,
    //     ratePlan, neighbourhood } = handleNullObj(hotel)
    const { name, optimizedThumbUrls, address, landmarks, neighbourhood, guestReviews,
        ratePlan, } = handleNullObj(hotel)

    const { srpDesktop } = handleNullObj(optimizedThumbUrls)
    const { streetAddress, locality, countryName } = handleNullObj(address)
    const { rating, badgeText } = handleNullObj(guestReviews)

    const { price } = handleNullObj(ratePlan)
    const { old, current, info, summary, totalPricePerStay } = handleNullObj(price)

    const totalPrice = totalPricePerStay ? totalPricePerStay.split(/[<>()]/) : [] //split 정규표현식

    console.log(totalPrice)
    return (
        <div className='HotelItem-container'>
            {/* 호텔 썸네일 */}
            <Link className='HotelItem-thumbnail' to='/hotelInfo'>
                <img className='HotelItem-thumbnail-img' src={srpDesktop} alt={name} />
            </Link>
            {/* 호텔 정보 */}
            <div className='HotelItem-info'>
                <div className='HotelItem-name'>{name}<span>{StaticRange}성급</span></div>
                <div className='HotelItem-address'>{streetAddress}, {locality}, {countryName}</div>
                <div className='HotelItem-neighbourhood'>{neighbourhood}</div>

                <div className='HotelItem-landmarks'>
                    {!isArrayNull(landmarks) && landmarks.map((landmark, index) => {
                        return <div key={index}> * {landmark.label}까지 {landmark.distance}
                        </div>
                    })}
                </div>
                <div className='HotelItem-rating'>
                    <div className='HotelItem-rating-badge'>{rating}</div>
                    <div className='HotelItem-rating-badgeText'>{badgeText}</div>
                </div>
            </div>
            <div className='HotelItem-price'>
                <div className='HotelItem-price-per-oneday'>
                    <span>{old}</span> {current}
                </div>
                <div className='HotelItem-price-per-oneday-title'>{info}</div>
                <div className='HotelItem-price-total'>
                    {totalPrice[1]} {totalPrice[3]}
                </div>
                <div className='HotelItem-price-summary'>{summary}</div>
            </div>


        </div>
    )
}

export default HotelItem;