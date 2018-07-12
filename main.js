  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwguz8XIdadAO4hYxzOkwMYizrfrLFyRs",
    authDomain: "chat-b50b7.firebaseapp.com",
    databaseURL: "https://chat-b50b7.firebaseio.com",
    projectId: "chat-b50b7",
    storageBucket: "chat-b50b7.appspot.com",
    messagingSenderId: "846803188817"
  };

  firebase.initializeApp(config);
  const username = prompt('Deme Su Nombre');
  const database = firebase.database();

  $("button").click( function( event ) {
event.preventDefault();
var mensaje =  $('#mensaje').val();

var data = { usuario: username, mensaje:mensaje};
database.ref('chat/').push(data, function(err) {
if (err) { throw err; }
else {
	console.info( 'guardamos la informacion' );
	ponerMensaje(data);
    $('#mensaje').val('')
    }
  }); 
});

  function ponerMensaje( pepito ) {
  	$('#caja').append( '<p>' + pepito.usuario + ': ' + pepito.mensaje + '<p>');
  }

function iterar(data) {
	for ( var chiguiro in data ){
		if (data.hasOwnProperty( chiguiro ) ) {
			var element = data[chiguiro];
			var gato = { usuario: element.usuario, mensaje: element.mensaje};
				ponerMensaje( gato );
		}
	}
}

  var traerMensajes = new Promise(function(res,rej){
  	var mensajes = database.ref('/chat/').once('value').then(function(snapshot){
  		return res( snapshot.val() );
  });
  	if (!mensajes) { return rej(); }
  });

  traerMensajes.then(function (data){
  	iterar(data);
  });