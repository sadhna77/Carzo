// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Contact from "./components/ui/Contact"; // Make sure it's a default export
import { Dashboard } from "./components/ui/Dashboard";
import { BuyCar } from "./components/ui/BuyCar";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { Admin } from "./components/ui/Admin";
import { AdminSign } from "./components/ui/AdminSign";
import { Admindashboard } from "./components/ui/Admindashboard";
import { BoughtCar } from "./components/ui/BoughtCar";
import { Wishlist } from "./components/ui/Wishlist";
import { Profile } from "./components/ui/Profile";










function App() {
  return (
    <Router>
       <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/buycar/:name" element={<ProtectedRoute><BuyCar/></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
        <Route path="/admin-signup" element={<ProtectedRoute><AdminSign/></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><Admindashboard/></ProtectedRoute>} />
        <Route path="/bought" element={<ProtectedRoute><BoughtCar/></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
