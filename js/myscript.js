//This file contains the javascript code for animals_data

// variables for all of the templates
var animals_template, class_template, species_template;

// variables to store the current displayed class and species
var current_class = animals_data.category[0];
var current_species = current_class.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data) {
	var html = template(data);
	$('#content').html(html);
}

$(document).ready(function () {
    
    //
	// compile all the templates ready for use
	//
	var source   = $("#animals-template").html();
    animals_template = Handlebars.compile(source);
    
    source   = $("#class-template").html();
	class_template = Handlebars.compile(source);
	
	source   = $("#species-template").html();
	species_template = Handlebars.compile(source);
    
    $(".animals-tab").click(function () {
        
        // displays the animals template
		showTemplate(animals_template, animals_data);

		// first make the currently active tab inactive
		$(".navbar-nav .active").removeClass("active");
		// then make animals tab active
		$(".animals-tab").addClass("active");

		// add an onclick to each animal category 
		$(".animals-thumbnail").click(function () {
            
            // get the index (position in the array)
			// of the animal class we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the animal class in
			// the array - @index)
			var index = $(this).data("id");

			// set the current class to this class
			current_class = animals_data.category[index];

			// display the class template
			showTemplate(class_template, current_class);
            
            // first make the currently active tab inactive
            $(".navbar-nav .active").removeClass("active");
		    // then make class tab active
		    $(".class-tab").addClass("active");

			// add an on click on all the species thumbnails
			$(".species-thumbnail").click(function () {
                
                // get the index (position in the array)
				// of the species we clicked on
				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which is set to the index of the photo in
				// the array - @index)
				var index = $(this).data("id");

				// set the current species to this species
				current_species = current_class.animals[index];
				
				// display the single species template
				showTemplate(species_template, current_species);
                
                // first make the currently active tab inactive
                $(".navbar-nav .active").removeClass("active");
		        // then make species tab active
		        $(".species-tab").addClass("active");
			});
		});
	});
    
    // 
	//  clicking on the class tab shows all of the 
	//  species in the current class
	//
	$(".class-tab").click(function () {
        showTemplate(class_template, current_class);
		$(".navbar-nav .active").removeClass("active");
		$(".class-tab").addClass("active");
		$(".species-thumbnail").click(function () {
			var index = $(this).data("id");
			current_species = current_class.animals[index];
			showTemplate(species_template, current_species);
		    $(".navbar-nav .active").removeClass("active");
		    $(".species-tab").addClass("active");
        });
    });
    
    $(".species-tab").click(function () {
        showTemplate(species_template, current_species);
        $(".navbar-nav .active").removeClass("active");
        $(".species-tab").addClass("active");
    });

	// start the page by showing the animals Category View
	// we do this by virtually clicking on the animals tab
    $(".animals-tab").click();
});