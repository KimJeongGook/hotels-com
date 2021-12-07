import React, {useState} from "react";
import { Input, Caption, Button } from "components";
import { fetchHotelsCom, isArrayNull } from "lib";
import {useNavigate} from 'react-router-dom';
import queryData from '../queryData';

import './Search.css'

const Search =() =>{
    console.log(fetchHotelsCom, isArrayNull)
    const [destination, setDestination] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setcheckOut] = useState('')
    const [adultsNumber, setAdultsNumber] = useState(1)

    //자동완성 관련 상태값 정의
    const [captions, setCaptions] = useState([]) //자동완성 메뉴 목록
    const [open, setOpen] = useState('hide') // 자동완성 메뉴 온오프
    const [index, setIndex] = useState(0) // 키보드 입력시 자동완성 메뉴 하이라이트 변경
    const [destinationId, setDestinationId] = useState(0)

    const navigate = useNavigate()

    const handleChange=(e)=>{
        const {name, value} = e.target
        console.log(name, value)
        switch(name) {
            case 'destination':
                //자동완성 기능을 온오프 함
                value? setOpen('show') : setOpen('hide')
                executeAutoCaption(value)
                setDestination(value)
                break;
            case 'check-in':
                setCheckIn(value)
            case 'check-out':
                setcheckOut(value)
                break;
            case 'adults-number':
                setAdultsNumber(value)
                break;
        }
    }
    //자동완성 기능 구현
    const executeAutoCaption = async(query)=>{
        // const data = await getCaptions(query)
        const {suggestions} = queryData //가짜로 서버에서 가져오는 척
        const captionItems = [] 
        if(!isArrayNull(suggestions)){
            suggestions.map(suggestion=>{
                // console.log(suggestion)
                const{entities} = suggestion
                captionItems.push(...entities)
            })
        }
        // console.log('captions: ', captionItems)
        setCaptions(captionItems)
        setHighlight() // 사용자 검색에 따라 하이라이트 변경
    }
    const getCaptions = async(query) =>{
        console.log('get captions ...')
        // const data = await fetchHotelsCom(`https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?query=${query}&currency=KRW&locale=ko_KR`)
        // console.log(data)
        // return data
    }
    //현재 내가 입력하고 있는 문자열을 포함하는 자동완성 메뉴에 하이라이트 셋팅
    const setHighlight = () =>{
        captions.map((captionItem, id)=>{
            captionItem.caption.includes(destination) ? setIndex(id) : null
        })
    }
    const setCaption =(e) =>{
        console.log(e.target)
        const target = e.target.closest('.Caption-container')

        setDestination(target.innerText) //내가 클릭한 자동완성 메뉴의 캡션을 목적지 input 의 value 값을 설정
        setDestinationId(target.dataset.destinationid)
        setOpen('hide')
    }

    //자동완성 메뉴를 보여주는 컴포넌트 - Captions
    const Captions = ({captions})=>{
        let captionUI =null;
        if(!isArrayNull(captions)){
            captionUI = captions.map((captionItem, id)=>{
                console.log(captionItem)
                return <Caption key={captionItem.destinationId} 
                                id={id} 
                                destinationId={captionItem.destinationId} 
                                caption={captionItem.caption} 
                                setCaption={setCaption} 
                                highlight={index}></Caption>
            })
        }
        return <>{captionUI}</>
    }
    const changeCaptionHighlight =(e) =>{
        console.log(e.keyCode)
        const captionsLength = captions.length
        
        if(e.keyCode === 40){ // index 값 증가
            index < captionsLength -1 ? setIndex(index+1) : setIndex(0)
        }else if(e.keyCode === 30){
            index > 0 ? setIndex(index-1) : setIndex(captionsLength-1)
        }else if(e.keyCode === 13){
            const target = document.getElementById(index)
            console.log(target)

            setDestination(target.innerText)
            setDestinationId(target.dataset.destinationId)
            setOpen('hide')
        }
    }
    //버튼 클릭시
    const searchHotels = (e)=>{
        // 검색한 호텔 목록 페이지로 아래 데이터를 전달함
        console.log( destinationId, checkIn, checkOut, adultsNumber)
        navigate('./hotels', {state:{destinationId, checkIn, checkOut, adultsNumber}})
    }

    return (
        <div className='Search-container'>
            <div className='Search-inputs'>
                <div className='destination-container'>
                    <Input name='destination' type='text' placeholder='목적지를 입력하세요 ...' 
                        width='large' value={destination} onChange={handleChange}
                        onKeyUp={changeCaptionHighlight}/>
                    <div className={`captions ${open}`}>
                        {<Captions captions={captions}/>}</div>
                </div>

                <Input name='check-in' type='date' placeholder='체크인' width='small'
                    value={checkIn} onChange={handleChange}/>
                <Input name='check-out' type='date' placeholder='체크아웃' width='small'
                    value={checkOut} onChange={handleChange}/>
                <Input name='adults-number' type='number' placeholder='인원수' width='middle' 
                    min={1} max={7} value={adultsNumber} onChange={handleChange}/>
                
                <Button handleClick={searchHotels} color='blue' size='long'>검색</Button>
            </div>
        </div>
    )
}
export default Search;