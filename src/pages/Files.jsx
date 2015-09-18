/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var APP = require('../components/app.jsx');
var Jquery = require('jquery/dist/jquery');

var SendToPage = React.createClass({
	componentDidMount: function() {
		//retrieve the urls
	},
  render() {
    return (
      <div className="container">
        <div className="row"> 
		<APP />
	
		</div>
      </div>
    );
  }
});

module.exports = SendToPage;
