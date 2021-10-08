import React from 'react';
import "./Manage.module.css";
import { useHistory } from 'react-router';

import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { adminLogout } from '../Admin/adminSlice';

export default function Manage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('adminJwtToken');
        dispatch(adminLogout());
        history.push('/');

    }

    return (
        <div>
            <h1>This is the managers page</h1>
            <Button variant="contained" startIcon={<Logout />} onClick={handleLogout}>logout</Button>
        </div>
    )
}
