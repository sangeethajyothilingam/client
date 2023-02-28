import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";

function Askquestion() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      topic: "",
      question: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.topic) {
        errors.topic = "Topic required";
      }

      if (!values.question) {
        errors.question = "Please enter the question";
      } else if (values.question.length < 5) {
        errors.question = "Length should be more than 5 Characters";
        return errors;
      }
    },
    onSubmit: async (values) => {
      try {
        const question = await axios.post(`${config.api}/Askquestion`, values, {
          headers: {
            Authorization: `${localStorage.getItem("react_token")}`,
          },
        });
        alert(question.data.message);
        navigate("/Portal/Dashboard/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container">
      <h5>Ask a public question </h5>
      <div className="row">
        <form onSubmit={formik.handleSubmit}>
          <div className="col-lg-12 m-5">
            <input
              type={"text"}
              name={"topic"}
              value={formik.values.topic}
              onChange={formik.handleChange}
              placeholder="Enter topic"
              className={`form-control ${
                formik.errors.topic ? "error-border" : ""
              } `}
            />
            {formik.errors.topic ? (
              <span style={{ color: "brown" }}> {formik.errors.topic}</span>
            ) : null}
          </div>
          <div className="col-lg-12 m-5">
            <textarea
              type={"text"}
              rows={"2"}
              cols={"50"}
              className="form-control form-control-user"
              name={"question"}
              onChange={formik.handleChange}
              value={formik.values.question}
              placeholder="Enter your Question..."
            />
            {formik.errors.question ? (
              <span style={{ color: "brown" }}> {formik.errors.question}</span>
            ) : null}
          </div>
          <div className="col-lg-12 m-5">
            <button
              type={"submit"}
              className="btn btn-success btn-user btn-block m-2"
            >
              submit question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Askquestion;
