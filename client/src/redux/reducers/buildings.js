export const initialValues = [{
    t: 0,
    x:0,
    y:0,
    connection: {
        east: false,
        west: false,
        south: false,
        north: false,
    },
    connentionCount: 0,
}]

const Buildings = (state = initialValues, action) => {
    switch (action.type) {
        case "GET_BUILDINGS":
            return action.Buildings
        default:
            return state
    }
}

export default Buildings