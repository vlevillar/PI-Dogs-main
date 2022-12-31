import React from "react";
import { Link } from "react-router-dom";
import "./CardStyle.css";

export const Card = ({ name, image, temperament, weight, id }) => {
	return (
		<div className="card">
			<div className="face front">
				<img src={image} alt="imagen no encontrada"/>
				<h3>{name}</h3>
			</div>
			<div className="face back">
				<h3>{name}</h3>
				<h2>{temperament}</h2>
				<h3>{weight}</h3>
				<button className="link">
					<Link to={`/home/${id}`}>{name}</Link>
				</button>
			</div>
		</div>
	);
};