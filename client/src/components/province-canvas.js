import { useState, useEffect, Suspense, lazy } from "react"
import { useCurrentTile, usePosition } from "../hooks"
import { Stage } from "react-konva"
import { WaitLayer, InfoLayer } from "."
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
const TileLayer = lazy(() => import("./tile-layer"))
const BuildingLayer = lazy(() => import("./building-layer"))

const useMap = (id) => {
    const [Fetched, setFetched] = useState(false)
    const dispatch = useDispatch()
    let [x, y] = id.split('.')
    useEffect(() => {
        axios.get(`http://localhost:8000/map/provinces/${id}`).then(res => {
            dispatch({ type: "GET_TILES", Tiles: setMap(res.data.provinces, x, y) })
            dispatch({ type: "GET_BUILDINGS", Buildings: setBuildingsToMap(res.data.buildings, x, y) })
            setFetched(true)
        })
    }, [])
    return Fetched
}

export const setBuildingsToMap = (buildings, x, y) => {
    let buildingsToRender = []
    buildings.forEach(building => {
        buildingsToRender.push({
            t: building.t,
            x: building.position.tile.x * 20 + (building.position.province.x - x + 1) * 16 * 20,
            y: building.position.tile.y * 20 + (building.position.province.y - y + 1) * 16 * 20,
        })
    })
    return buildingsToRender
}

/**
 * 
 * @param {React.WheelEvent} e 
 */
const zoomMap = e => {
    console.log(e)
}

/**
 * @param {{
 * position:{x:Number, y:Number}, 
 * t: Number,
 * c: Boolean,
 * }[][]} tiles 
 * @param {{x:Number, y:Number}} provincePosition
 */


//return list of tiles to render with position and type from one province
const setFromTiles = (tiles, provincePosition) => {
    let tilesToRender = []
    tiles.forEach(tilesRow => {
        tilesRow.forEach(tile => {
            tilesToRender.push({
                t: tile.t,
                c: tile.c,
                x: tile.position.x * 20 + provincePosition.x * 16 * 20,
                y: tile.position.y * 20 + provincePosition.y * 16 * 20
            })
        })
    })
    return tilesToRender
}
//return list of tiles from list of provinces
const setMap = (provinces, x, y) => {
    let result = []
    provinces.forEach(province => {
        let positions = { x: province.position.x - x + 1, y: province.position.y - y + 1 }
        result.push(...setFromTiles(province.tiles, positions))
    })
    return result
}



const ProvinceCanvas = ({ BuildingInHand, setPositionToBuild }) => {
    const { chunkId } = useParams()
    const Fetched = useMap(chunkId)
    const Tiles = useSelector(state => state.Tiles)
    const Buildings = useSelector(state => state.Buildings)
    const [CurrentTile, onMouseOver] = useCurrentTile(Buildings)
    const [Position, getPosition] = usePosition()

    return (
        <Stage width={16 * 3 * 20} height={16 * 3 * 20} onMouseOver={getPosition}>
            {Fetched ?
                <>
                    <Suspense fallback={<WaitLayer />}>
                        <TileLayer
                            onMouseOver={onMouseOver}
                            tiles={Tiles}
                            tileSize={20}
                            onClick={e => setPositionToBuild(e.target.attrs)}
                        />
                        <BuildingLayer fetched={Fetched} onMouseOver={onMouseOver} buildings={Buildings} tileSize={20} />
                    </Suspense>
                    <InfoLayer mousePos={Position} CurrentTile={CurrentTile} Building={BuildingInHand} buildings={Buildings} />
                </>
                : <WaitLayer />
            }
        </Stage>
    )
}

export default ProvinceCanvas