import { render } from "react-dom";

import App from "./App";

import "../node_modules/playbook-ui/dist/playbook.css";
import "../node_modules/playbook-ui/dist/reset.css";

const rootElement = document.getElementById("root");

render(<App />, rootElement);
