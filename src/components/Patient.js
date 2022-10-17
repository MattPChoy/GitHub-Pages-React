import React from "react";
import { FhirClientContext } from "../FhirClientContext";
import { setName } from './states/name'
import { setDOB } from './states/DOB'

function PatientName({ name = [] }) {
    let entry =
        name.find(nameRecord => nameRecord.use === "official") || name[0];
    if (!entry) {
        return <h1>No Name</h1>;
    }
    return <h1 style={styles.patientName}>{entry.given.join(" ") + " " + entry.family}</h1>;
}

function PatientBanner(patient) {
    return (
        <div>
            <PatientName name={patient.name} />
            <span>
                Gender: <b>{patient.gender}</b>,{" "}
            </span>
            <span>
                DOB: <b>{patient.birthDate}</b>
            </span>
        </div>
    );
}

export default class Patient extends React.Component {
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            patient: null,
            error: null
        };
    }
    componentDidMount() {
        const client = this.context.client;
        //client.request("DiagnosticReport?patient=${client.patient.id}").then(console.log).catch(console.error);
        this._loader = client.patient
            .read()
            .then(patient => {
                this.setState({ patient, loading: false, error: null });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error, loading: false });
            });
    }
    render() {
        const { error, loading, patient } = this.state;
        if (loading) {
            return null;
        }
        if (error) {
            return error.message;
        }
        setName(patient.name[0].given + " " + patient.name[0].family);
        setDOB(patient.birthDate);
        console.log(patient.birthDate);
        return <PatientBanner {...patient} />;
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
