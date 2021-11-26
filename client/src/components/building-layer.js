import { Layer } from "react-konva"
import { WaitLayer } from "."
import { Tile } from '.'
import { memo, useContext } from 'react'
import { MapEventListenersContext } from "../providers/map"

const BuildingsColor = [
    {
        t: 1,
        name: 'Droga',
        /* c: {
            train: false,
            car: true
        }, */
        color: '#000'
    },
    {
        t: 2,
        name: 'Tor',
        /* c: {
            train: true,
            car: false
            }, */
        color: '#FDF3F4'
    }
]

const BuildingLayer = ({ buildings, fetched, onMouseOver, onClick, tileSize, BuildingInHand }) => {
    return (
        <>
            {fetched ?
                <>
                    {buildings.length ?
                        <MemoLayer buildings={buildings} onMouseOver={onMouseOver} onClick={onClick} tileSize={tileSize} BuildingInHand={BuildingInHand} />
                        :
                        <MemoLayer buildings={buildings} onMouseOver={onMouseOver} onClick={onClick} tileSize={tileSize} BuildingInHand={BuildingInHand} />
                        
                    }
                </>
                : <WaitLayer />
        }
        </>
    )
}

const LayerToMemo = ({ buildings, onClick, tileSize, BuildingInHand }) => {

    const setBuilding = (e) => {
        const position = { x: e.target.attrs.x, y: e.target.attrs.y }
        console.log(e.target.attrs, BuildingInHand)
    }

    let BuildigsArray = buildings.map(building => {
        return (
            <Tile
                listening={false}
                x={building.x}
                y={building.y}
                type={building.t}
                size={tileSize}
                color={BuildingsColor.filter(Bc => Bc.t === building.t)[0].color}
            />
        )
    })
    return (
        <Layer >
            {BuildigsArray}
        </Layer>
    )
}

const MemoLayer = memo(LayerToMemo, (prevProps, nextProps) => {

    if (prevProps.buildings === nextProps.buildings && prevProps.onClick === nextProps.onClick) {
        return true
    }
    else {
        return false
    }
})

export default BuildingLayer