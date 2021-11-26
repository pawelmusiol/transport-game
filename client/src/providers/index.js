import { MapThemeContext, MapThemes, MapEventListenersContext, MapEventListeners } from './map'

const CombinedProviders = ({ children }) => {
    return (
        <MapThemeContext.Provider value={MapThemes.small}>
            <MapEventListenersContext.Provider value={MapEventListeners.top}>
                {children}
            </MapEventListenersContext.Provider>
        </MapThemeContext.Provider>
    )
}

export default CombinedProviders