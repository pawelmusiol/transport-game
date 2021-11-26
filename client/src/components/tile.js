import { Rect } from "react-konva"

//render one tile
const Tile = ({ x, y, type, onMouseOver, size, color, onClick, listening }) => {
    const fillColor = () => color ? color : `#${Math.floor(Math.random() * 9)}44`
    return (
        <Rect
            listening={listening}
            onClick={onClick}
            onMouseOver={onMouseOver}
            width={size}
            height={size}
            x={x}
            y={y}
            fill={fillColor()}
        />
    )
}

export default Tile