import { useState } from "react"

export const useCurrentTile = () => {
    const [CurrentTile, setCurrentTile] = useState({ type: '', crossable: false, position: { x: 0, y: 0 } })

    const onMouseEnter = (tile) => {
        setCurrentTile({
            type: tile.t,
            crossable: tile.c,
            position: { x: tile.x / 10, y: tile.y / 10 }
        })
    }
    return [CurrentTile, onMouseEnter]
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