import React, { useState, useEffect } from 'react';
import styles from '../Devices.module.css';
import axios from 'axios';

//Redux specific
import { useDispatch } from 'react-redux';
import { fetchPcs } from '../deviceSlice';

//MUI specific
import { Fab, Button } from '@mui/material';
import { Add, Remove, Edit, Delete, Send } from '@mui/icons-material';

//Info Alert
import AlertUtil from '../../../utils/AlertUtil';
export default function Device({ device }) {
    const dispatch = useDispatch();

    const [session, setSession] = useState({ duration: 0, amount: 0 });
    const [msCount, setMsCount] = useState(0);
    const [counter, setCounter] = useState("");

    const gamerId = localStorage.getItem('gamerId');

    // Handling dynamic timer
    useEffect(() => {
        if (device.isOccupied) {
            const timeLeft = (device.currentGamer.endTime - Date.now());
            setMsCount(timeLeft);
        }
    }, [])

    const msToTime = (duration) => {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
    }

    const dynamicTimer = () => {
        setMsCount(prev => prev - 1000);
    }

    useEffect(() => {
        if (device.isOccupied) {
            const interval = setInterval(dynamicTimer, 1000);
            setCounter(msToTime(msCount));
            return () => {
                clearInterval(interval)
            }
        }
    }, [msCount])


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

    //Handling Delete Responses
    const handleDeleteResponse = () => {
        setResponse(prev => ({
            ...prev,
            message: 'PC removed from selections',
            operaton: 'success'
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
                        data: { gamerId: gamerId, name: session.name, money: session.amount, amountOfTime: session.duration, pcId: device.pcNumber }
                    })
                    handleResponse(response.data)
                    dispatch(fetchPcs())

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

    //Handling Timer deletion logic
    const handleDeleteSession = () => {
        const deleteSession = async () => {
            try {
                const response = await axios({
                    method: 'DELETE',
                    url: `/gamer/${gamerId}`,
                })
                handleDeleteResponse(response.data);
                dispatch(fetchPcs());
            }
            catch (err) {
                handleError(err)
            }
        }
        deleteSession()
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
                    <span>{device.isOccupied ? "Currently Occupied" : "Available"}</span>
                </div>
                {device.isOccupied && <div id={styles.username}>
                    <span>Name: {device.currentGamer.name}</span>
                </div>}
            </div>
            {!device.isOccupied && <div id={styles.selectedInfo}>
                <span>Time Selected: {session.duration} mins</span>
                <span>Amount To Be Paid: &#8377;{session.amount}</span>
            </div>}
            {device.isOccupied && <div id={styles.countdownTimer}>
                <span>{counter}</span>
            </div>}
            <div id={styles.deviceOptions}>
                {!device.isOccupied && <div id={styles.inputContainer}>
                    {/* It is required in this case */}
                    <input className={styles.sessionInput} type="text" name="name" onChange={handleName} value={session.name || ''} placeholder="Enter Session Name" />
                </div>}
                <div id={styles.options}>

                    <Fab color="primary" aria-label="add" onClick={handleAddClick} disabled={session.duration >= 360 ? true : false}>
                        <Add />
                    </Fab>
                    <Fab color="primary" aria-label="remove" onClick={handleSubstractClick} disabled={session.duration ? false : true}>
                        <Remove />
                    </Fab>
                    <Fab color="secondary" aria-label="edit" disabled={device.isOccupied ? false : true}>
                        <Edit />
                    </Fab>
                    <Fab color="secondary" aria-label="delete" disabled={device.isOccupied ? false : true} onClick={handleDeleteSession}>
                        <Delete />
                    </Fab>
                </div>
            </div>
            <div id={styles.sumbit}>
                <Button variant="contained" color="primary" startIcon={<Send />} onClick={handleSelectDevice} disabled={session.duration ? false : true}>
                    Submit
                </Button>
            </div>
        </div>
    )
}
