import { Rect } from "react-konva"
import { useHistory } from "react-router-dom"

const Tile = ({ x, y, type, onMouseEnter, size }) => {

    return (
        <Rect onMouseOver={onMouseEnter}
        width={size}
        height={size}
        x={x}
        y={y}
        fill={`#${/*type*3*/ Math.floor(Math.random()*9)}44`}
        />
    )
}

export default Tile