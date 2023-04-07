import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useGetTasksQuery } from "../../main/apiSlice";
import DraggableDialog from "../tasks/viewTask";
import { setBounds } from "../../main/mapSlice";
import { useDispatch } from "react-redux";


const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            // console.log("User at: ", userLocation)
        })
    } else {
        // console.log("Broswer has no geolocation :(")
    }

}



export const MapContainer = () => {
    const [open, setOpen] = React.useState(false)
    const [selectedTask, setSelectedTask] = React.useState({})
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: "AIzaSyBWdAmavWXVzoZlEhuGBlyek4EfhS7i78A" })
    const { data: tasks = [] } = useGetTasksQuery()
    const markers = tasks.map(task => ({ lat: task.latitude, lng: task.longitude }))

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);
    const userLocation = getUserLocation()

    const dispatch = useDispatch()

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

    const onMarkerClick = (index) => {
        setSelectedTask(tasks[index])
        setOpen(true)
    }


    const onBoundsChanged = useCallback(() => {
        if (!mapRef.current) return;
        const bounds = mapRef.current.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        dispatch(setBounds({
            minLat: sw.lat(),
            maxLat: ne.lat(),
            minLng: sw.lng(),
            maxLng: ne.lng(),
        }))

    }, [mapRef, dispatch]);

    if (!isLoaded) return <div>Loading...</div>
    return (<div>
        <GoogleMap
            onLoad={onMapLoad}
            options={options}
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
            onClick={addMarker}
            onBoundsChanged={onBoundsChanged}
        >
            {markers.map((marker, index) => (<Marker key={index} position={marker} onClick={() => onMarkerClick(index)} />))}
            {userLocation ? <Marker icon={{
                fillColor: `#4285F4`,
                fillOpacity: 1,
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeColor: `rgb(255,255,255)`,
                strokeWeight: 2,
            }} /> : ""}
        </GoogleMap>
        <DraggableDialog task={selectedTask} open={open} setOpen={setOpen} />
    </div>)

}