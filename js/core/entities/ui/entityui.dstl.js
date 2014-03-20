$(document).ready(function(){

	// Adding new entity
	$("#entity_add").click(function(){

		name = $("#entity_name").val();
		
		if(name != "")
		{
			inputCopy = $("#entityForm").clone().attr("id","").removeClass("hide").addClass("entity");


			$("span.add-on",inputCopy).text(name).attr("id",name);

			$("#entities").append(inputCopy);
			$("#entity_name").val("");

			//TODO: Could be .on("click") ~ Live
			$("#entities .btn-danger").click(function(){
				$(this).parent().remove();
				updateEntities();
			});

			updateEntities();
		}

	});
		

	// live on change handler as the input boxes aren't
	// always on the page
	$(document).on('change', '.entity input', function() {
		updateEntities();
	})

	function updateEntities(){
		newEntities = {};
		$(".entity").each(function(){

			name = $("span", this).text();
			value = $("input", this).val();

			newEntities[name] = value;

			console.log("test");

		});

		console.log(newEntities);

		// Set entities for current node
		window.selected.setEntities(newEntities);

	}

});