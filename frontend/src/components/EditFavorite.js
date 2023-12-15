import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const userId = 152;

export default function EditFavorite({ collegeId }) {
  // Data passed over from React-Router (exists on location)
  // Data contains {name, appStatus, notes}
  const location = useLocation();
  const { data } = location.state;

  // State variables for EditFavorite component
  const [collegeName, setCollegeName] = useState(data.name);
  const [appStatus, setAppStatus] = useState(data.appStatus);
  const [notes, setNotes] = useState(data.notes);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            `Saved App CollegeId ${collegeId} and Status: ${appStatus} and Notes: ${notes}`
          );
          // axios call to write to MySQL database table
          const dataForDb = { app_status: appStatus, notes: notes };
          axios.update(userId, { dataForDb }).then((res) => {
            console.log(res);
          });
        }}
      >
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Disabled input"
            aria-label="Disabled input example"
            disabled
            value={data.name}
          ></input>

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
          <label htmlFor="notes">Notes</label>
          <textarea
            className="form-control"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          >
            {notes}
          </textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button type="button" className="btn btn-danger">
          Delete Favorite College
        </button>
      </form>
    </>
  );
}
