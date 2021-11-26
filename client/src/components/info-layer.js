import { Layer } from "react-konva"
import { TileInfo } from "."

//Return Layer with popup with information about tile
const InfoLayer = ({ mousePos, CurrentTile, buildings }) => {

    return (
        <Layer>
            <TileInfo
                buildings={buildings}
                mousePos={mousePos}
                tile={CurrentTile}
            />
        </Layer>
    )
}

export default InfoLayer