import React from "react";
import { FhirClientContext } from "../FhirClientContext";

function display(data) {
    const name = data.name;
    const output = document.getElementById("providerName");
    output.innerText = name instanceof Error ?
        String(name) :
        JSON.stringify(name, null, 4);
}

export default class Patient extends React.Component {
  static contextType = FhirClientContext;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      client: null,
      encounter: null,
      error: null
    };
  }

  componentDidMount() {
    const client = this.context.client;
    this._loader = client.encounter
      .read()
      .then((encounter) => {
        this.setState({ client: client, encounter: encounter, loading: false, error: null });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }
  render() {
    const client = this.context.client;
    const { error, loading, encounter } = this.state;
    if (loading) {
      return null;
    }
    if (error) {
      return error.message;
    }

    // return <Banner {...client} />;
    let serviceProviderID = encounter.serviceProvider.reference;
    let serviceProvider = client.request(serviceProviderID).then(display).catch(display);
    return (
        <div>
            <span> ID: <b>{JSON.stringify(serviceProviderID)}</b> </span><br></br>
            <span> EncounterResource: <span id="providerName">{JSON.stringify(serviceProvider)}</span></span>
        </div>
    )
  }
}
