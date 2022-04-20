import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HeaderPage extends Component {
  render() {
    return (
      <>
        <div className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="breadcrumb__text">
                  <h2>{this.props.title}</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="breadcrumb__links">
                  <Link to="/">หน้าหลัก</Link>
                  {this.props.linkList?this.props.linkList.map((res, i) => (
                    <Link key={i} to={res.to}>{res.title}</Link>
                  )):""}
                  <span>{this.props.tailing}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
