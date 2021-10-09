import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPcs = createAsyncThunk(
    'Pcs/fetchPcs',
    async () => {
        const response = await axios.get('/api/getPcs');
        return response.data;
    }
)
const Pcs = createSlice({
    name: 'Pcs',
    initialState: {
        data: [],
        hasFetched: false
    },
    extraReducers: {
        [fetchPcs.pending]: (state, action) => {
            state.hasFetched = false;
        },
        [fetchPcs.fulfilled]: (state, { payload }) => {
            state.data = payload.data;
            state.hasFetched = true;
        },
        [fetchPcs.rejected]: (state, action) => {
            state.hasFetched = false;
        }
    }
})

export default Pcs.reducer;