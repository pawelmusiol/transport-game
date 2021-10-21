import { createContext } from "react"

export const mapThemes = {
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

const MapThemeContext = createContext(mapThemes)

export default MapThemeContext