import { Rect } from "react-konva"

const Tile = ({ X, Y, type, onMouseEnter }) => {


    return (
        <Rect onMouseOver={onMouseEnter}
        width={10}
        height={10}
        x={X}
        y={Y}
        fill={`#${type*3}44`}
        />
    )
}

export default Tile