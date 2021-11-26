import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export const useCurrentTile = (buildings) => {
    const [CurrentTile, setCurrentTile] = useState({ type: '', crossable: false, position: { x: 0, y: 0 } })
    let onMouseOver = () => console.log('dupa')
        if (buildings) {
            onMouseOver = (e, object) => {
                setCurrentTile({
                    ...CurrentTile,
                    type: object.t,
                    position: { x: object.x / 10, y: object.y / 10 },
                    building: buildings.filter(building => building.x === object.x && building.y === object.y)[0]
                })
            }
        }
        else {
            onMouseOver = (e, object) => {
                setCurrentTile({
                    ...CurrentTile,
                    type: object.t,
                    position: { x: object.x / 10, y: object.y / 10 },
                })
            }
        }

    return [CurrentTile, onMouseOver]
}

/**
    * 
    * @param {React.MouseEvent} e 
    */
export const usePosition = () => {
    const [Position, setPosition] = useState({ x: 0, y: 0 })

    const getPosition = e => {
        if (e.target) {
            let mousePos = e.target.getStage().getRelativePointerPosition();
            setPosition({
                x: mousePos.x,
                y: mousePos.y - 5
            })
        }
    }
    return [Position, getPosition]
}