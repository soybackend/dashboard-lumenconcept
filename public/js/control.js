var slider = document.getElementById('intensidad');
noUiSlider.create(slider, {
    start: 255,
    connect: [true, false],
    range: {
        min: 0,
        max: 255
    },
    format: wNumb({
		    decimals: 0
	  }),
    step: 25
});
slider.setAttribute('disabled', true);

slider.noUiSlider.on('end', function( values, handle ) {
  $.get("http://34.202.239.178:8080/lights/fade/"+values[0]+"/")
});

$("#modo").click(function() {
  if(this.checked) {
    $("#onoff").attr("disabled", true);
    $("#onoff").prop("checked", true);
    slider.setAttribute('disabled', true);
  }else{
    slider.removeAttribute('disabled');
    $("#onoff").removeAttr("disabled");
  }
});
$("#onoff").click(function() {
  if(this.checked) {
    slider.noUiSlider.set(255);
    $.get("http://34.202.239.178:8080/lights/ON/")
  }else{
    slider.noUiSlider.set(0);
    $.get("http://34.202.239.178:8080/lights/OFF/")
  }
});
