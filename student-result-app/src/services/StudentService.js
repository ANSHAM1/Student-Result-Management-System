const BASE_URL = "http://localhost:3001";

const studentService = {
  getAll() {
    return fetch(`${BASE_URL}/students`).then((r) => r.json());
  },

  create(data) {
    return fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());
  },

  update(id, data) {
    return fetch(`${BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());
  },

  remove(id) {
    return fetch(`${BASE_URL}/students/${id}`, {
      method: "DELETE",
    }).then((r) => r.json());
  },
};

export default studentService;