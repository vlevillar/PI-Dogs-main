import React from "react";
import { Link } from "react-router-dom";
import "./CardStyle.css";

export const Card = ({ name, image_url, bred_for, id }) => {
	return (
		<div className="card">
			<div className="face front">
				<img src={image_url} alt="imagen no encontrada" />
				<h3>{name}</h3>
			</div>
			<div className="face back">
				<h3>{name}</h3>
				<h5>{bred_for}</h5>
				<button className="link">
					<Link to={`/home/${id}`}>{id}</Link>
				</button>
			</div>
		</div>
	);
};