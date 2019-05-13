$(document).ready(function(){
	setInterval(ColorTitulo,1000);
	$(".btn-reinicio").on("click",function(){
		$("#score-text").html("0");
		$("#timer").html("02:00");
		limpir_todo();
		puntaje = 0;
		movimiento = 0;
		tiempo.minuto = 0;
		tiempo.segundo = 20;
		$(".panel-tablero").show(500);
		$(".panel-score").css("width","25%");
		interval = setInterval(ejecucionMatrizData,1000);
		$(this).text("REINICIAR");
	});
	
});

var puntaje = 0;
var movimiento = 0;
var interval;
var numero_reserva = "";
var numero_cambio = "";

var accion_date = 2;

var tiempo = {
	minuto: 0,
	segundo: 0
};

var left_d = 0;
var top_d = 0;
var color = 0;

function ColorTitulo(){
	if(color == 1){
		color = 0
		$(".main-titulo").css("color","#DCFF0E");
	}else{
		color = 1
		$(".main-titulo").css("color","white");
	}
	
}

function ListaAñadirClass(){
	if(accion_date == 1){
		accion_date = 2
	}else{
		accion_date = 1
	}
	return "ejecucion_movimiento"+accion_date;
}

function reloj(){
	
	if( tiempo.segundo == 0)
    {
        tiempo.segundo = 59;
        tiempo.minuto--;
    }else{
        tiempo.segundo--;
    }
	var td = (tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
    td = td + ":" + (tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
	$("#timer").html(td);
	if(tiempo.minuto == 0){
		if(tiempo.segundo == 0){
			clearInterval(interval);
			$(".btn-reinicio").text("INICIAR");
			$(".panel-tablero").hide("linear");
			$(".panel-score").css("width","100%");
		}
	}
}

function limpir_todo(){
	$('div.col-1').children('img').remove();
	$('div.col-2').children('img').remove();
	$('div.col-3').children('img').remove();
	$('div.col-4').children('img').remove();
	$('div.col-5').children('img').remove();
	$('div.col-6').children('img').remove();
	$('div.col-7').children('img').remove();
}

function ingresar_iconos(){
	recargar('div.col-1');
	recargar('div.col-2');
	recargar('div.col-3');
	recargar('div.col-4');
	recargar('div.col-5');
	recargar('div.col-6');
	recargar('div.col-7');
	
	$(".ejecucion_movimiento").draggable({ 
		start: function(e) {
			numero_reserva = $(this).attr("src");
			var offset_t = $(this).offset().top - $(window).scrollTop();
			var offset_l = $(this).offset().left - $(window).scrollLeft();

			left_d = Math.round( (e.clientX - offset_l) );
			top_d = Math.round( (e.clientY - offset_t) );
		},
		stop: function(e) {
			
			$(this).css("left","0px");
			$(this).css("top","0px");
			
			var offset_t = $(this).offset().top - $(window).scrollTop();
			var offset_l = $(this).offset().left - $(window).scrollLeft();

			var left_d2 = Math.round( (e.clientX - offset_l) );
			var top_d2 = Math.round( (e.clientY - offset_t) );
			var i = $(this).index();
			
			var posicionPadre = $(this).parent().index() + 1;
			
			left_d2 = left_d2 - left_d;
			top_d2 = top_d2 - top_d;
			
			if( (left_d2*left_d2)>(top_d2*top_d2) ){
				if(left_d2 > 0){
					i = i+1;
					$(".panel-tablero").children('div:nth-child('+posicionPadre+')').children('img:nth-child('+i+')').insertAfter($(".panel-tablero").children('div:nth-child('+posicionPadre+')').next().children('img:nth-child('+i+')'));
					$(".panel-tablero").children('div:nth-child('+posicionPadre+')').next().children('img:nth-child('+i+')').insertAfter($(".panel-tablero").children('div:nth-child('+posicionPadre+')').children('img:nth-child('+i+')').prev());
					movimiento = movimiento + 1;
				}
				
				if(left_d2 < 0){
					i = i+1;
					posicionPadre = posicionPadre - 1;
					$(".panel-tablero").children('div:nth-child('+posicionPadre+')').children('img:nth-child('+i+')').insertAfter($(".panel-tablero").children('div:nth-child('+posicionPadre+')').next().children('img:nth-child('+i+')'));
					$(".panel-tablero").children('div:nth-child('+posicionPadre+')').next().children('img:nth-child('+i+')').insertAfter($(".panel-tablero").children('div:nth-child('+posicionPadre+')').children('img:nth-child('+i+')').prev());
					movimiento = movimiento + 1;
				}
			
			}else{
				
				if( top_d2 > 0){
					i = i+1;
					$(".panel-tablero").children('div:nth-child('+posicionPadre+')').children('img:nth-child('+i+')').insertAfter($(".panel-tablero").children('div:nth-child('+posicionPadre+')').children('img:nth-child('+i+')').next());
					movimiento = movimiento + 1;
				}
				
				if( top_d2 < 0){
					$(".panel-tablero").children('div:nth-child('+posicionPadre+')').children('img:nth-child('+i+')').insertAfter($(".panel-tablero").children('div:nth-child('+posicionPadre+')').children('img:nth-child('+i+')').next());
					movimiento = movimiento + 1;
				}
			}
			$("#movimientos-text").text(movimiento);
		}
	});
}

function recargar(nombre){
	var d1 = $(nombre).children('img');
	var limite = 5;
	
	for( var i=0; i < ( limite - d1.length ); i++ ){
		var new_item = $('<img class="ejecucion_movimiento" src ="image/'+numeroAleatorio(1, 4)+'.png" />').hide();
		$(nombre).append(new_item);
		new_item.fadeIn(1000);
	}
}

function ejecucionMatrizData(){
	
	ingresar_iconos();
	reloj();
	
	var tablero = $(".panel-tablero").children('div');
	
	var ard_inicio = Array();

	for( var i=1; i <= 5; i++ ){
		
		var d1 = $(".panel-tablero").children('div:nth-child(1)').children('img:nth-child('+i+')');
		var d2 = $(".panel-tablero").children('div:nth-child(2)').children('img:nth-child('+i+')');
		var d3 = $(".panel-tablero").children('div:nth-child(3)').children('img:nth-child('+i+')');
		var d4 = $(".panel-tablero").children('div:nth-child(4)').children('img:nth-child('+i+')');
		var d5 = $(".panel-tablero").children('div:nth-child(5)').children('img:nth-child('+i+')');
		var d6 = $(".panel-tablero").children('div:nth-child(6)').children('img:nth-child('+i+')');
		var d7 = $(".panel-tablero").children('div:nth-child(7)').children('img:nth-child('+i+')');
		
		/*
		d1.removeClass("ejecucion_movimiento1").removeClass("ejecucion_movimiento2").addClass(ListaAñadirClass());
		d2.removeClass("ejecucion_movimiento1").removeClass("ejecucion_movimiento2").addClass(ListaAñadirClass());
		d3.removeClass("ejecucion_movimiento1").removeClass("ejecucion_movimiento2").addClass(ListaAñadirClass());
		d4.removeClass("ejecucion_movimiento1").removeClass("ejecucion_movimiento2").addClass(ListaAñadirClass());
		d5.removeClass("ejecucion_movimiento1").removeClass("ejecucion_movimiento2").addClass(ListaAñadirClass());
		d6.removeClass("ejecucion_movimiento1").removeClass("ejecucion_movimiento2").addClass(ListaAñadirClass());
		d7.removeClass("ejecucion_movimiento1").removeClass("ejecucion_movimiento2").addClass(ListaAñadirClass());
		*/
		
		var ard = Array(
				d1.attr("src").replace('image/','').replace('.png','').toString(),
				d2.attr("src").replace('image/','').replace('.png','').toString(),
				d3.attr("src").replace('image/','').replace('.png','').toString(),
				d4.attr("src").replace('image/','').replace('.png','').toString(),
				d5.attr("src").replace('image/','').replace('.png','').toString(),
				d6.attr("src").replace('image/','').replace('.png','').toString(),
				d7.attr("src").replace('image/','').replace('.png','').toString())
		
		ard_inicio.push(ard);
	}
	
	
	for( var i=0; i < 5; i++ ){
		if( parseInt(ard_inicio[i][0]) == parseInt(ard_inicio[i][1]) ){
			if( parseInt(ard_inicio[i][1]) == parseInt(ard_inicio[i][2]) ){
				if( parseInt(ard_inicio[i][2]) == parseInt(ard_inicio[i][3]) ){
					if( parseInt(ard_inicio[i][3]) == parseInt(ard_inicio[i][4]) ){
						if( parseInt(ard_inicio[i][4]) == parseInt(ard_inicio[i][5]) ){
							if( parseInt(ard_inicio[i][5]) == parseInt(ard_inicio[i][6]) ){
								eliminarDatos(i,0); eliminarDatos(i,1); eliminarDatos(i,2);
								eliminarDatos(i,3); eliminarDatos(i,4); eliminarDatos(i,5);
								eliminarDatos(i,6);
								puntaje = puntaje + 150;
							}
						}
					}
				}
			}
		}
		
		for( var t=0; t < 2; t++ ){
			if( parseInt(ard_inicio[i][0+t]) == parseInt(ard_inicio[i][1+t]) ){
				if( parseInt(ard_inicio[i][1+t]) == parseInt(ard_inicio[i][2+t]) ){
					if( parseInt(ard_inicio[i][2+t]) == parseInt(ard_inicio[i][3+t]) ){
						if( parseInt(ard_inicio[i][3+t]) == parseInt(ard_inicio[i][4+t]) ){
							if( parseInt(ard_inicio[i][4+t]) == parseInt(ard_inicio[i][5+t]) ){
								eliminarDatos(i,0+t); eliminarDatos(i,1+t); eliminarDatos(i,2+t);
								eliminarDatos(i,3+t); eliminarDatos(i,4+t); eliminarDatos(i,5+t);
								puntaje = puntaje + 120;
							}
						}
					}
				}
			}
		}
		for( var t=0; t < 3; t++ ){
			if( parseInt(ard_inicio[i][0+t]) == parseInt(ard_inicio[i][1+t]) ){
				if( parseInt(ard_inicio[i][1+t]) == parseInt(ard_inicio[i][2+t]) ){
					if( parseInt(ard_inicio[i][2+t]) == parseInt(ard_inicio[i][3+t]) ){
						if( parseInt(ard_inicio[i][3+t]) == parseInt(ard_inicio[i][4+t]) ){
							eliminarDatos(i,0+t); eliminarDatos(i,1+t); eliminarDatos(i,2+t);
							eliminarDatos(i,3+t); eliminarDatos(i,4+t);
							puntaje = puntaje + 80;
						}
					}
				}
			}
		}
		
		for( var t=0; t < 4; t++ ){
			if( parseInt(ard_inicio[i][0+t]) == parseInt(ard_inicio[i][1+t]) ){
				if( parseInt(ard_inicio[i][1+t]) == parseInt(ard_inicio[i][2+t]) ){
					if( parseInt(ard_inicio[i][2+t]) == parseInt(ard_inicio[i][3+t]) ){
						eliminarDatos(i,0+t); eliminarDatos(i,1+t); eliminarDatos(i,2+t); 
						eliminarDatos(i,3+t);
						puntaje = puntaje + 50;
					}
				}
			}
		}
		
		for( var t=0; t < 5; t++ ){
			if( parseInt(ard_inicio[i][0+t]) == parseInt(ard_inicio[i][1+t]) ){
				if( parseInt(ard_inicio[i][1+t]) == parseInt(ard_inicio[i][2+t]) ){
					eliminarDatos(i,0+t); eliminarDatos(i,1+t); eliminarDatos(i,2+t);
					puntaje = puntaje + 30;
				}
			}
		}
	}
	
	for( var i=0; i < 7; i++ ){
		
		if( parseInt(ard_inicio[0][i]) == parseInt(ard_inicio[1][i]) ){
			if( parseInt(ard_inicio[1][i]) == parseInt(ard_inicio[2][i]) ){
				if( parseInt(ard_inicio[2][i]) == parseInt(ard_inicio[3][i]) ){
					if( parseInt(ard_inicio[3][i]) == parseInt(ard_inicio[4][i]) ){
						eliminarDatos(0,i); eliminarDatos(1,i); eliminarDatos(2,i);
						eliminarDatos(3,i); eliminarDatos(4,i); 
						puntaje = puntaje + 80;
					}
				}
			}
		}
		
		for( var t=0; t < 2; t++ ){
			if( parseInt(ard_inicio[0+t][i]) == parseInt(ard_inicio[1+t][i]) ){
				if( parseInt(ard_inicio[1+t][i]) == parseInt(ard_inicio[2+t][i]) ){
					if( parseInt(ard_inicio[2+t][i]) == parseInt(ard_inicio[3+t][i]) ){
						eliminarDatos(0+t,i); eliminarDatos(1+t,i); eliminarDatos(2+t,i);
						eliminarDatos(3+t,i); 
						puntaje = puntaje + 50;
					}
				}
			}
		}
		
		for( var t=0; t < 3; t++ ){
			if( parseInt(ard_inicio[0+t][i]) == parseInt(ard_inicio[1+t][i]) ){
				if( parseInt(ard_inicio[1+t][i]) == parseInt(ard_inicio[2+t][i]) ){
					eliminarDatos(0+t,i); eliminarDatos(1+t,i); eliminarDatos(2+t,i);
					puntaje = puntaje + 30;
				}
			}
		}
		$("#score-text").html(puntaje);
	}
}

function eliminarDatos(s,d){
	$(".panel-tablero").children('div:nth-child('+(d+1)+')').children('img:nth-child('+(s+1)+')').fadeOut( "slow", function() {
		$( this ).fadeIn(500,function() {
			$( this ).fadeOut(500,function() { $( this ).remove(); });
		});
	});
}


function numeroAleatorio(min, max) {
	var num = Math.round(Math.random() * (max - min) + min);
	return num;
}