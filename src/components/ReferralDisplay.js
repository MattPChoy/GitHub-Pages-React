import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { FhirClientContext } from "../FhirClientContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

function display(data) {
    const name = data.name;
    const output = document.getElementById("providerName");
    output.innerText = name instanceof Error ?
        String(name) :
        JSON.stringify(name, null, 4);
}

export default class ReferralDisplay extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
        super(props);

        this.state = {
            changes: false, // Whether changes have been made.
            active: "",
            referral: null,
            loaded: false,
            data: {
                "referrer": {
                    "name": "Loading...",
                    "num": "Loading...",
                    "addr": "Loading..."
                },
                "referree": {
                    "name": "Loading...",
                    "num": "Loading...",
                    "addr": "Loading..."
                },
                "patient": {
                    "name": "Loading...",
                    "conditions": "Loading...",
                    "dob": "Loading...",
                    "observations": "Loading..."
                },
                "description": "Loading..."
            }
        }
    }

    componentDidMount() {

    }

    render() {
        if (this.state.active != this.props.currentReferral) {
            this.state.active = this.props.currentReferral;
            this.state.loaded = false;
        }


        if (this.state.active != "" && this.state.active != "-1"
            && this.state.loaded == false) {
            // If not default value, get the data
            const client = this.context.client;
            this._loader = client.request("ReferralRequest/" + this.state.active).then(
                report => {
                    this.setState({referral: report, loaded: true});
                    console.log(report);
                    this.setState({
                        data: {
                            "referrer": {
                                "name": report.requester == null ? "Dr Anonymous" :
                                    report.requester.agent.display,
                                "num": report.requester == null ? "0000 0000 0000" :
                                    report.requester.agent.identifier.value,
                                "addr": "19 Default Street, St Lucia, QLD, Australia"
                            },
                            "referree": {
                                "name": report.recipient == null ? "Dr Strange" :
                                    report.recipient[0].display,
                                "num": report.recipient == null ? "9999 9999 9999" :
                                    report.recipient[0].identifier.value,
                                "addr": "23 Imaginary Lane, St Lucia, QLD, Australia"
                            },
                            "patient": {
                                "name": "Hai Champlin",
                                "conditions": "Lipid Panel",
                                "dob": "1966-06-26",
                                "description": "Referral due to abnormal lipid panel results",
                            }
                        }
                    })
                }
            ).catch(console.err)
        }

        return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box>
                    <h3>Referred By</h3>
                    <div>
                        <h4>Physician Name</h4>
                        <div id="physName">{this.state.data.referrer.name}</div>
                    </div>
                    <div>
                        <h4>Provider Number</h4>
                        <div id="proNum">{this.state.data.referrer.num}</div>
                    </div>
                    <div>
                        <h4>Practice Address</h4>
                        <div id="pracAddress">{this.state.data.referrer.addr}</div>
                    </div>
                </Box>
                <Box>
                    <h3>Referred To</h3>
                    <div>
                        <h4>Physician Name</h4>
                        <div id="refPhysName">{this.state.data.referree.name}</div>
                    </div>
                    <div>
                        <h4>Provider Number</h4>
                        <div id="refProNum">{this.state.data.referree.num}</div>
                    </div>
                    <div>
                        <h4>Practice Address</h4>
                        <div id="refPracAddress">{this.state.data.referree.addr}</div>
                    </div>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box>
                    <h3>Patient Details</h3>
                    <div>
                        <h4>Patient Name</h4>
                        <div id="patientName">{this.state.data.patient.name}</div>
                    </div>
                    <div id="refConditions">
                        <h4>Referral Conditions</h4>
                        <div id="age">{this.state.data.patient.conditions}</div>
                    </div>
                    <div>
                        <h4>Date of Birth</h4>
                        <div id="age">{this.state.data.patient.dob}</div>
                    </div>
                    <div>
                        <h4>Referral Instructions / Details </h4>
                        <div id="description">{this.state.data.description}</div>
                    </div>
                </Box>
            </Grid>
          </Grid>
        </Box>
      )
  };
}
