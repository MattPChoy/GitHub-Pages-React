import * as React from "react";
import { FhirClientContext } from "../FhirClientContext";
import BoxComponent from "./BoxComponent";
import {setReports, getReports } from './states/reports'


  export default class CreateReferral extends React.Component {
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
        this.state = {
            listOfReports: null,
        };
    }
    componentDidMount() {
        const client = this.context.client;
        this._loader = client.request("DiagnosticReport?patient=bcd401f1-813b-48fc-9c23-30ed553db0a2").then(
            report => {
                let collected = {};
                for (var key in report.entry) {

                    collected[report.entry[key].resource.code.coding[0].display] = report.entry[key].resource.issued;

                }
                this.setState({ listOfReports: collected });
                console.log(collected);
                
                
                //return collected;
            }
        ).catch(error => {
            this.setState({ listOfReports: {} });
        });
        
    }
    render() {
        
        console.log("Part 2 ");
        console.log(getReports());
        const allReports = this.state.listOfReports;
        setReports(allReports);
        console.log(allReports);
        //set(allReports);
        console.log("Part 3 ");
        
        console.log(getReports());
        


        return <BoxComponent {...allReports} />;

    }
}
