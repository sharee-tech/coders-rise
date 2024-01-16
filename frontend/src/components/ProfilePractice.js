// import React from "react";
// import AuthService from "../services/auth.service";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CollegeDataService from "../services/CollegeService";
import UserContext from "../UserContext";

const ProfilePractice = ({ userId }) => {
  // const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  // get user/userid from context
  const { currentUser } = useContext(UserContext);
  // State variables for EditFavorite component
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(currentUser.email);

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // axios call to write to MySQL database table
          console.log("hit submit");

          const dataForDb = {
            email: email,
            password: password,
            username: username,
          };
          // CollegeDataService.updateUser(currentUser.id, dataForDb).then(
          //   (res) => {
          //     if (res.data.accessToken) {
          //       localStorage.setItem("user", JSON.stringify(res.data));
          //     }
          //     navigate("/account"); // reload page
          //   }
          //   //SHOULD PROBABLY CONSIDER HANDLING ERROR CONDITION?
          // );

          CollegeDataService.updateUser(currentUser.id, dataForDb)
            .then((res) => {
              // console.log("response: ", res);

              // Update local storage only after a successful update
              localStorage.setItem("user", JSON.stringify(res.data));
              // console.log(
              //   "Local storage updated:",
              //   localStorage.getItem("user")
              // );

              navigate("/account"); // reload page
            })
            .catch((error) => {
              // Handle error condition
              console.error("Error updating user:", error);
              // You might want to provide user feedback on the error
            });
        }}
      >
        <div className="mb-3 mt-3">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <button type="submit" className="mt-3 me-3 btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePractice;
