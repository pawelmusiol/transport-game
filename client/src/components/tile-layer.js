import { Layer } from "react-konva"
import { Tile } from "."
import { memo } from "react"

const TileLayer = ({tiles, setCurrentTile}) => {
    const onMouseEnter = (tile) => {
        setCurrentTile({
            type: tile.t,
            crossable: tile.c,
        })
    }
    let TileArray = tiles.map(tile => <Tile X={tile.x} Y={tile.y} type={tile.t} onMouseEnter={() => onMouseEnter(tile)}/>)
    return (
        <Layer>
            {TileArray}
        </Layer>
    )
}

export default memo(TileLayer)