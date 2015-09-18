/** @jsx React.DOM */
var React = require('react');
var Catalog = require('../components/app-catalog.jsx');
var Cart = require('../components/app-cart.jsx');

var APP = React.createClass({
		render: function(){
			return (
				<div>
				<h1>File/s</h1>
			<Cart />
				</div>
			)
		}
	});
module.exports = APP;