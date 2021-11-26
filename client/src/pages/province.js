import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { ActionPanel, ProvinceCanvas } from "../components"
import { Modal } from '../components/modal'
import { setBuildingsToMap } from '../components/province-canvas'
import Button from '@mui/material/Button'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
/* import Buildings from "../redux/reducers/buildings" */

const fetchBuilding = (BuildingInHand, PositionToBuild, chunkId, dispatch, setModalOpen, setModalContent) => {
    let [ProvinceX, ProvinceY] = chunkId.split('.')
    let position = setPosition(PositionToBuild, parseInt(ProvinceX), parseInt(ProvinceY))


    if (BuildingInHand.t === -1) {
        let positionString = `${position.province.x}.${position.province.y}.${position.tile.x}.${position.tile.y}`
        axios.delete(`http://localhost:8000/building/${positionString}?chunkId=${chunkId}`, { position: position }).then(res => {
            dispatch({ type: "GET_BUILDINGS", Buildings: setBuildingsToMap(res.data.buildings, ProvinceX, ProvinceY) })
        }).finally(() => setModalOpen(false))
    }
    else {
        axios.post('http://localhost:8000/building/', { building: { position, ...BuildingInHand }, chunkId: chunkId }).then(res => {
            dispatch({ type: "GET_BUILDINGS", Buildings: setBuildingsToMap(res.data.buildings, ProvinceX, ProvinceY) })
            console.log(res)
        })
            .catch((error) => {
                console.log(error)
            }).finally(() => setModalOpen(false))
    }
}

const fetchRoute = (RoutePoint, setRoutePoint, Position, chunkId, dispatch, setModalOpen, setModalContent) => {
    let [ProvinceX, ProvinceY] = chunkId.split('.')
    let currentPosition = setPosition(Position, parseInt(ProvinceX), parseInt(ProvinceY))
    if (RoutePoint === undefined) {
        setRoutePoint(currentPosition)
    }
    else if (RoutePoint !== undefined && currentPosition !== RoutePoint) {
        console.log(RoutePoint, currentPosition)
        setModalOpen(true)
        axios.post('http://localhost:8000/route/', { routePoints: { start: RoutePoint, end: currentPosition } }).then(res => {
            if (res.data.routes.length > 0) {
                res.data.routes.forEach(row => {
                    if (row) console.log(row.position.province, row.position.tile)
                })
            }
            setModalContent(res.data.message)
        }).catch(e => {
            setModalContent(e.response.data.message)
        }).finally(() => {
            //setModalOpen(false)
        })
        setRoutePoint(undefined)
    }
}



const useAction = (setModalOpen) => {
    const filterBuildings = (Building) => (
        (Building.x === PositionToBuild.x - 20 && Building.y === PositionToBuild.y)
        || (Building.x === PositionToBuild.x + 20 && Building.y === PositionToBuild.y)
        || (Building.y === PositionToBuild.y - 20 && Building.x === PositionToBuild.x)
        || (Building.y === PositionToBuild.y + 20 && Building.x === PositionToBuild.x)
    )
    const [ModalContent, setModalContent] = useState('')
    const [ActionInHand, setActionInHand] = useState({})
    const [PositionToBuild, setPositionToBuild] = useState(0)
    const [RoutePoints, setRoutePoints] = useState(undefined)
    const dispatch = useDispatch()
    const BuildingsInArea = useSelector(
        state => state.Buildings.filter(filterBuildings)
    )
    const { chunkId } = useParams()

    useEffect(() => {
        console.log(PositionToBuild)
        if (PositionToBuild !== 0 && ActionInHand.t) {
            if (ActionInHand.t < 100) {
                fetchBuilding(ActionInHand, PositionToBuild, chunkId, dispatch, setModalOpen, setModalContent)
            }
            else if (ActionInHand.t > 100) {
                fetchRoute(RoutePoints, setRoutePoints, PositionToBuild, chunkId, dispatch, setModalOpen, setModalContent)
            }
            setPositionToBuild(0)
        }
    }, [PositionToBuild])

    return [ActionInHand, setActionInHand, setPositionToBuild, { Content: ModalContent, Close: () => setModalContent('') }]
}

const setPosition = (PositionToBuild, x, y) => {
    return {
        province: {
            x: Math.floor((PositionToBuild.x / 20) / 16) + x - 1,
            y: Math.floor((PositionToBuild.y / 20) / 16) + y - 1
        },
        tile: {
            x: PositionToBuild.x / 20 % 16,
            y: PositionToBuild.y / 20 % 16
        }
    }
}

const Province = () => {
    const [ModalOpen, setModalOpen] = useState(false)
    const [ActionInHand, setActionInHand, setPositionToBuild, ModalContent] = useAction(setModalOpen)
    const handleClose = () => {setModalOpen(false); ModalContent.Close()}
    
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Helmet>
                <style>{`
                    body,html{
                        overflow: hidden;
                    }
                `}</style>
            </Helmet>
            <Modal open={ModalOpen} handleClose={handleClose}>
                {ModalContent.Content.length
                    ? <div>
                        <p>{ModalContent.Content}</p>
                        <Button onClick={handleClose}>Zamknij</Button>
                    </div>
                    : <p>"Ładowanie..."</p>
                }
            </Modal>
            <ProvinceCanvas setPositionToBuild={setPositionToBuild} />
            <ActionPanel
                ActionInHand={ActionInHand}
                setActionInHand={setActionInHand}
            />
        </div>
    )
}

export default Province