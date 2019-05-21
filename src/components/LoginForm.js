import React, { Component } from 'react';
import client from '../client.js'
import TextInput from '../components/Form/TextInput'
import Password from '../components/Form/Password'
import validate from '../components/Form/validate'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Login.css';

class LoginForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: [],
      // inputUsername: "",
      // inputPassword: "",
      isExist: false,
      formControls: {
        username: {
          value: '',
          valid: false,
          placeholder: 'Username:',
					touched: false,
          validationRules: {
            isRequired: true
          }         
        },
        password: {
          value: '',
          valid: false,
          placeholder: 'Password:',
					touched: false,
          validationRules: {
            isRequired: true
          }         
        },
      }
    };
  
    // this.inputUsernameChanged = this.inputUsernameChanged.bind(this);
    // this.inputPasswordChanged = this.inputPasswordChanged.bind(this);
    this.loginButtonClicked = this.loginButtonClicked.bind(this); 
  }

  componentDidMount(){
    client.getUsers((users) => {
      this.setState({
        users: users
      });
    });
  }

  onLogRegisterButtonClick = () => {
      this.props.onLogRegisterButtonClick()
  }

  // inputUsernameChanged(event) {
  //   this.setState({
  //     inputUsername: event.target.value
  //   });
  // }
  
  // inputPasswordChanged(event) {
  //   this.setState({
  //     inputPassword: event.target.value
  //   });
  // }
  
  
  loginButtonClicked() {

    var inputUsername = this.state.formControls.username.value;
    var inputPassword = this.state.formControls.password.value;

    for(var i=0; i<this.state.users.length; i++){
     if (this.state.users[i].username === inputUsername && this.state.users[i].password === inputPassword){
      this.setState({
        isExist: true,
       })
     }
    }

    if(inputUsername.length<=0 || inputPassword.length<=0){
      alert('Please, fill all fields!')
    }
    else if (!this.state.isExist){
      alert('No such user. Please, try again!' + this.state.isExist)
    }
    else{
      alert('Welcome' + inputUsername)
      this.props.onLoginButtonClick({username: inputUsername, isAuthorized: true})
    }

    this.setState({
      // inputUsername: "",
      // inputPassword: "",
      inputConfPassword: ""
    });
  }

  changeHandler = event => {
    
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    console.log(value);
    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });

  }

  formSubmitHandler = () => {
    const formData = {};
    	for (let formElementId in this.state.formControls) {
	      formData[formElementId] = this.state.formControls[formElementId].value;
	    }
    
    	this.loginButtonClicked();
  }


  render() {
    return (
      /*<div className="login">

         <h3>Login</h3>
      
 

      <TextInput className="user" name = "username" placeholder={this.state.formControls.username.placeholder}
                               value={this.state.formControls.username.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.username.touched}
                               valid={this.state.formControls.username.valid}/>
      <Password className="password" name = "password" placeholder={this.state.formControls.password.placeholder}
                               value={this.state.formControls.password.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.password.touched}
                               valid={this.state.formControls.password.valid}/>
      
      
                              
      <button className="login-btn" onClick={this.formSubmitHandler} disabled={!this.state.formIsValid} > Login </button>  

      <h5>Don't have an accout?</h5>
      <button className="reg-btn" onClick = {this.onLogRegisterButtonClick}>Register</button>
      </div>*/
<body>
<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
			</div>
			<div class="card-body">
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><img src={require('../images/user-silhouette.png')} alt=""/></span>
						</div>
						<input type="text" class="form-control" name = "username" placeholder={this.state.formControls.username.placeholder}
                               value={this.state.formControls.username.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.username.touched}
                               valid={this.state.formControls.username.valid}/>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><img src={require('../images/key.png')} alt=""/></span>
						</div>
						<input type="password" class="form-control" name = "password" placeholder={this.state.formControls.password.placeholder}
                               value={this.state.formControls.password.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.password.touched}
                               valid={this.state.formControls.password.valid}/>
					</div>
					<div class="row align-items-center remember">
						<input type="checkbox"/>Remember Me
					</div>
					<div class="form-group">
						<input onClick={this.formSubmitHandler} disabled={!this.state.formIsValid} value="Login" class="btn float-right login_btn"/>
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?<a onClick={this.onLogRegisterButtonClick} href="#">Sign Up</a>
				</div>
				<div class="d-flex justify-content-center">
					<a href="#">Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
</body>

    );
  }
}

export default LoginForm;
