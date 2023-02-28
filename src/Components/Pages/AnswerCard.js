import { config } from "../../config";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function AnswerCard({ data }) {
  const [loading, setLoading] = useState(false);
  const [votes, setvotes] = useState(data.votes);
  const handleVotes = async (data) => {
    setLoading(true);
    setvotes((data.votes = data.votes + 1));
    try {
      await axios.put(`${config.api}/addVotes/${data._id}`, data, {
        headers: {
          Authorization: `${localStorage.getItem("react_token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{data.answer}</h5>

        <div className="d-flex justify-content-around">
          <div className="d-flex justify-content-start">
            <button
              disabled={loading}
              onClick={() => handleVotes(data)}
              className="btn btn-primary m-2"
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
          </div>
          <div className="col d-flex justify-content-end">
            <p className="m-2">Votes: {votes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
