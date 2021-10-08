import { configureStore } from "@reduxjs/toolkit";
import adminAuthentication from './containers/Admin/adminSlice';


const store = configureStore({
    reducer: {
        adminStatus: adminAuthentication,
    }
})

export default store;