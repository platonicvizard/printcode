/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');

var Navbar = React.createClass({
  render() {
    return (
      <div className="navbar-top">
        <div className="container">
          <Link className="navbar-brand row" to="home">
			<div><object type="image/svg+xml" data="/images/logo-small-wt.svg"><img src="/images/logo-small.png" width="38mm" height="38mm" alt="PrintCodeLogo" /></object></div>
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
