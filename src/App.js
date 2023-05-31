import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Membership from "./Pages/Membership";
import Navbar from "./components/Navbar";
import Event from "./Pages/Event";
import Courses from "./Pages/Courses";
import Contact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import AboutUs from "./Pages/AboutUs";
import BecomeTeacher from "./Pages/BecomeTeacher";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Course from "./Pages/Course";
import Blog_info from "./Pages/Blog_info";
import Video from "./Pages/Video";
import Instructor_Login from "./Pages/Instructor_Login";
import AppContext from "./Context/context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./Pages/ResetPassword";
import Success from "./Pages/Success";


function App() {
  return (
    <>
      <BrowserRouter>
      
        <AppContext>


          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<Course />} />
            <Route path="/courses/:id/lessons" element={<Video />} />
            <Route path="/membership" element={<Membership />} />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/events" element={<Event />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:id" element={<Blog_info />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/become_a_teacher" element={<BecomeTeacher />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/success" element={<Success />} />
          </Routes>
          <ToastContainer/>
        </AppContext>
      </BrowserRouter>
    </>
  );
}

export default App;
