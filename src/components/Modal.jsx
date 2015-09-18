/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var PicoModal = require('picoModal/picoModal');
var Jquery = require('jquery/dist/jquery');


var Modal = React.createClass({


  render() {
    return (
	 <button className="btn btn-default" type="submit">Upload</button>
    );
  }
});
module.exports = Modal;