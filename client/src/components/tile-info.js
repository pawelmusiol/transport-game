import { Label, Tag, Text } from "react-konva"

const types = [
    {
        index: 0,
        text: "Ziemia"
    },
    {
        index: 1,
        text: "Piasek"
    },
    {
        index: 2,
        text: "Woda"
    },
]

const getType = (typeNumber) => {
    let tileType = types.filter(t => t.index === typeNumber)
    if (tileType[0]) {
        return tileType[0].text
    }
    return ''

}

const TileInfo = ({ mousePos, type, crossable }) => {
    return (
        <Label x={mousePos.x} y={mousePos.y} listening={false}>
            <Tag
                fill='white'
                pointerWidth={10}
                pointerHeight={10}
                pointerDirection="down"
            />
            <Text
                text={getType(type)}
            />
        </Label>
    )
}

export default TileInfo