import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Launcher from "./Launcher";
import CreateReferralScreen from "./CreateReferralScreen";
import Landing from "./Landing"
import ViewReferralsScreen from "./ViewReferralsScreen";

export default function App() {
    return (
        <BrowserRouter>
            <Route path="/createReferral" component={CreateReferralScreen} />
            <Route path="/viewReferral" component={ViewReferralsScreen} />
            <Route path="/app" component={Landing} />
            <Route path="/" component={Launcher} exact />
        </BrowserRouter>
    );
}
