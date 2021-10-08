import { configureStore } from "@reduxjs/toolkit";
import adminAuthentication from './containers/Admin/adminSlice';
import Pcs from './containers/Devices/deviceSlice';


const store = configureStore({
    reducer: {
        adminStatus: adminAuthentication,
        Pcs: Pcs
    }
})

export default store;