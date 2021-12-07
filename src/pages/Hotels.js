import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { fetchHotelsCom, isArrayNull, handleNullObj } from 'lib';
import hotelsData from '../hotelsData';
import { HotelItem } from "components";

import './Hotels.css'

const Hotels = () => {
    const location = useLocation()
    const { destinationId, checkIn, checkOut, adultsNumber } = location.state || {}
    console.log(destinationId, checkIn, checkOut, adultsNumber)

    const [hotels, setHotels] = useState([])
    const [mapObj, setMapObj] = useState(null) // 지도 객체를 저장할 state 값

    useEffect(async () => {
        const hotelsList = await getHotels()
        setHotels(hotelsList)

        const m = L.map('map')
        setMapObj(m)
        displayLocation()
    }, [])

    const getHotels = async () => {
        //https://rapidapi.com/hub
        //https://rapidapi.com/tipsters/api/hotels-com-provider/
        // const data = await fetchHotelsCom(`https://hotels-com-provider.p.rapidapi.com/v1/hotels/search?checkin_date=${checkIn}&checkout_date=${checkOut}&sort_order=STAR_RATING_HIGHEST_FIRST&destination_id=${destinationId}&adults_number=${adultsNumber}&locale=ko_KR&currency=KRW`)
        // console.log(data)

        const { searchResults: { results } } = hotelsData
        console.log(results)

        return results;
    }
    const displayLocation = (lat, lon, msg) => {
        console.log('지도 객체', mapObj)

        if (mapObj) {
            const map = mapObj.setView([lat, lon], 13)

            //지도의 배경화면
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map)

            //지도의 마커 추가하기
            L.marker([lat, lon]).addTo(map)
                .bindPopup(msg)
                .openPopup()
        }
    }
    return (
        <div className='Hotels-container'>
            <div id="map"></div>
            {!isArrayNull(hotels) && hotels.map(hotel => {
                const { name, coordinate, address } = handleNullObj(hotel)
                const { streeAddress, locality, countryName } = handleNullObj(address)
                const { lat, lon } = handleNullObj(coordinate)
                const msg = `${name}<br/>${streeAddress}, ${locality}, ${countryName}`
                displayLocation(lat, lon, msg)

                console.log(hotel)
                return (
                    <HotelItem hotel={hotel} key={hotel.id} />
                )
            })}
        </div>
    )
}

export default Hotels;