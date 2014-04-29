window.onload = function()
{
	inicio();
}

function inicio()
{
	/*
	Tamaño/tomaño del sol = %
	*/
	function movimiento(path, obj, vel)
    {
        //console.log("Vel de: "  + obj + " es: " + vel);
        var pathLength = path.getTotalLength();
        var tween = new TWEEN.Tween({ length: 0  })
        .to({ length: pathLength }, vel)
        .onUpdate(function()
        {
            var point = path.getPointAtLength(this.length);
            obj.style.webkitTransform = 'translate('+ point.x + 'px,'+ point.y +'px)';
        }).repeat(999999999).start();
        animate = function()
        {
            requestAnimationFrame(animate)
            TWEEN.update()
        }
        animate();
    }
    var tamReal = false;
	var CreaLunas = function(objeto, luna)
    {
        var tamanoLuna = luna.tamano;
       
        if(tamReal)
        {
            
            tamanoLuna = Math.round(LaLuna.tamano * (luna.porcentaje / 100));
           
        }
        objeto.style.width = tamanoLuna + "px";
        objeto.style.height = tamanoLuna + "px";
        objeto.style.backgroundImage = "url('Moons/"+luna.imagen+"')";
        objeto.style.backgroundSize = tamanoLuna + "px " + tamanoLuna + "px";
        var margen = (Math.round(tamanoLuna / 2)) * -1;
        objeto.style.marginTop = margen + "px";
        objeto.style.marginLeft = margen + "px";
        objeto.style.borderRadius = "50%";
        objeto.style.position = "absolute";
      
    }
	var lunas = [
                {nombre: "Metis", 
                 imagen: "metis.png",
                 porcentaje: 0.030,
                 tamano: 10 
                },
                {nombre: "Adrastea", 
                 imagen: "adrastea.png",
                 porcentaje: 0.011,
                 tamano: 9 
                },
                {nombre: "Amalthea", 
                 imagen: "amalthea.png",
                 porcentaje: 0.003,
                 tamano: 5 
                },
                {nombre: "Thebe", 
                 imagen: "thebe.png",
                 porcentaje: 0.069,
                 tamano: 6 
                },
                {nombre: "IO", 
                 imagen: "io.png",
                 porcentaje: 2.548,
                 tamano: 45
                },
                {nombre: "Europa", 
                 imagen: "europa.png",
                 porcentaje: 2.183,
                 tamano: 45
                },
                {nombre: "Ganymede", 
                 imagen: "ganymede.png",
                 porcentaje: 3.684,
                 tamano: 50
                },
                {nombre: "Callisto", 
                 imagen: "callisto.png",
                 porcentaje: 3.427,
                 tamano: 50
                },

                {nombre: "Leda", 
                 imagen: "leda.png",
                 porcentaje: 0.014,
                 tamano: 9
                },

                {nombre: "Himalia", 
                 imagen: "Himalia.png",
                 porcentaje: 0.119,
                 tamano: 20
                }

                ];
    var objLun = nom_div('jup_svg');
    var LaLuna = {
        tamano: objLun.height.baseVal.value, 
        x : objLun.x.baseVal.value, 
        y : objLun.y.baseVal.value
    };
    var objeto = "";
    var ruta = "";
    var velInicia = 3000;
    for(var i = 1; i <= lunas.length; i++)
    {
    	objeto = nom_div("objeto_" + i);
    	ruta = nom_div("ruta_" + i);
    	CreaLunas(objeto, lunas[i - 1]);
    	movimiento(ruta, objeto, velInicia);
    	velInicia += 4000;
    }
    console.log("Hola mundo");
    function nom_div(div)
    {
        return document.getElementById(div);
    }
}