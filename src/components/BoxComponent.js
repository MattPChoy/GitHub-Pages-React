import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import Select from '@mui/material/Select';
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import LiveSearch from "./LiveSearch";
import { getReports } from './states/reports';
import { getName } from './states/name';
import { getDOB } from './states/DOB';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));

export default function BoxComponent(ReportItem) {
    const ReportItems = getReports();

    console.log("At BoxComponent Top ");

    console.log(ReportItems);

    const checkList = Object.keys(ReportItems);
    console.log({checkList});

    const [checked, setChecked] = useState([]);

    //stores in state which item is checked
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };

      const printer = (event) => {
        window.print();
      };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box>
                        <h3>Referred By</h3>
                        <div id="physName">
                            <div>Physician Name</div>
                            <TextField id="outlined-basic" label="Dr Doctor" variant="outlined" fullWidth />
                        </div>
                        <div id="proNum">
                            <div>Provider Number</div>
                            <TextField id="outlined-basic" label="0890 1348 2348" variant="outlined" fullWidth />
                        </div>
                        <div id="pracAddress">
                            <div>Practice Address</div>
                            <TextField id="outlined-basic" label="St Lucia QLD 4067" variant="outlined" fullWidth />
                        </div>
                    </Box>
                    <Box>
                        <h3>Referred To</h3>
                        <div id="physName">
                            <div>Physician Name</div>
                            <TextField id="outlined-basic" label="Dr Doctor" variant="outlined" fullWidth />
                        </div>
                        <div id="proNum">
                            <div>Provider Number</div>
                            <TextField id="outlined-basic" label="0890 1348 2348" variant="outlined" fullWidth />
                        </div>
                        <div id="pracAddress">
                            <div>Practice Address</div>
                            <TextField id="outlined-basic" label="St Lucia QLD 4067" variant="outlined" fullWidth />
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <h3>Patient Details</h3>
                        <div id="patientName">
                            <div>Patient Name</div>
                            <TextField disabled id="filled-read-only-input" label={getName()} fullWidth />
                        </div>
                        <div id="refConditions">
                            <div>Referral Conditions</div>
                            <LiveSearch />
                            {/* <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select value={snomedCode} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>snomed code</MenuItem>
                                </Select>
                            </FormControl> */}
                        </div>
                        <div id="age">
                            <div>D.O.B</div>
                            <TextField disabled id="outlined-basic" label={getDOB()} variant="outlined" fullWidth />
                        </div>
                        <div id="description">
                            <div>Referral Instructions / Details </div>
                            <TextField id="outlined-basic" multiline rows={8} label="description" variant="outlined" fullWidth />
                        </div>
                    </Box>
                    <Box>
                        <div id="additionalInfo">
                            <div>Additional information</div>
                            <div className="checkList">
                                <div className="list-container">
                                    {checkList.map((item, index) => (
                                        <div key={index}>
                                            <input value={item} type="checkbox" onChange={handleCheck} />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid>

            <Button onClick={printer} style={{display: "flex", margin: 100, alignItems: "center", justifyContent: "center"}} variant="outlined">Submit</Button>
        </Box>
    );
};

//export default BoxComponent
