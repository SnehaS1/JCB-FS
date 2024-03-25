import { Link, useMatch, useResolvedPath } from "react-router-dom"
// import "./styles.css";


export default function Sidebar() {
  return (
    <div className="sidebar">
        <a className="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
    </div>
  )
}
