import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(name) {
    const res = await this.request("companies", { name });
    return res.companies;
  }

  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async getJobs(filters = {}) {
    const res = await this.request("jobs", filters);
    return res.jobs;
  }

  static async login(data) {
    try {
      const res = await this.request("auth/token", data, "post");
      this.token = res.token;
      localStorage.setItem("token", res.token);
      return res.token;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  static async signup(data) {
    const res = await this.request("auth/register", data, "post");
    this.token = res.token;
    localStorage.setItem("token", res.token);
    return res.token;
  }

  static logout() {
    this.token = null;
    localStorage.removeItem("token");
  }

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updatedUser(username, userData) {
    if (!userData.password || userData.password.length < 5) {
      console.warn("Enter a password with at least 5 characters to update.");
      throw new Error(
        "Password is required and must be at least 5 characters."
      );
    }
    try {
      const res = await this.request(`users/${username}`, userData, "patch");
      return res.user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async applyToJob(username, jobId) {
    const res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      "post"
    );
    return res.applied;
  }
  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
