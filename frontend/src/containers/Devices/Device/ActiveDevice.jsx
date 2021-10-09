import React, { useState, useEffect } from 'react';
import styles from '../Devices.module.css';
import axios from 'axios';

//Redux specific
import { useDispatch } from 'react-redux';
import { fetchPcs } from '../deviceSlice';

import { Fab, Button } from '@mui/material';
import { Add, Remove, Edit, Cancel, Save } from '@mui/icons-material';

//Info Alert
import AlertUtil from '../../../utils/AlertUtil';

export default function ActiveDevice({ userDevice }) {
    const currentGamer = userDevice.currentGamer;
    const dispatch = useDispatch();

    const [session, setSession] = useState({ duration: 0, amount: 0 });
    const [counter, setCounter] = useState("");
    const [msCount, setMsCount] = useState(0);
    // Handling dynamic timer
    useEffect(() => {
        const timeLeft = (currentGamer.endTime - Date.now());
        setMsCount(timeLeft);
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
        if (msCount < 0) {
            handleDeleteSession();
            localStorage.removeItem('gamerId');
        }
        else if (msCount && (msCount < 300000)) {
            setResponse(prev => ({
                ...prev,
                message: 'Session ends in five minutes',
                operation: 'info'
            }))
            setOpen(true);
            setOpen(true);
        }
        else {
            const interval = setInterval(dynamicTimer, 1000);
            setCounter(msToTime(msCount));
            return () => {
                clearInterval(interval)
            }
        }
    }, [msCount])


    //Handling Timer updation logic
    const handleAddClick = () => {
        setSession(prev => ({
            ...prev,
            duration: session.duration += 30,
            amount: session.amount += (currentGamer.selectedGame.cf * 25)
        }))
    }
    const handleSubstractClick = () => {
        setSession(prev => ({
            ...prev,
            duration: session.duration -= 30,
            amount: session.amount -= (currentGamer.selectedGame.cf * 25)
        }));
    }


    const [response, setResponse] = useState({});
    const [open, setOpen] = useState(false);

    //Handling Responses for updating session
    const handleResponse = ({ gamer }) => {
        localStorage.setItem('gamerId', gamer._id);
        setResponse(prev => ({
            ...prev,
            message: 'Updating selection',
            operation: 'info'
        }))
        setOpen(true);
        setTimeout(() => dispatch(fetchPcs()), 2000);

    }

    const handleError = () => {
        setResponse(prev => ({
            ...prev,
            message: 'Internal server error',
            operation: 'warning'
        }))
        setOpen(true);
    }

    //  Handling Delete Responses (when user is removed)
    const handleDeleteResponse = () => {
        setResponse(prev => ({
            ...prev,
            message: 'PC removed from selections',
            operaton: 'success'
        }))
        setOpen(true);
        setTimeout(() => dispatch(fetchPcs()), 2000);
    }

    //Handling Remove user
    const handleDeleteSession = () => {
        const deleteSession = async () => {
            try {
                const response = await axios({
                    method: 'DELETE',
                    url: `/gamer/${currentGamer._id}`,
                })
                handleDeleteResponse(response.data);
            }
            catch (err) {
                handleError(err)
            }
        }
        deleteSession()
    }

    //Handling Active Device actions
    const handleUpdateUser = () => {
        const updateUser = async () => {
            try {
                const response = await axios({
                    method: 'POST',
                    url: '/gamer',
                    data: { gamerId: currentGamer._id, money: session.amount, amountOfTime: session.duration, pcId: userDevice.pcNumber }
                })
                handleResponse(response.data)

            }
            catch (err) {
                handleError(err.response)
            }
        }
        updateUser();
        setEdit(false);
    }

    const [edit, setEdit] = useState(false);
    const handleEditClick = () => {
        edit ? setEdit(false) : setEdit(true);
        setSession({ duration: 0, amount: 0 })
    }
    const changeOpen = () => setOpen(false);
    return (
        <div id={styles.userDevice}>
            <AlertUtil message={response.message} type={response.operation} open={open} changeOpen={changeOpen} />
            <div id={styles.userInfo}>
                <span>Session Name: {currentGamer.name}</span>
                <span>Session ID: {currentGamer._id}</span>
            </div>
            <div id={styles.selectedGame}>
                <span>Game Selected: {currentGamer.selectedGame.game}</span>
            </div>
            <div id={styles.countdownTimer}>
                <span>Session ends in</span>
                <span>{counter}</span>
            </div>
            {edit && < div id={styles.updatedInfo}>
                <span>Add time: {session.duration} mins</span>
                <span>Amount to be paid: &#8377;{session.amount}</span>
            </div>}

            {edit && <div id={styles.userOptions}>
                <Fab color="primary" aria-label="add" onClick={handleAddClick} disabled={session.duration >= 360 ? true : false}>
                    <Add />
                </Fab>
                <Fab color="primary" aria-label="remove" onClick={handleSubstractClick} disabled={session.duration ? false : true}>
                    <Remove />
                </Fab>
            </div>}
            <div id={styles.userActions}>
                <Button style={{ width: '40%' }} variant="outlined" color="warning" startIcon={!edit ? <Edit /> : <Cancel />} onClick={handleEditClick}>
                    {!edit ? 'Edit' : 'Cancel'}
                </Button>
                <Button style={{ width: '40%' }} variant="outlined" color="primary" startIcon={<Save />} onClick={handleUpdateUser} disabled={session.duration ? false : true}>
                    Update
                </Button>
            </div>

        </div>
    )
}
