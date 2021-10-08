import React, { useState, useEffect } from 'react';
import styles from '../Devices.module.css';
import axios from 'axios';

//Redux specific
import { useDispatch } from 'react-redux';
import { fetchPcs } from '../deviceSlice';

//MUI specific
import { Fab, Button } from '@mui/material';
import { Add, Remove, Send } from '@mui/icons-material';

//Info Alert
import AlertUtil from '../../../utils/AlertUtil';
export default function Device({ device }) {
    const dispatch = useDispatch();

    const [session, setSession] = useState({ duration: 0, amount: 0 });

    const [response, setResponse] = useState({});
    const [open, setOpen] = useState(false);

    //Handling Responses for selecting session
    const handleResponse = ({ gamer }) => {
        console.log(gamer._id)
        localStorage.setItem('gamerId', gamer._id);
        setResponse(prev => ({
            ...prev,
            message: 'PC selected succesfully',
            operation: 'success'
        }));
        setOpen(true);
        dispatch(fetchPcs());
    }

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
                        data: { name: session.name, money: session.amount, amountOfTime: session.duration, pcId: device.pcNumber }
                    })
                    handleResponse(response.data)

                }
                catch (err) {
                    console.log(err)
                    handleError(err.response)
                }
            }
            selectDevice();
            setSession({ duration: 0, amount: 0 })
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
            amount: session.amount += 25
        }))
    }
    const handleSubstractClick = () => {
        setSession(prev => ({
            ...prev,
            duration: session.duration -= 30,
            amount: session.amount -= 25
        }))
    }

    const handleName = ({ target }) => {
        setSession(prev => ({
            ...prev,
            name: target.value
        }))
    }

    const changeOpen = () => setOpen(false);

    return (
        <div id={styles.deviceEntry}>
            <AlertUtil message={response.message} type={response.operation} open={open} changeOpen={changeOpen} />
            <div id={styles.generalInfo}>
                <div id={styles.pcInfo}>
                    <span>PC {device.pcNumber}</span>
                    <span>Availabe</span>
                </div>
            </div>
            < div id={styles.selectedInfo}>
                <span>Time Selected: {session.duration} mins</span>
                <span>Amount To Be Paid: &#8377;{session.amount}</span>
            </div>

            <div id={styles.deviceOptions}>
                <div id={styles.inputContainer}>
                    <input className={styles.sessionInput} type="text" name="name" onChange={handleName} value={session.name || ''} placeholder="Enter Session Name" />
                </div>
                <div id={styles.options}>

                    <Fab color="primary" aria-label="add" onClick={handleAddClick} disabled={session.duration >= 360 ? true : false}>
                        <Add />
                    </Fab>
                    <Fab color="primary" aria-label="remove" onClick={handleSubstractClick} disabled={session.duration ? false : true}>
                        <Remove />
                    </Fab>
                </div>
            </div>
            <div id={styles.sumbit}>
                <Button variant="contained" color="primary" startIcon={<Send />} onClick={handleSelectDevice} disabled={session.duration ? false : true}>
                    Submit
                </Button>
            </div>
        </div >
    )
}
