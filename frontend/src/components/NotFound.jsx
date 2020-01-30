import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Main.css";
import WelcomeText from "./bricks/WelcomeText";

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"login_box"}>
                <WelcomeText
                    value={"Эту страницу еще не создали (404)"}
                />

                <ul className={"login_questions_box"}>
                    <li key={this.props.unauthPages[0].pageId}>
                        <Link to={"/"} className={"login_question"}>
                            {this.props.unauthPages[0].name}
                        </Link>
                    </li>
                    <li key={this.props.mainPages[0].pageId}>
                        <Link to={"/clients"} className={"login_question"}>
                            {this.props.mainPages[0].name}
                        </Link>
                    </li>
                </ul>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.general,
    };
};

const NotFoundWrapped =
    connect(mapStateToProps, null)(NotFound);

export default NotFoundWrapped;