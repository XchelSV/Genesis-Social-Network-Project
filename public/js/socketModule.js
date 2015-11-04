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


		function readURL(input) {

		    if (input.files && input.files[0]) {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		            $('#blah').attr('src', e.target.result);
		        }

		        reader.readAsDataURL(input.files[0]);
		    }
		}	

		$("#imgInp").change(function(){
		    readURL(this);
		});


});