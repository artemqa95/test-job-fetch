import React from "react";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";
import {autoLogin} from './store/actions/auth'
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import Main from "./components/Main/Main";
class App extends React.Component {
    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = (<Switch>
            <Route path={'/auth'} component={Auth}/>
            <Redirect to={'/auth'}/>
        </Switch>)
        if (this.props.isAuthenticated) {
            routes = (<Switch>
                <Route path={'/logout'} component={Logout}/>
                <Route path={'/'} exact component={Main}/>
                <Redirect to={'/'}/>
            </Switch>)
        }
        return (
            <div className="App">
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

