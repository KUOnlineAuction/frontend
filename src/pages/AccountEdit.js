import blank_profile from "../pictures/blank_profile.png";
import { Link } from "react-router-dom";
import { Profiler, useState } from "react";

const AccountEdit = () =>{
    const [prepic, setPrepic] = useState(blank_profile)

    const previewImage = (event)=>{ setPrepic(URL.createObjectURL(event.target.files[0])) }

	return (
        <div className="profile-page d-flex justify-content-between">
            <div>
                <h1>My Profile</h1>
                <div className="main-editing-page">
                    <div>
                        <img className="profile-pic" alt="ProfilePic" id="Profile" src={prepic}/>
                        <label for="input_pic" className="choose-image">Choose Image</label>
                        <input id="input_pic" type="file" className="choose-image" name="yourPic" accept="image/*" onChange={previewImage} hidden/>
                    </div>
                    <div>
                        <div>
                            <label><h5>Name</h5></label><br/>
                            <input type="text" for="Name" className="input-editing" placeholder="Peeranut Srisuthangkul"/>
                        </div>
                        <div>
                            <label><h5>Email</h5></label><br/>
                            <input type="text" for="Email" className="input-editing" placeholder="peeranut.sri@ku.th"/>
                        </div>
                        <div>
                            <label><h5>Phone Number</h5></label><br/>
                            <input type="text" for="Phone Number" className="input-editing" placeholder="06200000000"/>
                        </div>
                        <div>
                            <label><h5>Address</h5></label><br/>
                            <textarea type="text" for="Address" className="input-editing" placeholder="4412 Matlock Rd #200 Arlington Texas United States 76018"/>
                        </div>
                        <div>
                            <label><h5>Description</h5></label><br/>
                            <textarea type="text" for="Description" className="input-editing" rows="5" placeholder="Exercitation sint fugiat et esse ut do quis laboris anim nisi proident ullamco. Sit eu mollit cillum et consequat eu consectetur ad reprehenderit exercitation sunt duis nisi est. Pariatur exercitation commodo non tempor. Fugiat minim velit veniam reprehenderit nulla veniam voluptate adipisicing ullamco culpa incididunt. Sunt irure commodo et ut do aute duis."/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="edit-profile editing">Edit Profile</div>
                <div className="edit-profile">Save Changes</div>
                <div className="edit-profile cancel">
                    <Link to="/account/profile" className="link-button text-body">Cancel</Link>
                </div>
            </div>
        </div>
	)
}
export default AccountEdit;