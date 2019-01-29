import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IAction, IUsername } from "../Interfaces";
import { changeUsername } from "../Reducers/username";

export class UsernamePicker extends PureComponent<IUsername> {
  public changeUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameInput: HTMLInputElement | null = event.currentTarget.querySelector(
      "#username"
    );
    if (
      usernameInput &&
      usernameInput.value &&
      usernameInput.value !== this.props.username
    ) {
      this.props.changeUsername(usernameInput.value);
    }
  };
  public render() {
    return (
      <div className="UsernamePicker">
        <form onSubmit={this.changeUsername}>
          <input
            id="username"
            type="text"
            className="UsernamePicker__input"
            defaultValue={this.props.username}
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
)(UsernamePicker);
