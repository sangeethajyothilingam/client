import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../../config";
import UserContext from "../../context/UserContext";

function Login() {
  let navigate = useNavigate();
  const userContextData = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        let login = await axios.post(`${config.api}/user/login`, values);
        if (login.data.token) {
          localStorage.setItem("react_token", login.data.token);
          localStorage.setItem("email", login.data.email);
          userContextData.setLoginPerson(login.data.email);
          navigate("/Portal/Dashboard");
        } else {
          alert(login.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container">
      {/* Hello world */}

      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block h-100vh bg-login-image">
                  <img
                    className="card-img-top"
                    src="https://149351115.v2.pressablecdn.com/wp-content/uploads/2018/05/SO_Teams-1200x675.png"
                    alt="Card cap"
                  />
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Welcome to stack overflow
                      </h1>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="user">
                      <div className="form-group">
                        <label className="p-1 text-muted">User Name</label>
                        <input
                          type={"text"}
                          className="form-control form-control-user mb-2"
                          name={"email"}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          placeholder="Enter Email..."
                        />
                      </div>
                      <div className="form-group">
                        <label className="p-1 text-muted">Password</label>
                        <input
                          type={"password"}
                          className="form-control form-control-user"
                          name={"password"}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder="Enter Password..."
                        />
                      </div>
                      <button type={"submit"} className="btn btn-primary mt-2">
                        Login
                      </button>
                      <hr />
                    </form>
                    <div className="row">
                      <Link to="/ForgetPassword">Forgot Password?</Link>
                      <Link to="/createaccount">Create an Account...!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
