
 
var selector_template = '<div style=\"width:{{width}};height:{{height}};\" id={{name}} class=\"ui-component ui-widget-content\">'+
'   <input class=\"ui-input selector-input\" type=\"text\" >'+
'   </input>'+
'   <div class=\"ui-component-body ui-content ui-border-bottom ui-border-left ui-border-right\" >'+
'   </div>'+
'   </div>';


$.fn.countrySelector = function(property) {
	if($(this).hasClass("created")) return $(this);
	var component = $(this).html(selector_template);


	component.click(function(evt) {
		evt.preventDefault();
		return false;
	});

	var service_url = "https://location-provider.p.rapidapi.com";
	if(component.data("initial") != undefined && component.data("initial") != null) {
		//set initial data
		curid = component.data("initial");
		$(this).val(component.data("initial"));
		component.data("initial", null);
	} 
	$.ajax({
            	url: service_url + "/select_country",	//whether you are using radios, checkboxes, or selects, you can change the endpoint at runtime automatically
		headers: { 'X-RapidAPI-Host': 'location-provider.p.rapidapi.com', 'X-RapidAPI-Key': property.apikey },
		xhrFields: {
      			withCredentials: true
   		},
            	dataType: "json",
		method: "POST",
            	data: 	{
                	cc : $(this).val() ,	//the value of the input is here
            	},
            	success: function(res) {
			
			if(res == undefined) return;
			var res1 = res.result;
			//if(res1 == undefined) return;
			//if(res1.length == 0) return;
			console.log(res);
			/*var html = Mustache.to_html(component.data("form"), res1[0]);
					
			console.log(html);
			//console.log(component.data("form"));
			var content = component.find(".ui-content").html(html);
			
			component.find(".action-btn").actionButton(res1[0]);*/
			if(res1[0].name != undefined) component.find(".selector-input").val(res1[0].name);
			if(res1[0].title != undefined) component.find(".selector-input").val(res1[0].title);
			component.trigger("change", [res1[0].id, res1[0]]);
		}
        });
	$(this).addClass("created");

	//alert(service_url);
	component.find(".ui-input").unbind('result');
	component.find(".ui-input").autocomplete({ 
		source: function(request, done) {
			console.log(service_url);
        		$.ajax({
            			url: service_url + "/list_countries",	//whether you are using radios, checkboxes, or selects, you can change the endpoint at runtime automatically
				headers: { 'X-RapidAPI-Host': 'location-provider.p.rapidapi.com', 'X-RapidAPI-Key': property.apikey },
				xhrFields: {
      					withCredentials: true
   				},
            			dataType: "json",
				method: "POST",
            			data: 	{
                			_q : request.term,	//the value of the input is here
            			},
            			success: function(res) {
					//console.log(res);
					var matches = $.map(res.result, function(item) {
						if(item.name != undefined) return { label: item.name, value: item.name, tag : item }
						else if(item.title != undefined) return { label: item.title, value: item.title, tag : item }
      					});
					done(matches);
				}
        		});
    		},
    		minLength: 1,
    		cacheLength: 0,
    		select: function(event, ui) {
			//alert(component.attr("id"));
			//alert(JSON.stringify(ui.item.tag));
			component.val(ui.item.tag.iso2);

			//alert(component.val());
			/*var html = Mustache.to_html(component.data("form"), ui.item.tag);
			console.log(html);
			//console.log(component.data("form"));
			component.find(".ui-content").html(html);
			component.find(".action-btn").actionButton(ui.item.tag);*/
			component.trigger("change", [ui.item.tag.id, ui.item]);
			//alert(component.val());
		} 
	 });		//autocomplete
	//var tag = $(this).data("tag");
}

$.fn.stateSelector = function(property) {
	if($(this).hasClass("created")) return $(this);
	var component = $(this).html(selector_template);
	
	component.click(function(evt) {
		evt.preventDefault();
		return false;
	});
	//alert(curid);
	var service_url = "https://location-provider.p.rapidapi.com";
	if(component.data("initial") != undefined && component.data("initial") != null) {
		//set initial data
		curid = component.data("initial");
		$(this).val(component.data("initial"));
		component.data("initial", null);
	} 
	$.ajax({
            			url: service_url + "/select_state",	//whether you are using radios, checkboxes, or selects, you can change the endpoint at runtime automatically
				headers: { 'X-RapidAPI-Host': 'location-provider.p.rapidapi.com', 'X-RapidAPI-Key': property.apikey },
				xhrFields: {
      					withCredentials: true
   				},
            			dataType: "json",
				method: "POST",
            			data: 	{
                			id : $(this).val() ,	//the value of the input is here
					cc : component.parent().find(".country-selector").val(), 		//country code
            			},
            			success: function(res) {
					//console.log(res);
					if(res == undefined) return;
					var res1 = res.result;
					if(res1 == undefined) return;
					//if(res1.length == 0) return;
					/*var html = Mustache.to_html(component.data("form"), res1[0]);
					
					console.log(html);
					//console.log(component.data("form"));
					var content = component.find(".ui-content").html(html);

					component.find(".action-btn").actionButton(res1[0]);	$(this).addClass("created");*/
					if(res1[0].name != undefined) component.find(".selector-input").val(res1[0].name);
					if(res1[0].title != undefined) component.find(".selector-input").val(res1[0].title);
					component.trigger("change", [res1[0].id, res1[0]]);
				}
        });
	$(this).addClass("created");

	//alert(service_url);
	component.find(".ui-input").unbind('result');
	component.find(".ui-input").autocomplete({ 
		source: function(request, done) {
			console.log(service_url);
        		$.ajax({
            			url: service_url + "/list_states",	//whether you are using radios, checkboxes, or selects, you can change the endpoint at runtime automatically
				headers: { 'X-RapidAPI-Host': 'location-provider.p.rapidapi.com', 'X-RapidAPI-Key': property.apikey },
				xhrFields: {
      					withCredentials: true
   				},
            			dataType: "json",
				method: "POST",
            			data: 	{
                			_q : request.term,	//the value of the input is here
					cc : component.parent().find(".country-selector").val(), 		//country code
            			},
            			success: function(res) {
					//console.log(res);
					
					var matches = $.map(res.result, function(item) {
						if(item.name != undefined) return { label: item.name, value: item.name, tag : item }
						else if(item.title != undefined) return { label: item.title, value: item.title, tag : item }
      					});
					done(matches);
				}
        		});
    		},
    		minLength: 1,
    		cacheLength: 0,
    		select: function(event, ui) {
			//alert(component.attr("id"));
			component.val(ui.item.tag.id);
		
			//alert(component.val());
			/*var html = Mustache.to_html(component.data("form"), ui.item.tag);
			console.log(html);
			//console.log(component.data("form"));
			component.find(".ui-content").html(html);
			component.find(".action-btn").actionButton(ui.item.tag);*/ 
			component.trigger("change", [ui.item.tag.id, ui.item]);
			//alert(component.val());
		} 
	 });		//autocomplete
	//var tag = $(this).data("tag");
}

