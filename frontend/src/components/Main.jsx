import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginIntoAccount from "./LoginIntoAccount";
import ForgotPass from "./ForgotPass";
import Registration from "./Registration";
import Header from "./Header";
import Clients from "./Clients";
import ColleaguesList from "./Colleagues";
import CommonTasks from "./Tasks";
import Statistics from "./Statistics";
import PersonalAccount from "./PersonalAccount"
import NotFound from "./NotFound";

class Main extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/"} exact render={() => {
                        return <LoginIntoAccount/>
                    }}/>

                    <Route path={"/recover"} exact render={() => {
                        return <ForgotPass/>
                    }}/>

                    <Route path={"/registration"} exact render={() => {
                        return <Registration/>
                    }}/>

                    <Route path={"/clients"} exact render={() => {
                        if (this.props.isLoggedIn) {
                        return <div className={"main"}>
                                <Header/>
                                <Clients/>
                            </div>
                        } else {
                            return <Redirect to={"/"} />
                        }
                    }}/>


                    <Route path={"/colleagues"} exact render={() => {
                        if (this.props.isLoggedIn) {
                            return <div className={"main"}>
                                <Header/>
                                <ColleaguesList/>
                            </div>
                        } else {
                            return <Redirect to={"/"} />
                        }
                    }}/>

                    <Route path={"/tasks"} exact render={() => {
                        if (this.props.isLoggedIn) {
                            return <div className={"main"}>
                                <Header/>
                                <CommonTasks/>
                            </div>
                        } else {
                            return <Redirect to={"/"} />
                        }
                    }}/>


                    <Route path={"/statistics"} exact render={() => {
                        if (this.props.isLoggedIn) {
                            return <div className={"main"}>
                                <Header/>
                                <Statistics />
                            </div>
                        }
                    }}/>

                    <Route path={"/account"} exact render={() => {
                        if (this.props.isLoggedIn) {
                            return <div className={"main"}>
                                <Header/>
                                <PersonalAccount/>
                            </div>
                        } else {
                            return <Redirect to={"/"} />
                        }
                    }}/>

                    <Route return component={NotFound}/>

                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        userLogin: state.user.userLogin,
        isLoggedIn: state.user.isLoggedIn,
        unauthPages: state.general.unauthPages,
        mainPages: state.general.mainPages,
    }
};

export default connect(mapStateToProps, null)(Main);