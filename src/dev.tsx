import { mount } from "./remote";
mount(document.getElementById("root")!, {
  apiBaseUrl: "http://localhost:4201/api/v1.0.2",
});
