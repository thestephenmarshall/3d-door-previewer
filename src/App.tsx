import "./styles.css";

import Viewer from "./components/Viewer";
import { withProductSelections } from "./hooks/withProductSelections";

export default function App() {
  const [selections] = withProductSelections();
  return <Viewer focus="door" selections={selections} />;
}
