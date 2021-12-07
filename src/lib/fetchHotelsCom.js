const fetchHotelsCom = async(url)=>{
    try{
        return await fetch(url, {
            "method":"GET",
            "headers": {
                "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
                "x-rapidapi-key": "26fb175c66msh4ef16cba57a9a16p1df633jsnb7dfe2a4b6c7"
            }
        }).then(res => res.json())
    } catch(e){
        return e
    }
}
export default fetchHotelsCom;
