import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import $ from "jquery"

import NavbarPublic from "../components/navbar.public";
function MainPublic() {
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
  });
  return (
    <>
      {/* <div id="preloder">
        <div className="loader"></div>
      </div> */}

      <NavbarPublic />

      <Outlet />
    </>
  );
}

export default MainPublic;
