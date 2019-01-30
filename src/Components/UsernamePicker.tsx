import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { generatePath, withRouter } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IAction, IUsername } from "../Interfaces";
import { changeUsername } from "../Reducers/username";

export class UsernamePicker extends PureComponent<IUsername, IUsername> {
  public state: IUsername = {
    username: null
  };
  constructor(props: IUsername) {
    super(props);
    this.state = {
      username: props.username
    };
  }
  public componentWillReceiveProps(nextProps: IUsername) {
    if (nextProps.username !== this.props.username) {
      this.updateUsernameInState(null, nextProps.username);
    }
  }
  public changeUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.username !== this.props.username) {
      this.props.history.push(
        generatePath(`/:username/collection`, { username: this.state.username })
      );
      this.props.changeUsername(this.state.username);
    }
  };
  public updateUsernameInState = (
    event: React.FormEvent<HTMLInputElement> | null,
    usernameOverride: string = ""
  ) => {
    const username: string = event
      ? event.currentTarget.value
      : usernameOverride;
    this.setState({
      username
    });
  };
  public render() {
    return (
      <div className="UsernamePicker">
        <form onSubmit={this.changeUsername}>
          <input
            id="username"
            type="text"
            className="UsernamePicker__input"
            onChange={this.updateUsernameInState}
            value={this.state.username}
          />
          <button type="submit">{"Fetch collection"}</button>
        </form>
      </div>
    );
  }
}

const connectStateToProps = ({ username }: IUsername) => ({
  username
});
const connectDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  changeUsername: bindActionCreators(changeUsername, dispatch)
});

export default connect(
  connectStateToProps,
  connectDispatchToProps
)(withRouter(UsernamePicker));
