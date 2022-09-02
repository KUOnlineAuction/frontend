import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

// App
function App() {
  return (
	  <BrowserRouter>
		  <Routes>
		  <Route path="/" element={<Layout />}>
			  <Route index element={<Home />} />
			  <Route path="*" element={<NoPage />} />
		  </Route>
		  </Routes>
	  </BrowserRouter>
  );
}

export default App;
