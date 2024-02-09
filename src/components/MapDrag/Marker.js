import { Marker } from "react-simple-maps";

const data = [
    { lat: 51.5074, lng: 0.1278, info: "Info 1" },
    { lat: 51.5075, lng: 0.1279, info: "Info 2" },
    // Ajoutez autant d'objets que nécessaire
   ];
   

const Markers = ({ data }) => (
 <>
    {data.map((item, i) => (
      <Marker key={i} coordinates={[item.lng, item.lat]}>
        <div>{item.info}</div>
      </Marker>
    ))}
 </>
);
