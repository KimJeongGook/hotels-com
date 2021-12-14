import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { fetchHotelsCom, isArrayNull, handleNullObj } from 'lib';
import hotelsData from '../hotelsData';
import { HotelItem, Accordion, Button } from "components";

import './Hotels.css'

const Hotels = () => {
    let query = {} // hotels.com 서버로 전달될 URL
    const location = useLocation()
    const { destinationId, checkIn, checkOut, adultsNumber } = location.state || {}
    console.log(destinationId, checkIn, checkOut, adultsNumber)

    const BASE_URL = `https://hotels-com-provider.p.rapidapi.com/v1/hotels/search?checkin_date=${checkIn}&checkout_date=${checkOut}&sort_order=STAR_RATING_HIGHEST_FIRST&destination_id=${destinationId}&adults_number=${adultsNumber}&locale=ko_KR&currency=KRW`

    const [hotels, setHotels] = useState([])
    const [mapObj, setMapObj] = useState(null) // 지도 객체를 저장할 state 값
    const [filters, setFilters] = useState(null) // 필터 카테고리와 필터 목록 화면 보여주기
    const [queryURL, setQueryURL] = useState(null)

    useEffect(async () => {
        // const hotelsList = await getHotels()
        const { results, filters } = await getHotels(BASE_URL)
        console.log(results)
        setHotels(results)
        setFilters(filters)

        const m = L.map('map')
        setMapObj(m)
        // displayLocation()
    }, [])
    // 사용자가 호텔 검색 버튼 클릭할때 마다 queryURL
    useEffect(async () => {
        let url = BASE_URL
        console.log(queryURL)

        // queryURL[prop] : [23,30,2]; 필터 조건들이 포함된 배열
        for (let prop in queryURL) {
            const queryvalue = encodeURIComponent(queryURL[prop].join(','))
            url += `&${prop}=${queryvalue}`
            console.log(prop, queryvalue)
        }
        console.log(`total url: `, url)
        const { results } = await getHotels(url)
        setHotels(results)

    }, [queryURL])

    const getHotels = async (url) => {
        const data = await fetchHotelsCom(url)
        console.log(data)
        const { searchResults: { results }, filters } = data
        // const { searchResults: { results }, filters } = hotelsData
        console.log(results)

        return { results, filters };
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
    const displayFilter = (e) => {
        console.log('displyFilter list...')
        const target = e.target.closest(`.Accordion-container`)// 필터 카테고리 요소
        console.log(target)
        const arrow = target.querySelector(`.Accordion-arrow`)// 화살표
        const items = target.querySelector(`.Accordion-items`)// 필터 목록

        arrow.classList.toggle(`change-arrow`)// 화살표 아이콘 변경
        items.classList.toggle(`expand-filter`)// 필터 목록 열고 닫기
    }
    //사용자가 필터 클릭하는 부분
    // query[querystring] : [30,2,13,4] => 30 => 게스트하우스 2: 호텔
    const searchHotelWithFilter = (querystring, value) => {
        console.log(`search with filter`, querystring, value)
        query = { ...query, [querystring]: [...query[querystring] ?? [], value] }
        console.log('query in filter function: ', query)
    }
    const searchHotels = () => {
        setQueryURL(query)
        console.log(`search`)
    }

    const AccordionList = () => {
        console.log('filters', filters)
        if (filters) {
            const { neighbourhood, landmarks, accommodationType, facilities,
                themesAndTypes, accessibility } = handleNullObj(filters)
            const filterTypes = [
                { items: handleNullObj(neighbourhood).items, title: '위치 및 주변 지역', querystring: `landmark_id` },
                { items: handleNullObj(landmarks).items, title: '랜드마크', querystring: `landmark_id` },
                { items: handleNullObj(accommodationType).items, title: '숙박 시설 유형', querystring: `accommodation_ids` },
                { items: handleNullObj(facilities).items, title: '시설', querystring: `amenity_ids` },
                { items: handleNullObj(themesAndTypes).items, title: '테마/유형', querystring: `theme_ids` },
                { items: handleNullObj(accessibility).items, title: '장애인 편의 시설', querystring: `amenity_ids` },
            ]
            return (
                <div>{filterTypes.map((filterType, id) => {
                    return (
                        <Accordion key={id}
                            title={filterType.title}
                            items={filterType.items}
                            displayFilter={displayFilter}
                            querystring={filterType.querystring}
                            searchHotelWithFilter={searchHotelWithFilter}
                        />
                    )
                })} </div>
            )
        } else {
            return <></>
        }

    }
    const getLocation = (hotel) => {
        const { name, coordinate, address } = handleNullObj(hotel)
        const { streeAddress, locality, countryName } = handleNullObj(address)
        const { lat, lon } = handleNullObj(coordinate)
        const msg = `${name}<br/>${streeAddress}, ${locality}, ${countryName}`
        return { lat, lon, msg };
    }
    return (
        <div className='Hotels-container'>
            <div className="Hotels-filtered">
                <AccordionList />
                <Button handleClick={searchHotels}>필터로 호텔 검색</Button>
            </div>
            <div className="Hotels-searched">
                <div id="map"></div>
                {!isArrayNull(hotels) && hotels.map(hotel => {
                    const { lat, lon, msg } = getLocation(hotel)
                    displayLocation(lat, lon, msg)
                    // console.log(hotel)
                    return (
                        <HotelItem hotel={hotel} key={hotel.id} />
                    )
                })}
            </div>
        </div>
    )
}

export default Hotels;