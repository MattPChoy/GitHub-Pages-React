import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    patient_dob: -1,
    patient_name: "No name",
}

export const fhirRedux = createSlice({
    name: "fhirReduxHandler",
    initialState,
    reducers: {
        setPatientDOB: (state, action) => {
            state.patient_dob = action.payload
        },

        setPatientName: (state, action) => {
            state.patient_name = action.payload
        }
    }
})

export const { setPatientDOB, setPatientName } = fhirRedux.actions
export default fhirRedux.reducer
