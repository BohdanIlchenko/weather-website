import request from "request"

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9b2d314ac6b49b2e5f575fd99d9368a6&query="+lat+","+long
    request({url, json:true}, (error, {body})=> {
        if (error) {
            callback('Unable to connect weather api!', undefined)
        } else if(body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degreas out. Tere is a ' + body.current.precip + '% chance of rain');
        }
    })
}

export default forecast

