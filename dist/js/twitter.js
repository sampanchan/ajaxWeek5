"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TwitterApi = /*#__PURE__*/function () {
  // same as localhost:8888
  function TwitterApi() {
    var _this = this;

    _classCallCheck(this, TwitterApi);

    _defineProperty(this, "API_BASE_URL", 'twitter-proxy.php');

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();
      console.log('searching....');
      var term = document.querySelector('input[name="term"]').value;
      var data = {
        op: 'search_tweets',
        q: term
      };
      var form = document.querySelector('form[name="twitter_search"]');
      form.reset();
      axios.get(_this.API_BASE_URL, {
        params: data
      }).then(_this.processResults).catch(_this.handleError);
    });

    _defineProperty(this, "processResults", function (data) {
      var results = data.data.statuses;
      console.log('we got data!', results);
      var tweetContainer = document.createElement('div');
      tweetContainer.setAttribute('class', 'tweet-container');
      var tweetResults = document.querySelector('.tweetResults');
      tweetResults.appendChild(tweetContainer);

      for (var i = 0; i < results.length; i++) {
        var tweets = results[i];
        var userPhoto = tweets.user.profile_image_url;
        var username = tweets.user.screen_name;
        var name = tweets.user.name;
        var tweetMessage = tweets.text;
        var source = tweets.source;
        var date = tweets.created_at; // Twitter Item

        var tweetItemEl = document.createElement('div');
        tweetItemEl.setAttribute('class', 'tweet-item');
        tweetContainer.appendChild(tweetItemEl); //image- profile

        var userPhotoEl = document.createElement('img');
        tweetItemEl.appendChild(userPhotoEl);
        userPhotoEl.setAttribute('src', userPhoto); //Username

        var usernameEl = document.createElement('h3');
        tweetItemEl.appendChild(usernameEl);
        usernameEl.textContent = "@" + username; //name

        var nameEl = document.createElement('h4');
        tweetItemEl.appendChild(nameEl);
        nameEl.textContent = name; //tweet

        var tweetMessageEl = document.createElement('p');
        tweetItemEl.appendChild(tweetMessageEl);
        tweetMessageEl.textContent = tweetMessage; //date

        var dateEl = document.createElement('p');
        dateEl.setAttribute('class', 'date-item');
        tweetItemEl.appendChild(dateEl);
        dateEl.textContent = date; //source: iphone/android

        var sourceEl = document.createElement('a');
        sourceEl.setAttribute('class', 'source-item');
        sourceEl.innerHTML = source;
        tweetItemEl.appendChild(sourceEl);
        var sourceTextOnly = sourceEl.textContent; // sourceEl.textContent = source;
      }
    });

    _defineProperty(this, "handleError", function (err) {
      console.log('ERROR!', err);
    });

    this.setUpListener();
  }

  _createClass(TwitterApi, [{
    key: "setUpListener",
    value: function setUpListener() {
      var form = document.querySelector('form[name="twitter_search"]');
      form.addEventListener('submit', this.handleSearch);
    }
  }]);

  return TwitterApi;
}();
//# sourceMappingURL=twitter.js.map
