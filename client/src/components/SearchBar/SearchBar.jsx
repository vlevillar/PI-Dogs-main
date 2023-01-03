import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./SearchBarStyle.css"
import { getDogName } from "../../redux/actions";

export default function Buscador({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	function handleInputChange(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!name) {
			alert("Dede ser escribir el nombre de algun perro.");
		}
		dispatch(getDogName(name));
		setName("");
		setCurrentPage(1);
	}
	return (
		<div className="wrap">
			
			<div className="search">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Search dog"
						onChange={e => handleInputChange(e)}
						value={name}
						className="searchTerm"
					/>
					<input type="submit" value="Search" className="searchButton" />
				</form>
			</div>
		</div>
	);
}