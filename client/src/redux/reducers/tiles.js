export const initialValues = [{
    id: "",
    tiles: [[
        {
            position: {
                x:0,
                y:0,
            },
            t: 0,
            c: true,
        }
    ]]
}]

const Tiles = (state = initialValues, action) => {
    switch (action.type) {
        case "GET_TILES":
            return action.Tiles
        default:
            return state
    }
}

export default Tiles