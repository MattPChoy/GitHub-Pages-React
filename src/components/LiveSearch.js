import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import {Autocomplete} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


export default function LiveSearch() {
    return (
        <Autocomplete
        disablePortal
        id="Condition Code"
        options={conditions}
   
        renderInput={(params) => <TextField {...params} label="Condition" />}
        />
    );
}

const conditions = [
    { label: 'Anxiety' },
    { label: 'Allergy' },
    { label: 'Asthma' },
    { label: 'Back Pain' },
    { label: 'Cancer' },
    { label: 'COPD' },
    { label: 'Depression' },
    { label: 'Diabetes' },
    { label: 'Heart Disease' },
    { label: 'High Blood Pressure' },
    { label: 'High Cholesterol' },
    { label: 'HIV' },
    { label: 'Influenza' },
    { label: 'Kidney Disease' },
    { label: 'Obesity' },
    { label: 'Osteoporosis' },
]