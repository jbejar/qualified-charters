import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { getJSON } from "../modules/api";
import Row from "react-bootstrap/Row";
import moment from "moment";
import FavoritesComponent from '../components/FavoritesComponent';
import schoolsDump from "./../dump.json";
export default function AccountPage() {
const { getAccessTokenSilently, isAuthenticated } = useAuth0();
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
    
  return (
    <div className="container">
      <div className="jumbotron p-4">
        <h1 className="display-4">Qualified Charters</h1>

        <FavoritesComponent favorites={favorites}/>
      </div>
      <h3>Engagement Survey</h3>
      <a type="button" class="btn btn-primary" href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_5yzKttmxBnHf5R4">Take Survey</a>
    </div>

  );
}
