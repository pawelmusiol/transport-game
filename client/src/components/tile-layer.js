import { Layer } from "react-konva"
import { WaitLayer } from "."
import { Tile } from "."
import { memo } from "react"

//render memorized layer
const TileLayer = ({ tiles, onMouseOver, tileSize, onClick }) => {
    return (
        <>
            {tiles.length ?
                <MemoLayer
                    tiles={tiles}
                    onMouseOver={onMouseOver}
                    tileSize={tileSize}
                    onClick={onClick}
                />
                :
                <WaitLayer />
            }
        </>
    )
}

//memorize TileLayer for better optimalization
const LayerToMemo = ({ tiles, onMouseOver, tileSize, onClick }) => {


    let TileArray = tiles.map(tile =>
        <Tile
            name={tile.name}
            x={tile.x}
            y={tile.y}
            type={tile.t}
            onMouseOver={e => onMouseOver(e, tile)}
            size={tileSize}
        />)

    return (
        <Layer onClick={onClick}>
            {TileArray}
        </Layer>
    )
}
const MemoLayer = memo(LayerToMemo, (prevProps, nextProps) => {
    
    if (prevProps.tiles === nextProps.tiles) {
        return true
    }
    else {
        return false
    }
})

export default TileLayer