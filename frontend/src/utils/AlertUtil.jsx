import React from 'react';

//success alert specific


import { Close } from '@mui/icons-material';
import { Alert, IconButton, Collapse } from '@mui/material';

export default function AlertUtil({ message, type, open, changeOpen }) {

    const handleOpen = () => {
        changeOpen(false)
    }

    return (
        <Collapse in={open}>
            <Alert
                severity={type}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleOpen}
                    >
                        <Close fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Collapse>
    )
}