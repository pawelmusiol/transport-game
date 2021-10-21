const province = require('../services/province')

exports.setProvinces = async (req, res) => {
    let result = province.setProvince()
    res.send(result)
}

exports.getProvince = async (req, res) => {
    let result = await province.getProvince(req.params.provinceId)
    res.send(result)
}
exports.getProvinces = async (req, res) => {
    let result = await province.getProvinces(req.params.provinceId)
    res.send(result) 
}