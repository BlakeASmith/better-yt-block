import { Button } from "@material-ui/core";
import React from "react";

type UIState = {
  show: boolean;
};


type UIProps = {
  blocked: Array<string>; 
};

export class UI extends React.Component<UIProps, UIState> {
  blocked: Array<string>;

  constructor(props: UIProps) {
    super(props);

    this.blocked = props.blocked

    this.state = {
      show: false,
    } as UIState;

    this.show = this.show.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.show ? null : (
          <Button onClick={this.show}>Block A Channel</Button>
        )}

        <div>
            {this.state.show ? this.blocked.map((s) => (
              <span>
                <li style={{float: "left"}}>{s}</li>
                <button>Unblock</button>
              </span>
            )) : (null)}
        </div>

        {this.state.show ? (
          <form onSubmit={this.onSubmit}>
            <label>
              Name:
              <input type="text" name="channel" />
            </label>
            <input type="submit" value="Block" />
          </form>
        ) : null}
      </div>
    );
  }

  show(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    this.setState({
      show: !this.state.show,
    });
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    this.setState({ show: false });

    console.log("SUBMIT")                        
  }
}
