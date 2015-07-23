$(function() {

  // `usersController` holds users functionality
  var usersController = {

    // compile underscore templates
    template: _.template($('#user-template').html()),
    postTemplate: _.template($('#belay-template').html()),

    // get current (logged-in) user
    show: function() {
      // AJAX call to server to GET /api/users/current
      $.get('/api/users/current', function(user) {
        console.log(user);

        // pass user through profile template
        $userHtml = $(usersController.template({currentUser: user}));

        // append user HTML to page
        $('#show-user').append($userHtml);

        // iterate through user's logs
        _.each(user.posts, function(post, index) {
          console.log(post);

          // pass log through underscore template
          $postHtml = $(usersController.postTemplate(post));

          // append log HTML to page
          $('#belay-list').append($postHtml);
        });
      });
    },

    // create new log for current user
    createPost: function(nameData, locationData, messageData) {
      // define object with our log data
      var logData = {name: nameData, location: locationData, message: messageData};
      
      // AJAX call to server to POST /api/users/current/logs
      $.post('/api/users/current/posts', postData, function(newPost) {
        console.log(newPost);
        
        // pass log through underscore template
        var $postHtml = $(usersController.belay-Template(newPost));
        console.log($postHtml);

        // append log HTML to page
        $('#post-list').append($postHtml);
      });
    },

    setupView: function() {
      // get current user
      usersController.show();

      // add submit event on new log form
      $('#new-post').on('submit', function(event) {
        event.preventDefault();
        
        // grab log type and calories from form
        var postName = $('#name').val();
        var postLocation = $('#location').val();
        var postMessage = $('#message').val();
        // create new log
        usersController.createPost(postName, postLocation, postMessage);

        // reset the form
        $(this)[0].reset();
      });
    }
  };

  usersController.setupView();

});