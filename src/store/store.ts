import {configureStore} from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice.ts";
import userSlice from "./slices/userSlice.ts";
import staffSlice from "./slices/staffSlice.ts";
import fieldSlice from "./slices/fieldSlice.ts";
import cropSlice from "./slices/cropSlice.ts";
import equipmentSlice from "./slices/equipmentSlice.ts";
import vehicleSlice from "./slices/vehicleSlice.ts";
import monitoringLogSlice from "./slices/monitoringLogSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        staff: staffSlice,
        field: fieldSlice,
        crop: cropSlice,
        equipment: equipmentSlice,
        vehicle: vehicleSlice,
        monitoringLog: monitoringLogSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;