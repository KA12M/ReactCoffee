import React from "react";
import { Link } from "react-router-dom";

class ItemNav extends React.Component {
  render() {
    return (
      <>
        <li className={"sidebar-item"}>
          <Link
            to={this.props.toLink}
            className="sidebar-link "
            // onClick={this.props.activeitem.bind(this,this.props.item)}
          >
            <i className={" " + this.props.icon}></i>
            <span>{this.props.item}</span>
          </Link>
          <ul className="submenu ">
            <li className="submenu-item ">
              <a href="component-alert.html">Alert</a>
            </li>
          </ul>
        </li>
      </>
    );
  }
}

export default ItemNav;
