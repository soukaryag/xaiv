const fetchNearestPlacesFromGoogle = (latitude, longitude, radiusKM, type) => {
    const radMetter = radiusKM * 1000;
    type = "restaurant"

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radMetter}&type=${type}&key=AIzaSyAjfUxS2_xG_8I0UyUCTBI87HD1bHIgQYw`

    return fetch(proxyurl + url)
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

            return places.slice(0, 19);
        })
        .catch(error => {
            console.log(error);
        });
}