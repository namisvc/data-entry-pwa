(function($){
  $(function(){

  	$('select').not('.disabled').formSelect();
	$('.datepicker').datepicker({ format: 'dd-mm-yyyy'});
	$('.tooltipped').tooltip();
	$('.fixed-action-btn').floatingActionButton({ toolbarEnabled: true });

  }); // end of document ready
})(jQuery); // end of jQuery name space

