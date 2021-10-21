import { useState, useEffect, Suspense, lazy } from "react"
import { Stage } from "react-konva"
import { WaitLayer, InfoLayer } from "."
import { useHistory } from "react-router-dom"
import { useCurrentTile, usePosition } from "../hooks"
import axios from 'axios'
const TileLayer = lazy(() => import("./tile-layer"))

const useMap = () => {
    const [Tiles, setTiles] = useState({})
    useEffect(() => {
        axios.get("http://localhost:8000/map").then(res => {
            setTiles(setMap(res.data.chunks[0]))
        })
    }, [])
    return [Tiles]
}
/**
 * 
 * @param {[{position:{x:Number,y:Number}, tiles:[[{t:Number,c:Boolean,id:String}]]}]} chunks 
 */
const setMap = (chunks) => {
    let tiles = []
    chunks.map((chunk) => {
        for (let i = 0; i < chunk.tiles.length; i++) {
            let row = []
            for (let j = 0; j < chunk.tiles[i].length; j++) {
                let [x, y] = chunk.tiles[i][j].id.split('.')
                row.push({
                    t: chunk.tiles[i][j].t,
                    c: chunk.tiles[i][j].c,
                    x: x * 10,
                    y: y * 10,
                })
            }
            tiles.push(...row)
        }
    })
    return tiles
}

const checkPosition = (position) => {
    let finalPosition = position
    if (position.x <= 0) {
        finalPosition.x = 1
    }
    if (position.x >= 159) {
        finalPosition.x = 158
    }
    if (position.y <= 0) {
        finalPosition.y = 1
    }
    if (position.y >= 159) {
        finalPosition.y = 118
    }
    return finalPosition
}

const WorldCanvas = () => {
    const history = useHistory()
    const [CurrentTile, onMouseEnter] = useCurrentTile()
    const [Position, getPosition ] = usePosition()

    const [Tiles] = useMap()

    const onClick = () => {
        console.log(CurrentTile.position)
        let position = checkPosition(CurrentTile.position)
        console.log(position)
        history.push(`/map/province/${position.x}.${position.y}`)
    }

    return (
        <>
            <p>sztos </p>
            <Stage width={1600} height={1200} onMouseOver={getPosition} onClick={onClick}>
                <Suspense fallback={<WaitLayer />}>
                    <TileLayer onMouseEnter={onMouseEnter} tiles={Tiles} tileSize={10}/>
                </Suspense>
                <InfoLayer mousePos={Position} CurrentTile={CurrentTile} />
            </Stage>
        </>
    )
}



export default WorldCanvas