import React from "react";
import "./PagesStyle.css";

export default function Pages({ dogsPerPage, paginado, allDog }) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allDog / dogsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="pagination">
				{pageNumbers &&
					pageNumbers.map(number => {
						return (
							<button
								className="number"
								key={number}
								onClick={() => paginado(number)}
							>
								{number}
							</button>
						);
					})}
			</ul>
		</nav>
	);
}