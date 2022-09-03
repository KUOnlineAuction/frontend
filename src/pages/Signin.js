const Signin = () => {
	return (
		<>
		<h1>Sign In</h1>
		<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Sign Up</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Log In</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
		<form>
		<label className="form-label">Username</label>
		<input className="form-control" type="username"></input>
		<label className="form-label">Password</label>
		<input className="form-control" type="password"></input>
		<label className="form-label">Confirm Password</label>
		<input className="form-control" type="password"></input>
		</form>
	</div>
  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
		<form>
		<label className="form-label">Username</label>
		<input className="form-control" type="username"></input>
		<label className="form-label">Password</label>
		<input className="form-control" type="password"></input>
		</form>
	</div>
</div>

		</>
	)
}

export default Signin;
