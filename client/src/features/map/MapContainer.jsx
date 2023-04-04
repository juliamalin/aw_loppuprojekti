import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useGetTasksQuery } from "../../main/apiSlice";



const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            console.log("User at: ", userLocation)
        })
    } else {
        console.log("Broswer has no geolocation :(")
    }

}



export const MapContainer = () => {
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: "AIzaSyBWdAmavWXVzoZlEhuGBlyek4EfhS7i78A" })
    const { data: tasks = [] } = useGetTasksQuery()
    const markers = tasks.map(task => ({ lat: task.latitude, lng: task.longitude }))

    console.log(tasks.map(task => ({ lat: task.lat, lng: task.lng })))
    console.log(tasks)
    const userLocation = getUserLocation()


    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }

    const center = useMemo(() => userLocation || { lat: 60.19, lng: 24.94 })

    const addMarker = (event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        }
        //setMarkers([...markers, newMarker])
    }



    if (!isLoaded) return <div>Loading...</div>
    return (<div>
        <GoogleMap
            options={options}
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
            onClick={addMarker}
        >
            {markers.map((marker, index) => (<Marker key={index} position={marker} />))}
            {userLocation ? <Marker icon={{
                fillColor: `#4285F4`,
                fillOpacity: 1,
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeColor: `rgb(255,255,255)`,
                strokeWeight: 2,
            }} /> : ""}
        </GoogleMap>

    </div>)

}