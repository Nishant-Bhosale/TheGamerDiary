import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAdminStatus = createAsyncThunk(
    'admin/fetchStatus',
    async (token) => {
        const response = await axios.get('/api/authoriseAdmin', {
            headers: {
                "x-access-token": token
            }
        })
        sessionStorage.setItem('tempAdminStatus', response.data.authorisation);
        return response.data;
    }
)
const tempAuth = sessionStorage.getItem('tempAdminStatus');
const adminAuthentication = createSlice({
    name: 'admin',
    initialState: {
        login: tempAuth || false,
        hasFetched: false
    },
    reducers: {
        'adminLogout': (state, action) => {
            return state = {}
        }
    },
    extraReducers: {
        [getAdminStatus.pending]: (state, action) => {
            state.hasFetched = false;
        },
        [getAdminStatus.fulfilled]: (state, { payload }) => {
            state.login = payload.authorisation;
            state.hasFetched = true;
        },
        [getAdminStatus.rejected]: (state, action) => {
            state.hasFetched = false;
        }
    }
})

export const { adminLogout } = adminAuthentication.actions;
export default adminAuthentication.reducer;