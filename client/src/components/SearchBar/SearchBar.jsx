import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
		<div>
			
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Search dog"
						onChange={e => handleInputChange(e)}
						value={name}
					/>
					<input type="submit" value="Search" />
				</form>
			</div>
		</div>
	);
}