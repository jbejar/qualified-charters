import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function GoogleReviews({placeId}) {
    const [place, setPlace] = useState({});
    useEffect(() => {
        
        if(!window.placeService) {
            window.placeService = new window.google.maps.places.PlacesService(window.map);
        }
        window.placeService.getDetails({placeId},
            (place, status) => {
                console.log(placeId);
                console.log(status);
                console.log(place);
                setPlace(place);
            }
        )
        
        
    },[placeId]);
    return (
        <div>
            
        </div>
    )
}

GoogleReviews.propTypes = {
    placeId: PropTypes.string.isRequired,
}

export default GoogleReviews

