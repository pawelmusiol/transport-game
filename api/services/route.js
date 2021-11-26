const buildingService = require('./building')
const buildingModel = require('../models/building')

let visited = []

const getNextPosition = async (position, end = false) => {
    const buildingsNear = await buildingModel.getConnections(buildingService.setPositionsGetConnection(position))

    let Position = []
    //checkPosition(position, prevPosition, buildingsNear)
    for (const [key, value] of Object.entries(buildingsNear)) {
        if (value.length && !visited.filter(pos => { if (pos) return comparePositions(pos.position, value[0].position) }).length) {
            Position.push({ position: value[0].position, options: getOptions(value[0].connections, value[0].connectionCount) })
        }
    }
    return Position
}

const getOptions = (connections, connectionCount) => {
    if (connectionCount == 2) {
        if (connections.east === true && connections.west === true || connections.north === true && connections.south === true) {
            return { straight: true, junction: false, end: false }
        }
    }
    if (connectionCount == 1) {
        return { straight: false, junction: false, end: true }
    }
    if (connectionCount > 2) {
        return { straight: false, junction: true, end: false }
    }

}

const setRoute = async (routes, end) => {
    let kek = []
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < routes.length; j++) {
            if (routes[j][routes[j].length - 1]) {
                if (comparePositions(routes[j][routes[j].length - 1].position, end.position)) {
                    console.log('dupa')
                    return { routes: routes[j] }
                }
                //let prevPosition = routes[0][routes[0].length- 2] ? routes[0][routes[0].length - 2].position : null
                let x = (await getNextPosition(routes[j][routes[j].length - 1].position))
                if (x.length > 1) {

                    console.log('dawaj nowo droga')
                    routes[j + 1] = routes[j].slice()
                    if (x.length > 2) routes[j + 2] = routes[j].slice()
                    if (x.length > 3) routes[j + 3] = routes[j].slice()
                    routes[j].push(x[0])
                    routes[j + 1].push(x[1])
                    if (x.length > 2) routes[j + 2].push(x[2])
                    if (typeof x[0] !== 'undefined') visited.push(x[0])
                    if (typeof x[1] !== 'undefined') visited.push(x[1])
                    if (typeof x[2] !== 'undefined') visited.push(x[2])
                    if (typeof x[3] !== 'undefined') visited.push(x[3])
                }
                else {
                    routes[j].push(x[0])
                    if (typeof x[0] !== 'undefined') visited.push(x[0])
                }


            }
            else {
                kek.push(routes[j])
                routes.splice(j, 1)
            }
        }
    }
    return { routes: routes, kek: kek }
}

const comparePositions = (a, b) => {
    if (a.tile.x !== b.tile.x) return false
    if (a.tile.y !== b.tile.y) return false
    if (a.province.x !== b.province.x) return false
    if (a.province.y !== b.province.y) return false
    return true
}

const checkValue = (result) => {
    if (result.routes.length > 0) {
        return { code: 200, body: { routes: result.routes, message: `Route Created` } }
    }
    else {
        return { code: 406, body: { result, message: `Can't find route` } }
    }
}

exports.createRoute = async (routePoints) => {
    visited = []
    let startPosition = await getNextPosition(routePoints.start)
    let endPosition = await getNextPosition(routePoints.end, true)
    let result

    console.log(startPosition, endPosition)

    if (endPosition.length && startPosition.length) {
        let routes = [[startPosition[0]]]
        visited.push(startPosition[0])
        result = checkValue(await setRoute(routes, endPosition[0]))
        result.body.routes[0].options = { straight: false, junction: true, end: false }
        result.body.routes[result.body.routes.length-1].options = { straight: false, junction: true, end: false }
        result.body.routes.unshift({position: routePoints.start, options:{ straight: false, junction: false, end: true }})
        result.body.routes.push({position: routePoints.end, options:{ straight: false, junction: false, end: true }})
    }
    else if (!startPosition.length) result = { code: 406, body: { message: `Can't find route near start` } }
    else if (!endPosition.length) result = { code: 406, body: { message: `Can't find route near end` } }

    return result
}