import * as React from 'react';
import Button from '@mui/material/Button';
import "../styles.css";
import FhirClientProvider from "./FhirClientProvider";

export default function Landing() {
    return (
        <FhirClientProvider>
        <div style={{
              display: "table",
              position: "absolute",
              height: "100%",
              width: "100%",
              top: 0,
              left: 0
        }}>
        <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "center"
          }}
        >
            <Button variant="outlined" href="createReferral" style={{margin: '1%'}}> Create Referral </Button>
            <Button variant="outlined" href="viewReferral" style={{margin: '1%'}}> View Referrals </Button>
        </div>
        </div>
        </FhirClientProvider>
    )
}
