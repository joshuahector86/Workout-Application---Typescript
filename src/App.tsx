import { Navigate, Route, Routes } from "react-router-dom";
import { Home, WeightTraining, Mobility, OtherActivities } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weight-training" element={<WeightTraining />} />
      <Route
        path="/weight-training/exercise/:exerciseId"
        element={<WeightTraining />}
      />
      <Route path="/mobility" element={<Mobility />} />
      <Route path="/mobility/exercise/:exerciseId" element={<Mobility />} />
      <Route path="/other" element={<OtherActivities />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
