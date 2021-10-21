import { Layer } from "react-konva"
import { Html } from "react-konva-utils"
const WaitLayer = () => {
    return (
        <Layer>
            <Html
            divProps={{
                style:{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }}
            >
                <p>
                    Ładowanie zajebistego contentu
                </p>
            </Html>
        </Layer>
    )
}

export default WaitLayer