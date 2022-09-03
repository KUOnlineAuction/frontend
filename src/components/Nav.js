import { Link } from "react-router-dom";

const Nav = () => {
	return (
		<nav className="navbar d-flex">
			{/* Nav Bar BEGIN*/}
			<button className="ms-2 navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-nav">
				<span className="navbar-toggler-icon"></span>
			</button>
			<Link className="navbar-brand me-auto p-2" to="/">Online Auction</Link>
			<form>
				<input id="nav-search" className="form-control me-2" type="search" placeholder="Search"/>
			</form>
			<div className="dropdown ms-auto p-2">
				<Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown">Username</Link>
				<ul className="dropdown-menu dropdown-menu-end ms-auto p-2">
					<li className="dropdown-item">Profile</li>
					<li className="dropdown-item">Bid & Auction</li>
					<li className="dropdown-item">Place Auction</li>
					<li className="dropdown-item">FAQs</li>
					<li className="dropdown-item">Log out</li>
				</ul>
			</div>
			<div className="dropdown p-2">
				<Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown">Noti</Link>
				<ul className="dropdown-menu ms-auto p-2" to="#">
					<li className="dropdown-item"></li>
				</ul>
			</div>
			{/* Nav Bar END*/}

			{/* Offcanvas BEGIN*/}
			<div id="offcanvas-nav" className="offcanvas offcanvas-start ps-4">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title">Auction Online</h5>
					<button className="btn-close" data-bs-dismiss="offcanvas"></button>
				</div>
				<Link id="offcanvas-profile" className="nav-link p-3" to="#">Username</Link>
				<div className="navbar-nav">
					<Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown">Categories</Link>
					<div className="dropdown-menu nav-dropdown show">
						<Link to="#" className="ps-4 dropdown-item nav-link">Home Improvement</Link>
						<Link to="#" className="ps-4 dropdown-item nav-link">Jewellery</Link>
						<Link to="#" className="ps-4 dropdown-item nav-link">Coins, Currency, Stamps</Link>
					</div>
					<Link to="#" className="nav-link nav-item">Currently Bidding</Link>
					<Link to="#" className="nav-link nav-item">Currently on Auction</Link>
					<Link to="#" className="nav-link nav-item">My Following List</Link>
					<Link to="/signin" className="nav-link nav-item">TEMP signin</Link>
				</div>
			</div>
			{/* Offcanvas END*/}
		</nav>
  );
};

export default Nav;
