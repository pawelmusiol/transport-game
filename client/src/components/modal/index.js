import { useState } from 'react'
import Modal from './modal'
import Button from '@mui/material/Button'

const StyledModal = ({ button, children }) => {
    const [Open, setOpen] = useState(false)
    const handleOpen = setOpen(true)
    const handleClose = setOpen(false)

    return (
        <>
            <Button onClick={handleOpen}>{button}</Button>
            <Modal
                open={Open}
                handleClose={handleClose}
            >
                {children}
            </Modal>
        </>
    )
}

export { Modal }
export default StyledModal