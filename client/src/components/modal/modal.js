import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const StyledModal = ({ children, handleClose, open }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        maxWidth: '80&',
        color: 'black',
        backgroundColor: 'white',
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>

    )
}

export default StyledModal