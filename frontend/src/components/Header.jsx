import React from "react";
import {Link} from "react-router-dom";
import { connect  } from "react-redux";
import userAction from "../actions/user";
import { bindActionCreators } from "redux";

import "./Main.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <p className={"logo"}>
                    Samantha
                </p>

                <div className={"menu_link_box"}>
                    <ul className={"main_menu"}>
                        {
                            this.props.mainPages.map((obj) =>{
                                return (
                                    <li key={obj.pageId}>
                                        <Link to={obj.path} className={"main_menu_item"}>{obj.name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <div className={"menu_link_box"}>
                        <ul className={"auth_menu"}>
                         {
                             this.props.additionalPages.map((obj) => {
                                 return (
                                     <li key={obj.pageId}>
                                         <Link to={obj.path}
                                               className={"auth_menu_item"}
                                               onClick={this.props.actions.ExitFromAccount}
                                         >{obj.name}</Link>
                                     </li>
                                 )
                             })
                         }
                        </ul>
                </div>

                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        mainPages: state.general.mainPages,
        additionalPages: state.general.additionalPages,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userAction, dispatch)
    };
};

const HeaderWrapped =
    connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderWrapped;