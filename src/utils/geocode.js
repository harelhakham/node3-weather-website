const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoiaGFyZWxoYWtoYW0iLCJhIjoiY2xwOXk4amphMDF6eDJqbHN1YnJxaTBsdCJ9.sRUgwsbFXm-0XUgOh4tzWw'
    request({ url, json: true},(error,{body}) => {
        if(error){
            callback('general error' , undefined) 
        }else if(body.features.length === 0) {
            callback('data send error' , undefined)
        }else{
            const dataLocation = {
                lat: body.features[0].center[0],
                long: body.features[0].center[1],
                namePlace: body.features[0].place_name
            }
            callback(undefined,dataLocation)
        }
    })
}

module.exports = geocode