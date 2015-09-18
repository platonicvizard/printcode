/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var PicoModal = require('picoModal/picoModal');
var AppActions = require('../actions/app-actions.jsx');
var Jquery = require('jquery/dist/jquery');
var Modal = require('../components/Modal.jsx');
var Loading = require('../components/loading.jsx');
var {Link} = require('react-router');
var  openModal= function (instance){

PicoModal({
			overlayClose: false,
			closeButton: true,
			content: '<div class="form wm500">'+
			'<div class="alert alert-info">'+
			 '<div class="form-inline remove-actions-class">'+

			  '<div><label class="control-label">Select an option.</label></div>'+
			   '<div><label><input name="remove-actions" value="1" checked type="radio" /><span class="radioleft-center">Remove after first access</span></label></div>'+
			   '<div><label><input disabled name="remove-actions" value="2" type="radio" /><span class="radioleft-center">Remove after</span> <input id="remove-access-times" class="w43" type="number" min="2" step="2" />  <span>access</span></label></div>'+
			   '<div><label><input disabled name="remove-actions" value="3" type="radio" /><span class="radioleft-center">Remove after</span> <input id="remove-hours" class="w43" type="number" min="8" step="4" />  <span>hours</span></label></div>'+
			  '</div>'+
			 '</div>'+
			'</div>'
      + '<div class="pull-right"><button type="button" class="btn btn-default dismiss" data-dismiss="modal">Cancel</button>'+
        '<button type="button" class="upload-ok btn btn-primary ml25">OK</button></div>',
			overlayStyles: {
			backgroundColor: "#169",
			opacity: 0.75
			},
			closeHtml: '<div class="close-button"></div>',
      closeStyles: {
          position: "absolute", top: "-15px", right: "-15px",
		  cursor: "pointer",
          //background: "#eee", padding: "5px 10px", cursor: "pointer",
          //borderRadius: "5px", border: "1px solid #ccc"
      }
		}).afterCreate(function(modal){

		  modal.modalElem().getElementsByClassName("dismiss")[0].addEventListener('click', modal.close);
		  modal.modalElem().getElementsByClassName("upload-ok")[0].addEventListener('click', function(){
		   var $root = modal.modalElem().getElementsByClassName("remove-actions-class");
			 var $ = Jquery;
				$("#remove_action").val($("input:checked",$root).val());
				$("#remove_access_times").val($("#remove-access-times",$root).val());
				$("#remove_hours").val($("#remove-hours",$root).val());
				var $radio = $("#remove_action");
				$radio.prop("checked", true);

				$(instance).ajaxSubmit({
					beforeSubmit:function(formData,jForm,options){},
					success: function(responceText,statusText, xhr, $form){
						console.log(responceText);
						var obj = JSON.parse(responceText);
						if(obj.accesscode) $("#dc_id").val(obj.accesscode);
					}
				});

				modal.close();
				$('#file-upload-action').resetForm();
		});
	  }).afterClose(function () {  }).show();
};
var HomePage = React.createClass({

 componentDidMount: function() {
	
		var $ = Jquery;
		
	 $('#dc_id').change(function(){
	 console.log("test");
	 });
		$('#file-upload-action').submit(function() {
			openModal(this);
			return false;
		}); 

		$('#get-file-list-action').submit(function() { 
			$(this).ajaxSubmit({
				beforeSubmit:function(formData,jForm,options){},
				success: function(responceText,statusText, xhr, $form){
				
				try{
					console.log(responceText);
					var obj = JSON.parse(responceText);
					if(!obj.error){
						AppActions.addItem(obj);
						window.location = '#/files';
					}
				}catch(ex){
					alert("Sorry the resource is mising.");
				}
			}});

			return false;
		}); 
	},
  render() {
 
    return (
	
		<div className="home container">
			<div className="row">
			 <Loading />
			{/*<APP />*/}
				<div className="col-md-4 col-md-offset-4">
					<div className="input-group">
						<form id="file-upload-action" encType="multipart/form-data" method="post" action="FileUploadSvr.php" target = "upload_target">
							<input type="hidden" name="remove_action" id="remove_action" /> 
							<input type="hidden" name="remove_access_times" id="remove_access_times" /> 
							<input type="hidden" name="remove_hours" id="remove_hours" /> 
							<input type="file" id="s_file" name="s_file" className="form-control" onChange={this.handleFile} />
							<span className="input-group-btn">
								 <button className="btn btn-default" type="submit">Upload</button>
							</span>
						</form>
					</div>
				</div>
			</div>
			{/*Row 2*/}
			<form id="get-file-list-action" encType="text/plain" method="get" action="GetFile.php" >
				<div className="row">
					<div className="col-md-6 col-md-offset-4 inline-divs">
						<div>
							<input type="text" name="accnt_id" id="accnt_id" className="pc-mr10" /> 
							<p>Account Code </p>
						</div>
						<div>
							<input type="text" name="dc_id" id="dc_id" className="pc-mr10" /> 
							<p>Document Code </p>
						</div>
					</div>				
				</div>
				{/*Row 3*/}
				<div className="row">
					<div className="col-md-4 col-md-offset-4">
							<button className="btn btn-default btn-go" type="submit">Go</button>
						{/*<Link to="sendto" className="btn btn-primary  pull-right" >Go</Link>*/}
					</div>
				</div>
			</form>
			
		</div>
	
    );
  }
});

module.exports = HomePage;
