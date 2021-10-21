import MapThemeContext, { mapThemes } from './map'

const CombinedProviders = ({ children }) => {
    return (
        <MapThemeContext.Provider value={mapThemes.small}>
            {children}
        </MapThemeContext.Provider>
    )
}

export default CombinedProviders