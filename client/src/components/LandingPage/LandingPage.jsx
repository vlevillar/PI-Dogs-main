import React from "react";
import { Link } from "react-router-dom";
import "./LandingPageStyle.css"


export const LandingPage = () => {
	return (
		<div className="landing">
			<h1 className="landingTitle">Welcome to my Dogs individual proyect!</h1>
			<h2 className="landingSubTitle">“Dogs are not our whole life, but they make our lives whole.”</h2>
			<Link to="/home" style={{ textDecoration: "none" }}>
				<div className="wrap">
					<button className="button">Enter</button>
				</div>
			</Link>
		</div>
	);
};
