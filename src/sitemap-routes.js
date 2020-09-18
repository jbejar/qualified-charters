import React from 'react';
import { Route } from 'react-router';
 
export default (
    <Route>
	<Route path="/about"/>
          <Route path="/schools/:schoolID" />
          <Route path="/qualified"/>
          <Route path="/meetings"/>
          <Route path="/transparency"/>
          <Route path="/reports"/>
          <Route path="/map"/>
          <Route path="/"/>
    </Route>
);