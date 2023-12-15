import http from "../http-common";

const getAll = () => {
  return http.get("/colleges");
};

const get = (id) => {
  return http.get(`/colleges/${id}`);
};

const create = (data) => {
  return http.post("/colleges", data);
};

const update = (id, data) => {
  return http.put(`/colleges/${id}`, data);
};

// const remove = id => {
//   return http.delete(`/colleges/${id}`);
// };

// const removeAll = () => {
//   return http.delete(`/colleges`);
// };

const CollegeService = {
  getAll,
  get,
  create,
  // update,
  // remove,
  // removeAll,
};

export default CollegeService;
