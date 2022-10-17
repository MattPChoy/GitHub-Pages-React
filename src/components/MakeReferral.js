import React from "react"
import { FhirClientContext } from "../FhirClientContext"
import Patient from "./Patient"

export default class MakeReferral extends React.Component {
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            patient: null,
            error: null
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <Patient />
            </div>
        )
    }
}
