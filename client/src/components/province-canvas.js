import { useState, useEffect, Suspense, lazy } from "react"
import { useCurrentTile, usePosition } from "../hooks"
import { Stage } from "react-konva"
import { WaitLayer, InfoLayer } from "."
import { useLocation } from "react-router-dom"
import axios from 'axios'
const TileLayer = lazy(() => import("./tile-layer"))

const useMap = (id) => {
    const [Tiles, setTiles] = useState({})
    let [x, y] = id.split('.')
    useEffect(() => {
        axios.get(`http://localhost:8000/map/provinces/${id}`).then(res => {
            setTiles(setMap(res.data.provinces, x, y))
        })
    }, [])
    return [Tiles]
}

/**
 * 
 * @param {[
 * {position:{x:Number, y:Number}, 
 * "id":String, 
 * tiles:[[
 * position:{x:Number, y:Number}, 
 * t: Number,
 * c: Boolean,
 * ]]
 * }]
 * } province 
 */

/**
 * 
 * @param {{
 * position:{x:Number, y:Number}, 
 * t: Number,
 * c: Boolean,
 * }[][]} tiles 
 */

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
const setMap = (provinces, x, y) => {
    console.log(provinces)
    let result = []
    provinces.forEach(province => {
        let positions = { x: province.position.x - x + 1, y: province.position.y - y + 1 }
        console.log(positions)
        result.push(...setFromTiles(province.tiles, positions))
    })
    return result

}

const ProvinceCanvas = () => {
    const location = useLocation()
    const [CurrentTile, onMouseEnter] = useCurrentTile()
    const [Position, getPosition] = usePosition()
    const [Tiles] = useMap(location.pathname.split('/')[location.pathname.split('/').length - 1])
    return (
        <Stage width={16 * 3 * 20} height={16 * 3 * 20} onMouseOver={getPosition}>
            <Suspense fallback={<WaitLayer />}>
                <TileLayer onMouseEnter={onMouseEnter} tiles={Tiles} tileSize={20} />
            </Suspense>
            <InfoLayer mousePos={Position} CurrentTile={CurrentTile} />
        </Stage>
    )
}

export default ProvinceCanvas