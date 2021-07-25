import React, {useContext, useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import styled from "styled-components/native";
import SafeArea from "../components/SafeArea";
import SearchBar from "../components/SearchBar";
import {LocationContext} from "../services/Location/context";
import {RestaurantsContext} from "../services/restaurant/context";
import RestaurantInfoMapPreview from "../components/RestaurantInfoMapPreview";
import RestaurantDetail from "./RestaurantDetail";

const StyledMapView = styled(MapView)`
  height: 100%;
  width: 100%;
  
`
const Map = ({navigation}) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (<SafeArea>
    <SearchBar/>
    <StyledMapView region={{
      latitude: lat,
      longitude: lng,
      latitudeDelta: latDelta,
      longitudeDelta: 0.02,
    }}>
      {restaurants.map((restaurant) => {
        return (
          <MapView.Marker
            key={restaurant.name}
            title={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
          >
            <MapView.Callout onPress={() => navigation.navigate('RestaurantDetail', {restaurant: restaurant})}>
              <RestaurantInfoMapPreview restaurant={restaurant}/>
            </MapView.Callout>
          </MapView.Marker>)
      })}
    </StyledMapView>
  </SafeArea>)
}


export default Map;