$.fn.citySelector = function(property) {
	if($(this).hasClass("created")) return $(this);
	var component = $(this).html(selector_template);
	var target = $(this).data("target");
	var action = $(this).data("action");
	var curid = $(this).val();
	component.click(function(evt) {
		evt.preventDefault();
		return false;
	});
	//alert(curid);
	var service_url = "https://location-provider.p.rapidapi.com";
	if(component.data("initial") != undefined && component.data("initial") != null) {
		//set initial data
		curid = component.data("initial");
		$(this).val(component.data("initial"));
		component.data("initial", null);
	} 
	$.ajax({
            	url: service_url + "/select_city",	//whether you are using radios, checkboxes, or selects, you can change the endpoint at runtime automatically
		headers: { 'X-RapidAPI-Host': 'location-provider.p.rapidapi.com', 'X-RapidAPI-Key': property.apikey },
		xhrFields: {
      			withCredentials: true
   		},
            	dataType: "json",
		method: "POST",
            	data: 	{
                	id : $(this).val() ,	//the value of the input is here
			cc : component.parent().find(".country-selector").val(), 		//country code
            	},
            	success: function(res) {
			//console.log(res);
			if(res == undefined) return;
			var res1 = res.result;
			if(res1 == undefined) return;
			if(res1.length == 0) return;
			/*var html = Mustache.to_html(component.data("form"), res1[0]);
					
			console.log(html);
			//console.log(component.data("form"));
			var content = component.find(".ui-content").html(html);

			component.find(".action-btn").actionButton(res1[0]);	$(this).addClass("created");*/
			if(res1[0].name != undefined) component.find(".selector-input").val(res1[0].name);
			if(res1[0].title != undefined) component.find(".selector-input").val(res1[0].title);
			component.trigger("change", [res1[0].id, res1[0]]);
		}
        });
	$(this).addClass("created");

	//alert(service_url);
	component.find(".ui-input").unbind('result');
	component.find(".ui-input").autocomplete({ 
		source: function(request, done) {
			console.log(service_url);
			var query = {
                		_q : request.term,	//the value of the input is here
				cc : component.parent().find(".country-selector").val() 		//country code
            		};
			if(component.parent().find(".state-selector").length > 0) query.sc = component.parent().find(".state-selector").val();
        		$.ajax({
            			url: service_url + "/list_cities",	//whether you are using radios, checkboxes, or selects, you can change the endpoint at runtime automatically
				headers: { 'X-RapidAPI-Host': 'location-provider.p.rapidapi.com', 'X-RapidAPI-Key': property.apikey },
				xhrFields: {
      					withCredentials: true
   				},
            			dataType: "json",
				method: "POST",
            			data: query,
            			success: function(res) {
					//console.log(res);
					
					var matches = $.map(res.result, function(item) {
						if(item.name != undefined) return { label: item.name, value: item.name, tag : item }
						else if(item.title != undefined) return { label: item.title, value: item.title, tag : item }
      					});
					done(matches);
				}
        		});
    		},
    		minLength: 1,
    		cacheLength: 0,
    		select: function(event, ui) {
			//alert(component.attr("id"));
			component.val(ui.item.tag.id);
		
			//alert(component.val());
			/*var html = Mustache.to_html(component.data("form"), ui.item.tag);
			console.log(html);
			//console.log(component.data("form"));
			component.find(".ui-content").html(html);
			component.find(".action-btn").actionButton(ui.item.tag);*/
			component.trigger("change", [ui.item.tag.id, ui.item]);
			//alert(component.val());
		} 
	 });		//autocomplete
	//var tag = $(this).data("tag");
}

var locator = locator || (function(){
    var _appKey = ''; // private
    return {
        init : function(api_key) {
            _appKey = api_key;
	    $(".country-selector").countrySelector({apikey:api_key});
	    $(".state-selector").stateSelector({apikey:api_key});
	    $(".city-selector").citySelector({apikey:api_key});
        }
    };
}());



