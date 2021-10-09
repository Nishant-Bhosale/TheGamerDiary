import React, { useState } from 'react';
import styles from '../Devices.module.css';
import axios from 'axios';

//Redux specific
import { useDispatch } from 'react-redux';
import { fetchPcs } from '../deviceSlice';

//MUI specific
import { FormControl, InputLabel, Select, MenuItem, Fab, Button, TextField, Box } from '@mui/material';
import { Add, Remove, Receipt, Cancel, Send } from '@mui/icons-material';

//Info Alert
import AlertUtil from '../../../utils/AlertUtil';
export default function Device({ device }) {
    const dispatch = useDispatch();

    const [session, setSession] = useState({ duration: 0, amount: 0, game: 'GTA V', cf: 1 });

    const [response, setResponse] = useState({});
    const [open, setOpen] = useState(false);

    //Handling Errors for selecting session
    const handleError = () => {
        setResponse(prev => ({
            ...prev,
            message: 'Internal server error',
            operation: 'warning'
        }))
        setOpen(true);
    }

    const handleSelectDevice = () => {
        if (session.name) {

            const selectDevice = async () => {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: '/gamer',
                        data: { name: session.name, selectedGame: { game: session.game, cf: session.cf }, money: session.amount, amountOfTime: session.duration, pcId: device.pcNumber }
                    })
                    localStorage.setItem('gamerId', response.data.gamer._id);
                    dispatch(fetchPcs());

                }
                catch (err) {
                    handleError(err.response)
                }
            }
            selectDevice();
            setSession({ duration: 0, amount: 0, game: 'GTA V', cf: 1 })
        }
        else {
            setResponse((prev) => ({
                ...prev,
                message: 'Session Name is required',
                operation: 'warning'
            }))
            setOpen(true);
        }
    }

    //Handling Timer selection logic
    const handleAddClick = () => {
        setSession(prev => ({
            ...prev,
            duration: session.duration += 30,
            amount: session.amount += (session.cf * 25)
        }))
    }
    const handleSubstractClick = () => {
        setSession(prev => ({
            ...prev,
            duration: session.duration -= 30,
            amount: session.amount -= (session.cf * 25)
        }))
    }

    const handleName = ({ target }) => {
        setSession(prev => ({
            ...prev,
            name: target.value
        }))
    }

    const handleGameChange = ({ target }) => {
        let cf = 0;
        if (target.value == 'GTA V' || target.value == 'Control') {
            cf = 1;
        }
        else if (target.value == 'Cyberpunk 2077' || target.value == 'Minecraft') {
            cf = 2;
        }
        else if (target.value == 'Red Dead Redemption 2') {
            cf = 3;
        }
        setSession(prev => ({
            ...prev,
            game: target.value,
            cf: cf,
            amount: 0,
            duration: 0
        }))
    }

    const [showConfirm, setShowConfirm] = useState(false);
    const handleCancel = () => {
        setShowConfirm(false);
        setSession({ duration: 0, amount: 0, game: 'GTA V', cf: 1 });
    }

    const changeOpen = () => setOpen(false);

    return (
        <div id={styles.deviceEntry}>
            <AlertUtil message={response.message} type={response.operation} open={open} changeOpen={changeOpen} />
            <div id={styles.pcInfo}>
                <span>PC {device.pcNumber}</span>
                <span>Availabe</span>
            </div>
            < div id={styles.selectedInfo}>
                <span>Time Selected: {session.duration} mins</span>
                <span>Amount to be paid: &#8377;{session.amount}</span>
            </div>

            <div id={styles.deviceOptions}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '20ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField className={styles.sessionInput} type="text" name="name" onChange={handleName} value={session.name || ''} label="Gamer Name" />
                </Box>
                <FormControl style={{ minWidth: '120px' }} disabled={showConfirm ? true : false}>
                    <InputLabel id="gameSelected">Select Game</InputLabel>
                    <Select
                        labelId="gameSelected"
                        label="gameSelected"
                        value={session.game}
                        onChange={handleGameChange}
                    >
                        <MenuItem value={'GTA V'}>GTA V</MenuItem>
                        <MenuItem value={'Cyberpunk 2077'}>Cyberpunk 2077</MenuItem>
                        <MenuItem value={'Red Dead Redemption 2'}>Red Dead Redemption 2</MenuItem>
                        <MenuItem value={'Control'}>Control</MenuItem>
                        <MenuItem value={'Minecraft'}>Minecraft</MenuItem>
                    </Select>
                </FormControl>
            </div >
            <div id={styles.options}>

                <Fab color="primary" aria-label="add" onClick={handleAddClick} disabled={session.duration >= 360 || showConfirm ? true : false}>
                    <Add />
                </Fab>
                <Fab color="primary" aria-label="remove" onClick={handleSubstractClick} disabled={!session.duration || showConfirm ? true : false}>
                    <Remove />
                </Fab>
            </div>
            {!showConfirm && <div id={styles.confirmContainer}>
                <Button style={{ width: '80%' }} variant="contained" color="primary" startIcon={<Receipt />} onClick={() => setShowConfirm(true)} disabled={session.duration ? false : true}>
                    Confirm
                </Button>
            </div>}

            {showConfirm && <div id={styles.submitContainer}>
                <span>Procceed payment of &#8377;{session.amount} for {setSession.duration} minutes? </span>
                <div id={styles.sumbitOptions}>
                    <Button  style={{ width: '40%' }} variant="contained" color="primary" startIcon={<Cancel />} onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button  style={{ width: '40%' }} variant="contained" color="primary" startIcon={<Send />} onClick={handleSelectDevice} >
                        Submit
                    </Button>
                </div>
            </div>}
        </div >
    )
}
