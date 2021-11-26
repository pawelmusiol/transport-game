const route = require('../services/route')

exports.createRoute = async (req, res) => {
    let result = await route.createRoute(req.body.routePoints)
    res.status(result.code).send(result.body)
}