import React from "react";

class LoadingPage extends React.Component { 
  render() {
    return (
      <div>
        {this.props.status === false ? (
          ""
        ) : (
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Loading...
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default LoadingPage;
