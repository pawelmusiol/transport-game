import { Layer } from "react-konva"
import { WaitLayer } from "."

const RouteLayer = ({ routes }) => {
    return (
        <LayerToMemo routes={routes} />
    )
}

const LayerToMemo = ({routes}) => {
    return (
        <Layer>
        </Layer>
    )
}

const MemoLayer = memo(LayerToMemo, (prevProps, nextProps) => {
    return prevProps.routes === nextProps.routes
})

export default RouteLayer