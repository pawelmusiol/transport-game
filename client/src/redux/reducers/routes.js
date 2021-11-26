const initialValues = [
    {
        sections: [
            {
                start:false,
                end: false,
                id:0,
                direction: 'none',
                position: {
                    province: {
                        x: 0,
                        y: 0,
                    },
                    tile: {
                        x: 0,
                        y: 0,
                    },
                },
            }
        ],
        sectionsNumber: 0
    }
]

const Routes = (state = initialValues, action) => {
    switch (action.type) {
        case "GET_ROUTES":
            return action.routes
        case "SET_ROUTE":
        return [
            ...state,
            action.route
        ]
    
        default:
            return state
    }
}

export default Routes