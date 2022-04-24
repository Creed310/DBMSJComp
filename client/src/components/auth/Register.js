import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      MobileNumber: "",
      Password: "",
      Password2: "",
      C_First_Name: "",
      C_Middle_Name: "",
      C_Last_Name: "",
      Aadhar_Number: "",
      Occupation: "",
      City: "",
      DoB: "",
    //   //Customer_ID: req.body.CustomerID,
    //   MobileNumber: req.body.MobileNumber,
    //   Password: req.body.Password,
    //   Password: req.body.Password2, 
    //   C_First_Name: req.body.C_First_Name,
    //   C_Middle_Name: req.body.C_Middle_Name,
    //   C_Last_Name: req.body.C_Last_Name,
    //   Aadhar_Number: req.body.Aadhar_Number,
    //   Occupation: req.body.Occupation,
    //   City: req.body.City,
    //   DoB: req.body.DoB
      errors: {}
    };
  }
onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = (e) => {
    e.preventDefault();
const newCustomer = 
{
      MobileNumber: this.state.MobileNumber,
      Password: this.state.Password,
      Password2: this.state.Password2,
      C_First_Name: this.state.C_First_Name,
      C_Middle_Name: this.state.C_Middle_Name,
      C_Last_Name: this.state.C_Last_Name,
      Aadhar_Number: this.state.Aadhar_Number,
      Occupation: this.state.Occupation,
      City: this.state.City
    };
console.log(newCustomer);
};
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already a customer? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.MobileNumber}
                  error={errors.MobileNumber}
                  id="MobileNumber"
                  type="text"
                />
                <label htmlFor="mobilenumber">MobileNumber</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.C_First_Name}
                  error={errors.C_First_Name}
                  id="C_First_Name"
                  type="text"
                />
                <label htmlFor="c_first_name">First Name</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.C_Middle_Name}
                  error={errors.C_Middle_Name}
                  id="C_Middle_Name"
                  type="text"
                />
                <label htmlFor="c_middle_name">Middle Name</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.C_Last_Name}
                  error={errors.C_Last_Name}
                  id="C_Last_Name"
                  type="text"
                />
                <label htmlFor="c_last_name">Last Name</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Aadhar_Number}
                  error={errors.Aadhar_Number}
                  id="Aadhar_Number"
                  type="text"
                />
                <label htmlFor="aadhar_number">Aadhar Number</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.City}
                  error={errors.City}
                  id="City"
                  type="text"
                />
                <label htmlFor="city">City</label>
              </div>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.DoB}
                  error={errors.DoB}
                  id="DoB"
                  type="date"
                />
                <label htmlFor="dob">Date Of Birth</label>
              </div>
              

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Password}
                  error={errors.Password}
                  id="Password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Password2}
                  error={errors.Password2}
                  id="Password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
