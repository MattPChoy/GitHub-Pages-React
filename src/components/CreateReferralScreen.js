import React from "react";
import CreateReferral from "./CreateReferral";
import FhirClientProvider from "./FhirClientProvider";
import Patient from "./Patient";
import { setName, getName } from './states/name'

/**
 * Wraps everything into `FhirClientProvider` so that any component
 * can have access to the fhir client through the context.
 */
export default function Page() {
    setName("John");
    console.log("At Screen Top ");
    console.log(getName());
    return (
        <FhirClientProvider>            
            <Patient />
            <CreateReferral />
        </FhirClientProvider>
    );
}
