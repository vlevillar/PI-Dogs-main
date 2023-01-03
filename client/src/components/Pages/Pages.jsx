import React from "react";
import "./PagesStyle.css";

export default function Pages({ dogsPerPage, paginado, allDog }) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allDog / dogsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div>
			<div className="pagination">
				{pageNumbers &&
					pageNumbers.map(number => {
						return (
						<ul key = {number}>
							<button
								className="number"
								key={number}
								onClick={() => paginado(number)}
							>
								{number}
							</button>
						</ul>
						);
					})}
			</div>
		</div>
	);
}