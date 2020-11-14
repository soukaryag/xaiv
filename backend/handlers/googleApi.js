fetch = require("node-fetch");

async function fetchActivities(socket, latitude, longitude, radiusKM, type) {
    const radMetter = radiusKM * 1000;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radMetter}&type=${type}&key=AIzaSyAjfUxS2_xG_8I0UyUCTBI87HD1bHIgQYw`
    return fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            var places = []
            for (let googlePlace of res.results) {
                var place = {}
                var gallery = "";

                if (googlePlace.photos) {
                    for (let photo of googlePlace.photos) {
                        gallery = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAjfUxS2_xG_8I0UyUCTBI87HD1bHIgQYw`;
                        break;
                    }
                }

                place.activity_id = googlePlace.place_id
                place.activity_name = googlePlace.name
                place.activity_photo = gallery

                places.push(place);
            }

            //socket.emit("send_activities", places.slice(0, 10));
            return places;
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = { fetchActivities }