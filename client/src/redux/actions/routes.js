export const getRoutes = (Routes) => {
    return {
        type: 'GET_ROUTES',
        Routes
    }
}

export const setRoute = (Route) => {
    return {
        type: 'SET_ROUTE',
        Route
    }
}