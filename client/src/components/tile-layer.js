import { Layer } from "react-konva"
import { WaitLayer } from "."
import { Tile } from "."
import { memo } from "react"

const TileLayer = ({ tiles, onMouseEnter, tileSize }) => {

    return (
        <>
            {tiles.length ?
                <MemoLayer tiles={tiles} onMouseEnter={onMouseEnter} tileSize={tileSize} />
                :
                <WaitLayer />
            }
        </>
    )
}

const layerToMemo = ({ tiles, onMouseEnter, tileSize }) => {
    let TileArray = tiles.map(tile => <Tile x={tile.x} y={tile.y} type={tile.t} onMouseEnter={() => onMouseEnter(tile)} size={tileSize} />)
    return (
        <Layer>
            {TileArray}
        </Layer>
    )
}
const MemoLayer = memo(layerToMemo,(prevProps, nextProps) => {
    if (prevProps.tiles === nextProps.tiles) {
        return true
    }
    else{
        return false
    }
})

export default TileLayer