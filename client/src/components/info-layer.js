import { Layer } from "react-konva"
import { TileInfo } from "."
const InfoLayer = ({ mousePos, CurrentTile }) => {
    return (
        <Layer>
            <TileInfo
                mousePos={mousePos}
                type={CurrentTile.type}
                crossable={CurrentTile.crossable}
            />
        </Layer>
    )
}

export default InfoLayer