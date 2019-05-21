import React, { Component } from 'react';
import client from '../client.js'
import TextInput from '../components/Form/TextInput'
import Password from '../components/Form/Password'
import validate from '../components/Form/validate'
import '../css/Register.css';

class RegistrationForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: [],
      // inputUsername: "",
      // inputPassword: "",
      // inputConfPassword: "",
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
        confirmPassword: {
          value: '',
          valid: false,
          placeholder: 'Confirm password:',
					touched: false,
          validationRules: {
            isRequired: true
          }         
        },
      }
    };

    // this.inputUsernameChanged = this.inputUsernameChanged.bind(this);
    // this.inputPasswordChanged = this.inputPasswordChanged.bind(this);
    // this.inputConfPasswordChanged = this.inputConfPasswordChanged.bind(this);
    this.registerButtonClicked = this.registerButtonClicked.bind(this); 
  }

  componentDidMount(){
    client.getUsers((users) => {
      this.setState({
        users: users
      });
    });
  }

  onRegLoginButtonClick = () => {
    this.props.onRegLoginButtonClick()
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

  // inputConfPasswordChanged(event) {
  //   this.setState({
  //     inputConfPassword: event.target.value
  //   });
  // }

  registerButtonClicked(){
    
    var inputUsername = this.state.formControls.username.value;
    var inputPassword = this.state.formControls.password.value;
    var inputConfPassword = this.state.formControls.confirmPassword.value;

    for(var i=0; i<this.state.users.length; i++){
    if(this.state.users[i].username === inputUsername){
    this.setState({isExist:true})
    }
    }

    if(inputUsername.length<=0 || inputPassword.length<=0 || inputConfPassword.length<=0){
      alert('Please, fill all fields!')
    }
    else if (inputPassword !== inputConfPassword){
      alert('Passwords does not match. Please, try again!')
    }
    else if (this.state.isExist){
      alert('User with such username already exist. Please, try again!')
    }
    else{
      const data = {
        'id': this.state.users[this.state.users.length-1].id + 1,
        'username': inputUsername,
        'password': inputPassword
      }

      client.createUser(data, (user) => {
        if (user)
          alert('Successfully registered!' + this.state.isExist);
          
      }); 

      this.props.onRegisterButtonClick({username: inputUsername, isAuthorized: true})

      this.setState({
        users: [...this.state.users, data],
        // inputUsername: "",
        // inputPassword: "",
        // inputConfPassword: ""
      });
    }
  }

  changeHandler = event => {
    
    const name = event.target.name;
    const value = event.target.value;

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
    
    	this.registerButtonClicked();
  }

  render() {
    return (
     /* <div className="login">
      <h3>Register</h3>
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
      <Password className="conf-password" name = "confirmPassword" placeholder={this.state.formControls.confirmPassword.placeholder}
                               value={this.state.formControls.confirmPassword.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.confirmPassword.touched}
                               valid={this.state.formControls.confirmPassword.valid}/>
                              
      <button className="login-btn" onClick={this.formSubmitHandler} disabled={!this.state.formIsValid} > Register </button>  
      <h5>Already have an account?</h5>
      <button className="reg-btn" onClick = {this.onRegLoginButtonClick}>Login</button>                      
      </div>*/
      <body>
<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Sign Up</h3>
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
          <div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><img src={require('../images/key.png')} alt=""/></span>
						</div>
						<input type="password" class="form-control" name = "confirmPassword" placeholder={this.state.formControls.confirmPassword.placeholder}
                               value={this.state.formControls.confirmPassword.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.confirmPassword.touched}
                               valid={this.state.formControls.confirmPassword.valid}/>
					</div>
					<div class="form-group">
						<input onClick={this.formSubmitHandler} disabled={!this.state.formIsValid} value="Register" class="btn float-right login_btn"/>
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Already have an account?<a onClick={this.onRegLoginButtonClick} href="#">Sign In</a>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
    );
  }
}
export default RegistrationForm;

{/* <input value={this.state.inputUsername} onChange={this.inputUsernameChanged} placeholder="Username:"/>
      <input value={this.state.inputPassword} onChange={this.inputPasswordChanged} placeholder="Password:"/>
      <input value={this.state.inputConfPassword} onChange={this.inputConfPasswordChanged} placeholder="Confirm Password:"/>
      <button onClick={this.registerButtonClicked}>Register</button>
      <h5>Already have an account?</h5>
      <button onClick = {this.onRegLoginButtonClick}>Login</button> */}