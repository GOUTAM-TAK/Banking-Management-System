import React, { useState } from 'react';
import BankServices from '../../BankService/BankServices';
import { HttpStatusCode } from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like sending the email and password to your server for authentication
    console.log('Submitted:', { email, password });
    BankServices.employeeLogin({email:email,password:password}).then((obj)=>displayMassage(obj));
  }
  function displayMassage(obj) {
    const message = document.getElementById("message");
    var bool=obj.status===HttpStatusCode.Ok ? true:false;
    if (bool) {
      message.textContent = "Successfully login !";
      message.style.color = "green";
    if( obj.data.role==='ADMIN')
      history.push("/admin/welcome");
    else if( obj.data.role==='MANAGER')
    history.push("/employee/welcome");
    } else {
      message.textContent = "Problem with Server !";
      message.style.color = "red";
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <h1 id='message'></h1>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
// @NotBlank(message = "Email can't be blank")
// @Email(message = "Invalid email format")
// private String email;
// //	@NotBlank
//  @Pattern(regexp = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/")
// @Length(min = 3,max=20,message = "Invalid password length")
// private String password;