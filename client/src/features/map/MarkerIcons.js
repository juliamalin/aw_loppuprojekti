import { CircleImage } from "../images/CircleImage"
import MapIconCarrot from "./MapIcons/MapIconCarrot.png"
import MapIconCarrotColor1 from "./MapIcons/MapIconCarrotColor1.png"
import MapIconCarrotColor2 from "./MapIcons/MapIconCarrotColor2.png"
import MapIconCarrotColor3 from "./MapIcons/MapIconCarrotColor3.png"
import MapIconCarrotColor4 from "./MapIcons/MapIconCarrotColor4.png"
import MapIconRabbit1 from "./MapIcons/MapIconRabbitBlue.png"





export const MarkerIcons = {
    default: MapIconCarrot,
    color1: MapIconCarrotColor1,
    color2: MapIconCarrotColor2,
    color3: MapIconCarrotColor3,
    color4: MapIconCarrotColor4,
    getRandom: () => {
        const items = [MapIconCarrotColor2, MapIconCarrotColor3, MapIconCarrotColor4]
        return items[Math.floor(Math.random() * items.length)]
    },
    rabbit1: MapIconRabbit1

}