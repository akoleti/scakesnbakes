import { apiRequest } from "./util.js";

function submit(data) {
  return apiRequest("contact", "POST", data);
}

const contact = { submit };

export default contact;
