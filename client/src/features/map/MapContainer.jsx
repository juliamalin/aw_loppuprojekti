import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useGetTasksQuery } from "../../main/apiSlice";
import DraggableDialog from "../tasks/viewTask";
import { setBounds } from "../../main/mapSlice";
import { useDispatch } from "react-redux";
import { MarkerIcons } from "./MarkerIcons";
const libraries = ["places"]

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
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBWdAmavWXVzoZlEhuGBlyek4EfhS7i78A",
        libraries: libraries,
    })

    const [selectedPlace, setSelectedPlace] = React.useState(null)
    const autoCompleteRef = useRef(null);



    const { data: tasks = [] } = useGetTasksQuery()
    const markers = tasks.map(task => ({ lat: task.latitude, lng: task.longitude }))

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);
    const userLocation = getUserLocation()
    const center = useMemo(() => selectedPlace
        ? { lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }
        : userLocation || { lat: 60.19, lng: 24.94 },
        [selectedPlace, userLocation]);


    const dispatch = useDispatch()

    const options = {
        disableDefaultUI: true,
        zoomControl: true
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




    const onPlaceSelect = useCallback((place) => {
        setSelectedPlace(place);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        mapRef.current.panTo({ lat, lng });
    }, []);

    if (!isLoaded) return <div>Loading...</div>
    return (<div>
        <div className="row d-flex">
            <div className="col">
                <Autocomplete
                    onLoad={(autoComplete) => autoCompleteRef.current = autoComplete}
                    onPlaceChanged={() => onPlaceSelect(autoCompleteRef.current.getPlace())}
                >
                    <input
                        type="text"
                        placeholder="Enter an address"
                    />
                </Autocomplete>
            </div>
        </div>
        <GoogleMap
            onLoad={onMapLoad}
            options={options}
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
            onBoundsChanged={onBoundsChanged}
        >
            {markers.map((marker, index) => (<Marker key={index} position={marker} onClick={() => onMarkerClick(index)} icon={MarkerIcons.color3} />))}
        </GoogleMap>
        <DraggableDialog task={selectedTask} open={open} setOpen={setOpen} />
    </div>)

}