/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');
var CreateLoginPage = React.createClass({
validate(tc_agreement, usrName,pssWrd,cpssWrd,usrEml){
console.log(this.arguments);
  /*if ((obj.value<1) || (10<obj.value)){
    alert("Please try again");
    obj.select();
    obj.focus();
    return false;
  }*/
  return false;
},
	handleUsernameChange: function (e){
		this.setState({usrNme:e.target.value});
	},
	handlePasswordChange: function (e){
		this.setState({pass:e.target.value});
	},
	handleLogin: function (e){
		var state = this.state;
		var usr = {usrNme:state.usrNme,pass:state.pass};
		this.setState({usr:usr});
	},	
	handleFileAccess: function(e){
		alert(e);
	},
  render () {
 
    return (
      <div className="container">
	   
        <div className="row">
         
			<div className="pc-login">

				{/*onSubmit="return validate(this.tc_agreement,this.usrName,this.pssWrd,this.cpssWrd,this.usrEml)" action="filelistsvr.php"  method="post" */}
				<div className="col-md-4"></div>
				<form name="create_login_form" role="form">
				<div className="col-md-4">
					<table className="table">
					  <caption>Login or create an account.</caption>
					  <thead>
						
						 <tr>
						  <td colSpan="2"><div className="checkbox"><label><input className="checkbox" type="checkbox" name="tc_agreement" id="tc_agreement"  />I agree to the <Link to="terms">Terms and Conditionds</Link></label></div></td>
						</tr>
					  </thead>
					  <tbody>
					 
						<tr>
						  <th scope="row"><input type="text" name="usrName" id="usrName" onChange={this.handleUsernameChange} /> </th>{/*placeholder="Username"*/}
						  <td>Username</td>
						</tr>
						<tr>
						  <th scope="row"> <input type="password" name="pssWrd" id="pssWrd" onChange={this.handlePasswordChange} /> </th>
						  <td>Password</td>
						</tr>
						<tr>
						  <th scope="row"></th>
						  <td><input className="btn btn-success  pull-right" type="button" value="LogIn" onClick="{this.handleLogin}" /></td>
						</tr>
						<tr>
						  <th scope="row"> <input type="password" name="cpssWrd" id="cpssWrd" /></th>
						  <td>Confirm Password</td>
						</tr>
						<tr>
						  <th scope="row"><input type="text" name="usrEml" id="usrEml" /></th>
						  <td>Email</td>
						</tr>
						<tr>
						  <th scope="row"></th>
						  <td><input className="btn btn-default pull-right" type="button" value="Create" /></td>
						</tr>
					  </tbody>
					</table>
					</div>
					</form>
				<div className="col-md-4"></div>
				</div>
        
        </div>
      </div>
    );
  }
});

module.exports = CreateLoginPage;
