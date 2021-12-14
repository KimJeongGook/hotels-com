const fetchHotelsCom = async (url) => {
    try {
        return await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
                "x-rapidapi-key": "c0e5dc9886msh07c0181025701afp107b9bjsnfaa4bca1861c"
            }
        }).then(res => res.json())
    } catch (e) {
        return e
    }
}
export default fetchHotelsCom;
