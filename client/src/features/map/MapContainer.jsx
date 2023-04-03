import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";







export const MapContainer = ({ selectedTask, setSelectedTask }) => {

    const [markers, setMarkers] = React.useState([])

    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }

    const center = useMemo(() => ({ lat: 60.19, lng: 24.94 }))

    const addMarker = (event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }
        setMarkers([...markers, newMarker])
    }


    return (
        <GoogleMap
            options={options}
            zoom={10}
            center={center}

        >
            {markers.map((marker, index) => (<Marker key={index} position={marker} />))}
        </GoogleMap>)

}