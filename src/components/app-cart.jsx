/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.jsx');
var RemoveFromCart = require('../components/app-removefromcart.jsx');
var Increase = require('../components/app-increase.jsx');
var Decrease = require('../components/app-decrease.jsx');
var Jquery = require('jquery/dist/jquery');
var Downloadmodal = require('../components/download-modal.jsx');
var PicoModal = require('picoModal/picoModal');
function cartItems(){
	return {items: AppStore.getCart()}
}

var Cart = 
	React.createClass({
	
		 openModal: function (){
			
		
			return false;
		},
		getInitialState: function(){
			return cartItems();
		},

		componentWillMount: function(){
			AppStore.addChangeListener(this.onChange);
		},

		onChange: function(){
			this.setState(cartItems())
		},

		componentDidMount:function(){
		var me = this;
		var $media = Jquery('a.media');

			//$media.media({width:100, height:100});
			$media.click(function(e){
			console.log(e.target.href);
			PicoModal({
					overlayClose: false,
					closeButton: true,
					content: ' <div class="mlinks10">'+
		'<div><a class="download" href="'+e.target.href+'"><span class="badge"><img src="download32x32.png" /></span>Download </a></div>'+
		'<div><a href="#"><span class="badge"><img src="fedexOffice32x32.png" /></span>Send to FedexOffice </a></div>'+
		'<div><a href="#"><span class="badge"><img src="officedepot32x32.png" /></span>Send to OfficeDepot/Max </a></div>'+
	'</div>',
					overlayStyles: {
					backgroundColor: "#169",
					opacity: 0.75
					},
					closeHtml: '<div class="dismiss close-button"></div>',
			  closeStyles: {
				  position: "absolute", top: "-15px", right: "-15px",
				  cursor: "pointer",
				  //background: "#eee", padding: "5px 10px", cursor: "pointer",
				  //borderRadius: "5px", border: "1px solid #ccc"
			  }
				}).afterCreate(function(modal){
				 modal.modalElem().getElementsByClassName("dismiss")[0].addEventListener('click', modal.close);
				 modal.modalElem().getElementsByClassName("download")[0].addEventListener('click', function(){
				
				 //remove the blob
				 Jquery.post('RemoveBlob.php',{dc_id:Jquery(e.target).data('dcid')},function(result){
					//console.log(result);
					//window.location = '#';
				 });
				 
				 modal.close();
				 me.onChange();
				 });
				
				}).afterClose(function () {  }).show();
			
			
			 return false;});
			AppStore.clearCart();
		},

		render: function(){
			var total = 0;
			var items = this.state.items.map(function(item, i){
				//var subtotal = item.cost * item.qty;
				//total += subtotal; 
				return (
				
					<tr key={i}>
						<td><RemoveFromCart index={i} bid={item.files[i].bid} /></td>
						<td>{i+1}</td>
						<td ><a className="media" data-dcid={item.files[i].bid} href={"FileItem.php?fname="+item.files[i].name+"&path="+item.files[i].url}  >{item.files[i].name}</a> </td>
						<td></td>
						<td>
							{/*<Decrease index={i} />*/}
						</td>
						<td></td>
					</tr>
				)
			})
			return (
				<table className="table table-hover">
					<thead>
						<tr>
							<th></th>
							<th>#</th>
							<th>File</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td colSpan="3" className="text-right"></td>
							<td></td>
						</tr>
					</tfoot>
				</table>
				
			)
		}
	});

module.exports = Cart;