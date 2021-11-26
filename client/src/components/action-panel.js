import { useHistory } from 'react-router-dom'

const Actions = [
    {
        type: "Droga",
        typeNumber: 1,
        crossable: {
            train: false,
            car: true
        }
    },
    {
        type: "Tor",
        typeNumber: 2,
        crossable: {
            train: true,
            car: false
        },
    },
    {
        type: "Usuń",
        typeNumber: -1,
        crossable: {
            train: false,
            car: false
        },
    },
    {
        type: "Stwórz trasę",
        typeNumber: 101,
}
    
]

const ActionPanel = ({ ActionInHand, setActionInHand }) => {
    const history = useHistory()
    const setStyle = (typeNumber) => {
        if (ActionInHand.t === typeNumber) return { fontWeight: "800" }
    }
    const setUnsetActionInHand = (building) => {
        if (ActionInHand.t === building.typeNumber) {
            setActionInHand({})
        }
        else {
            setActionInHand({ t: building.typeNumber, c: building.crossable })
        }
    }
 
    return (
        <div>
            <button onClick={() => history.push('/map')}>Mapa</button>
            {Actions.map((building) => (
                <p style={setStyle(building.typeNumber)} onClick={() => setUnsetActionInHand(building)}>
                    {building.type}
                </p>
            ))
            }
        </div>
    )
}

export default ActionPanel