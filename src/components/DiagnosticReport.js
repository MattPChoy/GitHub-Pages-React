import React from "react";
import { FhirClientContext } from "../FhirClientContext";

function ReportBanner(report) {
    let all = [];

    for (var key in report.entry) {
        console.log(report.entry[key].resource.resourceType);
        console.log(report.entry[key].resource.code.coding[0].display);
        console.log(report.entry[key].resource.issued);
        all.push({ "name": report.entry[key].resource.code.coding[0].display, "date": report.entry[key].resource.issued});
    }


    // report.entry.entries.forEach(element => {
    //     console.log(element);
    // });
    //console.log(report.entry);
    return (
        <div>
            <h1>Reports</h1>
            <ul>
                {all.map(item => <li key={item}>{item.name} {item.date}</li>)}
            </ul>
        </div>
        // <div>
        //     <PatientName name={patient.name} />
        //     <span>
        //         Gender: <b>{patient.gender}</b>,{" "}
        //     </span>
        //     <span>
        //         DOB: <b>{patient.birthDate}</b>
        //     </span>
        // </div>
    );
}

export default class Patient extends React.Component {
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            report: null,
            error: null
        };
    }
    componentDidMount() {
        const client = this.context.client;
        this._loader = client.request("DiagnosticReport?patient=bcd401f1-813b-48fc-9c23-30ed553db0a2").then(
            report => {
                this.setState({ report, loading: false, error: null });
            }
        ).catch(error => {
            this.setState({ error, loading: false });
        });
        //


        this.request("ReferralRequest").then(console.log).catch(console.error)
    }
    render() {
        const { error, loading, report } = this.state;
        if (loading) {
            return null;
        }
        if (error) {
            return error.message;
        }
        //return <ReportBanner {...report} />;
        return <div></div>;
    }
}

const styles = {
    container: {
        flex: 1,
    },
    patientName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    patientInfo: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
    },
};
