import React from "react";
import { FhirClientContext } from "../FhirClientContext";

function GetPractitioners(bundle) {
    /**
     * Return a list of n-tuples, containing the following fields
     *  (practitioner_name, practitioner_id, last_visited_date)
     */
    let encounterEntries = bundle.entry;
    console.log(bundle)
    return <p>{encounterEntries}</p> ;

}

export default class Practitioners extends React.Component {
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            encounter: null,
            error: null
        };
    }

    componentDidMount() {
        const client = this.context.client;
        const patientID = "bcd401f1-813b-48fc-9c23-30ed553db0a2"
        client.request("Encounter?patient=" + patientID).then(console.log).catch(console.error);
        this._loader = client.request("Encounter?patient=" + patientID).then(
            encounter => {
                this.setState({encounter, loading: false, error: null});
            }
        ).catch(error => {
            this.setState({ error, loading:false});
        });
    }

    render() {
        const {error, loading, practitioners, encounter} = this.state;
        if (loading) {
            return null;
        }
        if (error) {
            return error.message;
        }

        return <GetPractitioners {...encounter} />;
    }
}