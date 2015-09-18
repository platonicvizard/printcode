/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var DownloadModal = React.createClass({

  render() {
    return (
	 <div className="pc-sendto">
		<a href="#"><span className="badge"><img src="download32x32.png" /></span>Browser </a>
		<a href="#"><span className="badge"><img src="fedexOffice32x32.png" /></span>FedexOffice </a>
		<a href="#"><span className="badge"><img src="officedepot32x32.png" /></span>OfficeDepot/Max </a>
	</div>
		
    );
  }
});
module.exports = DownloadModal;