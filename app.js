$(document).ready(function() {
        var $tweetList = $('.tweet-list');
        var $tweetTemplate = $('<div class="tweet"><div class="user-pic"><span class="glyphicon glyphicon-user"></span></div><span class="user-name"></span><p class="tweet-content"></p><span class="time-stamp"></span></div>');
        var $homeButtons = $('.home-buttons');
        var $userButtons = $('.user-buttons');
        var $newTweetForm = $('.new-tweet');
        window.visitor = "";
        var $visitor = $('#newTweetUserName');

        // Creates and returns new tweet list item 
        var newTweet = function(tweet) {
          var $tweet = $tweetTemplate.clone();
          $tweet.addClass('tweet');

          $tweet.find('.user-name').text('@' + tweet.user);

          $tweet.find('.tweet-content').text(tweet.message);

          $tweet.find('.time-stamp').text(tweet.created_at);


          // TODO: Add like and comment/reply buttons to tweet template
          //var $likeButton = $('<button type ="button" class="btn-default btn-lg like"></button>');
          //$likeButton.html('<span class="glyphicon glyphicon-heart"></span>');

          //var $replyButton = $('<button type ="button" class="btn-default btn-lg comment"></button>');
          //$replyButton.html('<span class="glyphicon glyphicon-comment"></span>');

          $tweet.find('.user-pic').html('<span class="glyphicon glyphicon-user"></span>');
          /* TODO: Allow user to have a profile pic.  Will need to make user an object instead of an array of tweets
            if (tweet.user.picURL){
              $userPic = $('<img>');
              $userPic.src = tweet.user.picURL;
            }
          */
          return $tweet;
        };
        // Utility function to prepend array of tweets to tweetList.  
        // Used by inital loading of tweets and refreshing the tweetList
        var showTweets = function(tweets) {
          var tweetsToAdd = [];
          tweets.forEach(function(tweet) {
            tweetsToAdd.push(newTweet(tweet));
          });
          $tweetList.prepend(tweetsToAdd.reverse());
          $('.user-name').click(showUserTweets);
          $('.user-pic').click(showUserTweets);
        };


        var clearTweets = function() {
          $tweetList.empty();
        };


        // Load initial batch of tweets
        var loadTweets = function() {
          clearTweets();
          $newTweetForm.hide();
          $userButtons.hide();
          $homeButtons.show();
          showTweets(streams.home);
        };
        

        // Show any new tweets since the last refresh or load
        var refreshTweets = function() {
          var tweetListLength = $tweetList.children().length;
          var newTweetsLength = streams.home.length - tweetListLength;
          // Briefly show a notification if no new tweets to show
          if (newTweetsLength === 0) {
            $noNewTweetsMsg = $('<div class="alert alert-success" role="alert">No new twittles</div>');
            $noNewTweetsMsg.prependTo($tweetList).fadeIn("slow").fadeOut("slow");
            $noNewTweetsMsg = null;
          }
          else {
            showTweets(streams.home.slice(tweetListLength));
          }
        };

        // Handler to show a user's tweets when the username is clicked
        var showUserTweets = function() {
          clearTweets();
          var userName = !!$(this).text() ? $(this).text().slice(1) : $(this).next().text().slice(1);
          showTweets(streams.users[userName]);
          $homeButtons.hide();
          $('.user-header').text('@' + userName);
          $userButtons.show();
          $(document).scrollTop(0);
        };

        // Handler to display/hide the new tweet form
        var toggleNewTweetForm = function() {
          if ($newTweetForm.is(":visible")) {
            $('#newTweet').val("");
            $newTweetForm.slideToggle("slow");
            loadTweets();
          }
          else {
            $userButtons.hide();
            $homeButtons.hide();
            $newTweetForm.slideToggle();
            $visitor.focus();
          }
        };

        var postNewTweet = function(e) {
          // If no tweet is posted, roll with it and go back to the main page
          if ($('#newTweet').val() === "" || $visitor === "") {
            toggleNewTweetForm();
          }
          else {
            window.visitor = $visitor.val();
            var tweet = $('#newTweet').val();
            window.writeTweet(tweet);
            toggleNewTweetForm();
            e.preventDefault();
          }
        };

        // Load initial tweets when user first loads the page
        loadTweets();

        // Event Handlers
        $('.refresh-tweets').click(refreshTweets);
        $('.back').click(loadTweets);
        $('.add-tweet').click(toggleNewTweetForm);
        $('.cancel-form').click(toggleNewTweetForm);
        $('.post-tweet').click(postNewTweet);
        $('.post-tweet').on('keydown', function(e) {
          if (e.keyCode === 9 && !e.shiftKey) {
            $('.cancel-form').focus();
            e.preventDefault();
          }
        });


});