import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import logo from "../../logo.svg";
import "./Header.scss";
import {
  getMovies,
  setMovieType,
  setResponsePageNumber,
} from "../../redux/actions/movies";

const HEADER_LIST = [
  {
    id: 1,
    iconClass: "fas fa-film",
    name: "Now Playing",
    type: "now_playing",
  },
  {
    id: 2,
    iconClass: "fas fa-fire",
    name: "Popular",
    type: "popular",
  },
  {
    id: 3,
    iconClass: "fas fa-star",
    name: "Top Rated",
    type: "top_rated",
  },
  {
    id: 4,
    iconClass: "fas fa-plus-square",
    name: "Upcoming",
    type: "upcoming",
  },
];

const Header = (props) => {
  const { getMovies, setMovieType, page, totalPages } = props;
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState("now_playing");

  const setMovieTypeUrl = (type, name) => {
    setType(type);
    setMovieType(name);
  };

  const toggleMenu = () => {
    menuClass = !menuClass;
    navClass = !navClass;
    setNavClass(navClass);
    setMenuClass(menuClass);
    if (navClass) {
      document.body.classList.add("header-nav-open");
    } else {
      document.body.classList.remove("header-nav-open");
    }
  };

  useEffect(() => {
    getMovies(type, page);
  }, [type]);

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image">
            <img src={logo} alt="" />
          </div>
          <div
            className={`${
              menuClass ? "header-menu-toggle is-active" : "header-menu-toggle"
            }`}
            id="header-mobile-menu"
            onClick={() => toggleMenu()}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul
            className={`${
              navClass ? "header-nav header-mobile-nav" : "header-nav"
            }`}
          >
            {HEADER_LIST.map((data) => (
              <li
                key={data.id}
                className="header-nav-item"
                onClick={() => setMovieTypeUrl(data.type, data.name)}
              >
                <span className="header-list-name">
                  <i className={data.iconClass}></i>
                </span>
                &nbsp;
                <span className="header-list-name">{data.name}</span>
              </li>
            ))}
            <input
              type="text"
              name=""
              id=""
              className="search-input"
              placeholder="search movie"
            />
          </ul>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  getMovies: PropTypes.func,
  setMovieType: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
});

export default connect(mapStateToProps, {
  getMovies,
  setMovieType,
  setResponsePageNumber,
})(Header);
