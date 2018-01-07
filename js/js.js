
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var devicewidth = window.innerWidth;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
var aterrizado = false;
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var salir = true
var dificultad = true

//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	//Confirmacion al salir del juego
	window.onbeforeunload = function(){
		var respuesta;
		if (salir){
			respuesta = confirm();
			if(respuesta){
				window.onunload = function(){
					return true;
				}
			} else {
				return false;
			}
		}
	}
	
	//cambiar dificultad
	document.getElementById("boton").onclick = function(){
		if (dificultad){
			dificultad = false;
			document.getElementById("boton").innerHTML = "cambiar dificultad a Fácil";
		} else {
			dificultad = true;
			document.getElementById("boton").innerHTML = "cambiar dificultad a Difícil";
		}
	}
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
		if(devicewidth<961){
			if (a==g){
				motorOn();
			} else {
				motorOff();
			}
		}
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = function(event){
		if (event.keyCode==32){
			motorOn();
		}
	}		
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=y.toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<80){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		if (dificultad){
			if (v<=5){
				alert("Enhorabuena es un gran paso para la humanidad, has ganado" + v.toFixed(2) + "m/s");
				stop();
				aterrizado=true;
			} else {
				alert("La humanidad esta perdida, no lo has conseguido" + v.toFixed(2) + "m/s");
				stop();
				aterrizado=true;
				document.getElementById("navef").src = "imge/naverota.png";
			}
		} else {
			if (v<=2) {
				alert("Enhorabuena es un gran paso para la humanidad, has ganado" + v.toFixed(2) + "m/s");
				stop();
				aterrizado=true;
			} else {
				alert("La humanidad esta perdida, no lo has conseguido" + v.toFixed(2) + "m/s");
				stop();
				aterrizado=true;
				document.getElementById("navef").src = "imge/naverota.png";
			}
		}
	}
}
function motorOn(){
	if (c!=0){
		if(aterrizado){
			motorOff()
		} else {
			//el motor da aceleración a la nave
			a=-g;
			//mientras el motor esté activado gasta combustible
			if (timerFuel==null)
			timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
			document.getElementById("navef").src = "imge/navefuego.png"
		}
	}
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	document.getElementById("navef").src = "imge/naveespacial2.png"
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(2);	
}