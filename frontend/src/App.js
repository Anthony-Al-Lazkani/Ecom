import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import AppContent from "./AppContent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
