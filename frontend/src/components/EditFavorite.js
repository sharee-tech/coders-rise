import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function EditFavorite(props) {
  const [appStatus, setAppStatus] = useState(0);
  const [notes, setNotes] = useState("");
  // const location = useLocation();
  // const { college } = location.state["college"];
  // const [fav, setFav] = useState({ college });
  // const { state } = props.location;
  // const { name, as, customNotes } = state;

  return (
    <>
      <p>School Name: </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // axios call to write to MySQL database table
        }}
      >
        <div className="form-group">
          <label htmlFor="appStatus">Application Status</label>
          <select
            value={appStatus}
            className="form-select"
            onChange={(e) => setAppStatus(e.target.value)}
          >
            <option value={0} key={0}>
              Researching
            </option>
            <option value={1} key={1}>
              Applied
            </option>
            <option value={2} key={2}>
              Rejected
            </option>
            <option value={3} key={3}>
              Accepted
            </option>
          </select>
          <textarea
            className="form-control"
            // placeholder="Leave a comment here"
            // id="floatingTextarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          >
            {notes}
          </textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button type="submit" className="btn btn-danger">
          Delete Favorite College
        </button>
      </form>
    </>
  );
}
