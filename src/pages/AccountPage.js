import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { getJSON } from "../modules/api";
import FavoritesComponent from '../components/FavoritesComponent';
import schoolsDump from "./../dump.json";
export default function AccountPage() {
const { getAccessTokenSilently, user } = useAuth0();
const [favorites, setFavorites]= useState([]);
useEffect(() => {
    const loadFavorites = async () => {
        const token = await getAccessTokenSilently();
        const responseData = await getJSON("/favorites", token);
        // eslint-disable-next-line eqeqeq
        const schools = Object.keys(responseData).filter(id=> responseData[id]).map(id => schoolsDump.find(s => s.SchoolID == id));
        setFavorites(schools)
    };
    loadFavorites();
}, [getAccessTokenSilently]);  
    const surveyUrl = "https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_5yzKttmxBnHf5R4";
  return (
    <div className="container">
      <div className="jumbotron p-4">
        <h1 className="display-4">Qualified Charters</h1>

        <FavoritesComponent favorites={favorites}/>
      </div>
      
      {
          user && <div>
              <h3>Engagement Survey</h3>
              <a type="button" className="btn btn-primary" href={ surveyUrl + "?email=" + user.name || user.email} >Take Survey</a>
              </div>
      }
    </div>

  );
}
