import { useState, useEffect } from "react"
import { Stage } from "react-konva"
import { TileLayer, InfoLayer } from "."
import axios from 'axios'

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
 * @param {[{position:{x:Number,y:Number}, tiles:[[{t:Number,c:Boolean}]]}]} chunks 
 */
const setMap = (chunks) => {
    let tiles = []
    chunks.map((chunk) => {
        for (let i = 0; i < chunk.tiles.length; i++) {
            let row = []
            for (let j = 0; j < chunk.tiles[i].length; j++) {
                row.push({
                    t: chunk.tiles[i][j].t,
                    c: chunk.tiles[i][j].c,
                    x: i * 10 + chunk.position.x * 40 * 10,
                    y: j * 10 + chunk.position.y * 40 * 10,
                })
            }
            console.log(row)
            tiles.push(...row)
        }
    })
    return tiles
}

const Canvas = () => {

    const [Position, setPosition] = useState({ x: 0, y: 0 })
    const [CurrentTile, setCurrentTile] = useState({ type: '', crossable: false })
    /**
    * 
    * @param {React.MouseEvent} e 
    */
    const getPosition = e => {
        if (e.target) {
            let mousePos = e.target.getStage().getRelativePointerPosition();
            setPosition({
                x: mousePos.x,
                y: mousePos.y - 5
            })
        }
    }

    const [Tiles] = useMap()
    return (
        <Stage width={1600} height={1200} onMouseOver={getPosition}>
            {Tiles.length &&
                <TileLayer setCurrentTile={setCurrentTile} tiles={Tiles} />
            }
            <InfoLayer mousePos={Position} CurrentTile={CurrentTile} />
        </Stage>
    )
}



export default Canvas