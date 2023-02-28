import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../../config";
import UserContext from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faSignOut } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const userContextData = useContext(UserContext);
  const navigate = useNavigate();
  const Home = () => {
    navigate("/Portal/Dashboard");
  };

  const formik = useFormik({
    initialValues: {
      keyword: "",
    },

    onSubmit: async (values) => {
      if (values) {
        try {
          const key = values.keyword;
          let userData = await axios.get(
            `${config.api}/link/questions/${key}`,
            {
              headers: {
                Authenticate: `${localStorage.getItem("react_token")}`,
              },
            }
          );
          userContextData.setquestions(userData.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        let userData = await axios.get(`${config.api}/link/questions`, {
          headers: {
            Authenticate: `${localStorage.getItem("react_token")}`,
          },
        });
        userContextData.setquestions(userData.data);
      }
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let userData = await axios.get(`${config.api}/user/userDetails`, {
        headers: {
          Authenticate: `${localStorage.getItem("react_token")}`,
        },
      });
      userContextData.setLoginPerson(userData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const doLogout = () => {
    if (window.confirm("Do you really want to Logout?")) {
      try {
        localStorage.removeItem("react_token");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top ml-2 mr-2"
      style={{ backgroundColor: "#e3f2fd !important" }}
    >
      <div className="col-lg-4 ml-2">
        <button className="btn navbar-brand col px-md-4" onClick={() => Home()}>
          <FontAwesomeIcon icon={faHome} color={"orange"} />
          Stack <b>overflow</b>
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="col-lg-4 ">
        <form onSubmit={formik.handleSubmit}>
          <div className="col d-flex justify-content-center">
            <input
              className="form-control mr-sm-2"
              type="text"
              value={formik.values.keyword}
              onChange={formik.handleChange}
              name={"keyword"}
              placeholder="Search with Related to"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0 m-2"
              type={"submit"}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      </div>

      <div className="col-lg-4 ">
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <div className="nav-item nav-link" href="#">
              Welcome <b>{userContextData.LoginPerson.username}</b>
            </div>
            <Link to="/Portal/Profile" className="btn btn-info m-2">
              View Profile
            </Link>
            <button
              className="btn btn-outline-danger m-2"
              onClick={() => {
                doLogout();
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faSignOut} /> Logout{" "}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
