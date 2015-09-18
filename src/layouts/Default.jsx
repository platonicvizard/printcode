/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');
var Navbar = require('../components/Navbar.jsx');

var DefaultLayout = React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <div className="jumbotron">
          <div className="container text-center">
           <Link className="pc-logo" to="home"> <h1> PrintCode</h1> </Link>
            <p>Easy Find, Easy Print and Easy Share from and to anywhere</p>
          </div>
        </div>
        <this.props.activeRouteHandler />
        <div className="navbar-footer">
          <div className="container">
            <p className="text-muted">
              {' © PrintCode • '}
              <Link to="home">Home</Link> {' • '}
              <Link to="privacy">Privacy</Link> {' • '}
			  <Link to="terms">Terms and Conditionds</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DefaultLayout;
