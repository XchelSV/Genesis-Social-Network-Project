$(document).ready(function  () {
		
		var socket = io();

		$('#inboxForm').click(function (){

			if($('#chatText').val()){

			socket.emit('chat message', $('#chatText').val());
			$('#chatText').val('');

			}

			else{
				
			}
		})

});