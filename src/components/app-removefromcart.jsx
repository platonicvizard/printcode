/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.jsx');
var Jquery = require('jquery/dist/jquery');

var RemoveFromCart = 
	React.createClass({
		handleClick: function(){
			AppActions.removeItem(this.props.index);

			//remove the blob
			Jquery.post('RemoveBlob.php',{dc_id:this.props.bid},function(result){
				//console.log(result);
				//window.location = '#';
			});
		},

		render: function(){
			return <button onClick={this.handleClick}> x </button>
		}
	});

module.exports = RemoveFromCart;