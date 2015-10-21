var Persona = require("./modelo/persona");

//Obtiene todos los objetos de la persona de la base de datos
exports.getPersona = function(req,res){
	Persona.find(function(err, persona){
		if (err){
			res.send(err);
			console.log("err");
		}else{
			res.json(persona);//devuelve todas las personas en JSON
			console.log("personas " + persona);
		}
	});
}

//Guarda un Objeto Persona en Base de datos
exports.setPersona = function(req,res){

	//Crear Objeto Persona
	Persona.create({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		edad: req.body.edad
	},
	function(err,persona){
		if(err){
			res.send(err);
		}else{
			//Obtiene y devuelve todas las personas tras crear una de ella
			Persona.find(function(err, persona){
				if (err){
					res.send(err);
				}else{
					res.json(persona);
				};
			});
		};
	});
}

//Modificamos un Objeto persona de la base de datos
exports.updatePersona = function(req,res){
	Persona.update({
		_id: req.params.persona_id},
		{
		$set:{
		 	nombre: req.body.nombre,
		 	apellido: req.body.apellido,
		 	edad: req.body.edad
		}},
		function(err,persona){
			if(err){
				res.send(err);
			}else{
				// Obtiene y devuelve todas las personas tras crear una de ellas
				Persona.find(function(err, persona){
					if(err){
						res.send(err);

					}else{
						res.json(persona);

					};
				});
			};
		});
}

// Elimino un objeto Persona de la base de Datos
exports.removePersona = function(req, res) {
	Persona.remove({_id : req.params.persona_id}, function(err, persona) {
		if (err)
			res.send(err);
			// Obtine y devuelve todas las personas tras borrar una de ellas
			Persona.find(function(err, persona) {
				if (err)
					res.send(err)
				res.json(persona);
			});
		});
}