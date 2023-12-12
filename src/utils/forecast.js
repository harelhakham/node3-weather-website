const request = require('request')

const forecast = (addressLat ,addressLong , callback) => {
    const url ='http://api.weatherstack.com/current?access_key=6c7e99ffa6025ad98a7773a8b19ebfa2&query='+addressLat+','+addressLong
    request({ url, json: true},(error,{body}) => {
        if(error){
            callback('general error' , undefined) 
        }else if (body.error ){
            callback('general2 error' , undefined)
        }else{
            const placeInfo = {
                temp :  body.current.temperature,
                feels : body.current.feelslike
            }
            callback(undefined,placeInfo)
        }
    })
}
module.exports = forecast