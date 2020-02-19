import React from 'react';


export default function Search(props) {
	return (
		<div className="container h-100">
			<div className="d-flex justify-content-center h-100">
				<div className="searchbar">
					<input className="search_input" type="search" placeholder="Search" onChange={props.searchChange} />
					<i class="fas fa-search fa-2x search_icon"></i>
				</div>
			</div>
		</div>
		)}
