import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from "@mui/material/Divider";
import Grid from '@mui/material/Grid';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import React from "react";
import { FhirClientContext } from "../FhirClientContext";
import Referral from "./Referral";
import ReferralDisplay from "./ReferralDisplay";
import { resetReferralList, setIncoming, setOutgoing, setIncomingState, setOutgoingState, getReferrals, toggleDirection, getState, setActiveReferral, getActiveReferral} from "./states/referrals"
import { getDOB } from './states/DOB';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function CenteredTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        toggleDirection();
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Incoming" />
                <Tab label="Outgoing" />
            </Tabs>
            <br />
            <SearchBar listOfItems={[{ title: 'Physiotherapy', year: 2020 }, { title: 'Cardiology', year: 2020 }]} />
            <br />
            <ReferralList mode={value} handleReferralChange={props.handleReferralChange}/>
        </Box>
    );
}

const listOfItems = [{ title: 'Physiotherapy', year: 2020 }, { title: 'Cardiology', year: 2020 }];

function SearchBar() {
    const fixedOptions = [listOfItems];
    const [value, setValue] = React.useState([...fixedOptions, listOfItems]);
    return (
        <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={value}
            onChange={(event, newValue) => {
                setValue([
                    ...fixedOptions,
                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                ]);
            }}
            options={listOfItems}
            getOptionLabel={(option) => option.title}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        label={option.title}
                        {...getTagProps({ index })}
                        disabled={fixedOptions.indexOf(option) !== -1}
                    />
                ))
            }

            renderInput={(params) => (
                <TextField {...params} label="Fixed tag" placeholder="Favorites" />
            )}
        />
    );
}

class ReferralItem extends React.Component {
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            report: null,
            error: null
        }
    }

    render() {
        return (<ListItem alignItems="flex-start" onClick={this.props.onClick} id={this.props.id}>
            <ListItemAvatar>
                <Avatar> {this.props.avatar} </Avatar>
            </ListItemAvatar>

            <ListItemText primary={this.props.role} secondary={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {this.props.name}
                    </Typography>
                </React.Fragment>
            }
            />
        </ListItem>)
    }
}

class ReferralList extends React.Component {
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            report: null,
            error: null,
            values: null,
        }
    }

    componentDidMount() {
        const client = this.context.client;
        this._loader = client.request("ReferralRequest").then(
            report => {
                this.setState({ report, loading: false, error: null, values: report.entry});
            }
        ).catch(error => {
            this.setState( { error, loading: false });
        });
    }

    render() {
        const referralRequests = this.state.values;
        if (this.state.loading == true) {
            // Not loaded yet
            return (
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ReferralItem avatar={<LogoutIcon/>} role="Loading..." name="Loading..."/>
                    <ReferralItem avatar={<LogoutIcon/>} role="Loading..." name="Loading..."/>
                    <ReferralItem avatar={<LogoutIcon/>} role="Loading..." name="Loading..."/>
                </List>
            );
        }
        else {
            // Finish loading.
            let incoming = [];
            let outgoing = [];

            for (let _ref in this.state.values) {
                let referral = this.state.values[_ref].resource;
                let data = {
                    "id": referral.id,
                    "display": referral.type.coding[0].display,
                    "practitioner":
                        referral.recipient != null ? referral.recipient[0].display : "Dr Anonymous"
                };
                if (referral.recipient==null) {
                    incoming.push(data);
                } else {
                    outgoing.push(data);
                }
            }

            // Set the state of the incoming and outgoing entries.
            setIncoming(incoming);
            setOutgoing(outgoing);

            let a = getReferrals().map(r =>
                    <ReferralItem avatar={getState()?<LoginIcon/>:<LogoutIcon/>} id={r.id}
                        role={r.display} name={r.practitioner} key={r.id} onClick={(e) => {
                            this.props.handleReferralChange(e.target.offsetParent.id);
                        }}/>
            );
            return (
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {a}
                </List>
            );
        }
    }
}

export default class EmailInterface extends React.Component {
    static contextType = FhirClientContext;
    state = {
        currentReferral: "-1",
    };
    handleInputChange = (inputValue) => {
        this.setState({currentReferral: inputValue})
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="EmailInterface">
                <Box sx={{ flexGrow: 1, margin: 3 }}>
                    <Grid container spacing={2} columns={0}>
                        <Grid item xs={4}>
                            <Item>
                                <CenteredTabs handleReferralChange={this.handleInputChange}/>
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <ReferralDisplay currentReferral={this.state.currentReferral}/>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    }
}
