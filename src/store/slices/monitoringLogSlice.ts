import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {MonitoringLog, MonitoringLogDTO, MonitoringLogFilters} from '../../types/monitoringLog';
import monitoringLogService from '../../services/monitoringLogService';

interface MonitoringLogState {
    logs: MonitoringLog[];
    loading: boolean;
    error: string | null;
}

// const initialState: MonitoringLogState = {
//     logs: [],
//     loading: false,
//     error: null
// };

const initialState: MonitoringLogState = {
    logs: [
        {
            code: "LOG001",
            date: "2023-01-01",
            fieldCode: "FIELD001",
            details: "Details for log 1",
            observedImage: "/public/images/temp-image.jpg",
            staffCount: 5
        },
        {
            code: "LOG002",
            date: "2023-01-02",
            fieldCode: "FIELD002",
            details: "Details for log 2",
            observedImage: "/public/images/temp-image.jpg",
            staffCount: 3
        },
        {
            code: "LOG003",
            date: "2023-01-03",
            fieldCode: "FIELD003",
            details: "Details for log 3",
            observedImage: "/public/images/temp-image.jpg",
            staffCount: 4
        },
        {
            code: "LOG004",
            date: "2023-01-04",
            fieldCode: "FIELD004",
            details: "Details for log 4",
            observedImage: "/public/images/temp-image.jpg",
            staffCount: 2
        },
        {
            code: "LOG005",
            date: "2023-01-05",
            fieldCode: "FIELD005",
            details: "Details for log 5",
            observedImage: "/public/images/temp-image.jpg",
            staffCount: 6
        },
        {
            code: "LOG006",
            date: "2023-01-06",
            fieldCode: "FIELD006",
            details: "Details for log 6",
            observedImage: "/public/images/temp-image.jpg",
            staffCount: 7
        },
        {
            code: "LOG007",
            date: "2023-01-07",
            fieldCode: "FIELD007",
            details: "Details for log 7",
            observedImage: "/public/images/temp-image.jpg",
            staffCount: 1
        },
        {
            code: "LOG008",
            date: "2023-01-08",
            fieldCode: "FIELD008",
            details: "Details for log 8",
            observedImage: "/public/images/temp-image.jpg",
            staffCount: 8
        }
    ],
    loading: false,
    error: null
};

export const fetchAllMonitoringLogs = createAsyncThunk(
    'monitoringLog/fetchAll',
    async () => {
        return await monitoringLogService.getAllMonitoringLogs();
    }
);

export const filterMonitoringLogs = createAsyncThunk(
    'monitoringLog/filter',
    async (filters: MonitoringLogFilters) => {
        return await monitoringLogService.filterMonitoringLogs(filters);
    }
);

export const addMonitoringLog = createAsyncThunk(
    'monitoringLog/add',
    async (monitoringLogDTO: MonitoringLogDTO) => {
        return await monitoringLogService.saveMonitoringLog(monitoringLogDTO);
    }
);

export const updateMonitoringLog = createAsyncThunk(
    'monitoringLog/update',
    async ({id, monitoringLogDTO}: { id: string; monitoringLogDTO: MonitoringLogDTO }) => {
        return await monitoringLogService.updateMonitoringLog(id, monitoringLogDTO);
    }
);

export const deleteMonitoringLog = createAsyncThunk(
    'monitoringLog/delete',
    async (id: string) => {
        await monitoringLogService.deleteMonitoringLog(id);
        return id;
    }
);

const monitoringLogSlice = createSlice({
    name: 'monitoringLog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMonitoringLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllMonitoringLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = action.payload;
            })
            .addCase(fetchAllMonitoringLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch monitoring logs';
            })
            .addCase(filterMonitoringLogs.fulfilled, (state, action) => {
                state.logs = action.payload;
            })
            .addCase(addMonitoringLog.fulfilled, (state, action) => {
                state.logs.push(action.payload);
            })
            .addCase(updateMonitoringLog.fulfilled, (state, action) => {
                const index = state.logs.findIndex(log => log.code === action.payload.code);
                if (index !== -1) {
                    state.logs[index] = action.payload;
                }
            })
            .addCase(deleteMonitoringLog.fulfilled, (state, action) => {
                state.logs = state.logs.filter(log => log.code !== action.payload);
            });
    }
});

export default monitoringLogSlice.reducer;