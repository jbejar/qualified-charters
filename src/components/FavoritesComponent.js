import React from 'react'

import SchoolTable from './SchoolTable';
import PropTypes from 'prop-types'

function FavoritesComponent({favorites}) {
    
    return (
        <div>
            <h4>Favorites:</h4>
            <SchoolTable schools={favorites}/>
        </div>
    )
}

FavoritesComponent.propTypes = {
    favorites: PropTypes.array.isRequired,
}

export default FavoritesComponent

