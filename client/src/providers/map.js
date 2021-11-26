import { createContext } from "react"

export const MapThemes = {
    small: {
        world: {
            width: 10,
            height: 10,
        },
        province: {
            width: 20,
            height: 20,
        }
    }
}

export const MapEventListeners = {
    top: {
        buildings: true
    },
    terrain: {
        buildings: false
    },

}

export const MapEventListenersContext = createContext(MapEventListeners.top)
export const MapThemeContext = createContext(MapThemes)
