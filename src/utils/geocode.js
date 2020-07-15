import request from "request"


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1IjoiYm9oZGFuaWxjaGVua28iLCJhIjoiY2tjZWViMG81MDBpazJ3bG1wenlidTN0aiJ9.T3YacmehhRT400Upxcvp3w"
    request({url, json: true}, function (error, {body}) {
        if (error) {
            callback('Unable to connect geocoding api!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

export default geocode
