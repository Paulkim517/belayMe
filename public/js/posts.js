$(function(){

	//holds post functionality
	var postsController = {
		//underscore template compiler
		template: _.template($("#belay-template").html()),

		//get all posts
		all: function(){
			//AJAX call to server to get /api/ posts
			$.get('/api/posts', function(allPosts){
				event.preventDefault();
				console.log(allPosts)
				console.log("nice")
				  // iterate through all posts
        _.each(allPosts, function(post, index) {
          console.log(post);
          
          // pass log through underscore template
          var $postHtml = $(postsController.template(post));
          console.log($postHtml);
          
          // append log HTML to page
          $('#post-list').append($postHtml);
        });

			});
		},

 // create new post
    create: function(nameData,locationData, messageData) {
      // define object with our log data
      var postData = {name: nameData, location: locationData, message: messageData};
      
      // AJAX call to server to POST /api/posts
      $.post('/api/posts', postData, function(newPost) {
        console.log(newPost);
        
        // pass post through underscore template
        var $postHtml = $(postsController.template(newPost));
        console.log($postHtml);

        // append log HTML to page
        $('#post-list').append($postHtml);
        console.log("suck it")
      });
    },

     setupView: function() {
      // get all existing posts and render to page
      postsController.all();

      // add submit event on new log form
      $('#new-post').on('submit', function(event) {
        event.preventDefault();
        
        // grab post name, location, and message from form
        var postName = $('#name').val();
        var postLocation = $('#location').val();
        var postMessage = $('#message').val();

        // create new log
        postsController.create(postName, postLocation, postMessage);

        // reset the form
        $(this)[0].reset();
      });
    }
	};
		postsController.setupView();

});