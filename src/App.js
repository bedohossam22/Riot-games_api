import Search from "./components/Search";
import React from "react";
import Api from "./components/Api-page";
import "./App.css";
import "./api.css";
import {  createBrowserRouter , createRoutesFromElements,   Route , RouterProvider} from "react-router-dom";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
       <Route path="/Riot-games_api" index element={<Search/>} />
       <Route path="/api-page" element={<Api />} />
      </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={router}/>
   
    </div>
)}

