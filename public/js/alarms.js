socket.on('alarm', function(data) {
	var values = JSON.parse(data.value);
	var sensor = "";
	switch(values.measurement){
		case "T":
			sensor = "Temperatura";
			break;
		case "H":
			sensor = "Humedad";
			break;
		case "S":
			sensor = "Sonido";
			break;
		case "M":
			sensor = "Monóxido";
			break;
		case "LI":
			sensor = "Luz Interna";
			break;
		case "LE":
			sensor = "Luz Externa";
			break;
	}
	$.notify({
        icon: "notifications",
        message: "Valor Anormal en el sensor de <b>"+sensor+"</b> - Valor: "+values.value

    }, {
        type: 'danger',
        timer: 3000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
});