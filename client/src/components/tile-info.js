import { useContext } from 'react'
import { Label, Tag, Text } from "react-konva"
import { MapEventListenersContext } from "../providers/map"
import { useSelector } from "react-redux"


//types of tiles text
const TileTypes = [
    {
        id: 0,
        text: "Ziemia"
    },
    {
        id: 1,
        text: "Piasek"
    },
    {
        id: 2,
        text: "Woda"
    },
]

const BuildingTypes = [
    {
        id: 1,
        text: "Droga"
    },
    {
        id: 2,
        text: "Tor"
    }
]


const getType = (typeNumber, typeArray) => {
    let tileType = typeArray.filter(t => t.id === typeNumber)
    if (tileType[0]) {
        return tileType[0].text
    }
    return ''

}

const TileInfo = ({ mousePos, tile, buildings }) => {

    const EventListeners = useContext(MapEventListenersContext)

    const building = () => {
        if (EventListeners.buildings) {
            let result = buildings.filter(building => {
                if ((building.x <= mousePos.x && mousePos.x <= building.x + 20) && (building.y <= mousePos.y && mousePos.y <= building.y + 20)) {
                    return building            
                }
            })
            if(result.length) return getType(result[0].t, BuildingTypes)
            else return ''
        }
        else return ''
    }
    return (
        <Label x={mousePos.x} y={mousePos.y} listening={false}>
            <Tag
                fill='white'
                pointerWidth={10}
                pointerHeight={10}
                pointerDirection="down"
            />
            <Text
                text={
                    getType(tile.type, TileTypes) + building()
                }
            />
        </Label>
    )
}

export default TileInfo