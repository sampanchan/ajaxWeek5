"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NYT_SearchAPI = /*#__PURE__*/function () {
  function NYT_SearchAPI() {
    var _this = this;

    _classCallCheck(this, NYT_SearchAPI);

    _defineProperty(this, "API_BASE_URL", 'https://api.nytimes.com/svc/search/v2/articlesearch.json');

    _defineProperty(this, "API_KEY", 'CdyLSaf5xyJlIpqFXkXyEAbZ3E9h9iTS');

    _defineProperty(this, "showMessage", function (message) {
      _this.messageEl.innerHTML = message;
    });

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();
      console.log('searching....');
      var term = document.querySelector('input[name="term"]').value;
      var data = {
        q: term,
        // begin_date:'',
        // end_date:'',
        'api-key': _this.API_KEY
      };
      axios.get(_this.API_BASE_URL, {
        params: data
      }).then(_this.processResults);
    });

    _defineProperty(this, "processResults", function (response) {
      console.log('got results!', response); // parent container

      var articleContainer = document.createElement('div');
      articleContainer.setAttribute('class', 'article-Container');
      var classResults = document.querySelector('.classResults');
      classResults.appendChild(articleContainer); // for loop for abstracts

      var abstracts = response.data.response.docs;
      console.log(abstracts.length);

      for (var i = 0; i < abstracts.length; i++) {
        // this.showMessage(abstracts[i].byline.original)
        // console.log(abstracts[i].byline)
        var doc = abstracts[i];
        var headline = doc.headline.main;
        var webUrl = doc.web_url;
        var photoUrl = doc.multimedia[0].url;
        var summary = doc.snippet;
        var sectionName = doc.section_name;
        var date = doc.pub_date; //Article Item

        var articleItemEl = document.createElement('div');
        articleItemEl.setAttribute('class', 'article-item');
        articleContainer.appendChild(articleItemEl); //title

        var titleEl = document.createElement('h2');
        articleItemEl.appendChild(titleEl); //photo

        var photoEl = document.createElement('img');
        articleItemEl.appendChild(photoEl);
        photoEl.setAttribute('src', 'https://www.nytimes.com/' + photoUrl); //date

        var dateEl = document.createElement('p');
        dateEl.setAttribute('class', '.article-date');
        articleItemEl.appendChild(dateEl); //about/abstract

        var abstractEl = document.createElement('p');
        abstractEl.setAttribute('class', 'abstract-container');
        articleItemEl.appendChild(abstractEl);
        abstractEl.textContent = summary; //section_name

        var sectionNameEl = document.createElement('p');
        articleItemEl.appendChild(sectionNameEl);
        sectionNameEl.textContent = sectionName; // anchor-link

        var linkEl = document.createElement('a');
        articleItemEl.appendChild(linkEl);
        var headlineEl = document.createElement('h3');
        headlineEl.textContent = headline;
        linkEl.appendChild(headlineEl);
        linkEl.setAttribute('href', webUrl);
        linkEl.setAttribute('target', '_blank');
      } // get date on DOM
      // show more input fields 

    });

    this.messageEl = document.querySelector('p.message');
    this.setUpListener();
  }

  _createClass(NYT_SearchAPI, [{
    key: "setUpListener",
    value: function setUpListener() {
      var form = document.querySelector('form[name="article_search"]');
      form.addEventListener('submit', this.handleSearch);
    }
  }]);

  return NYT_SearchAPI;
}();

new NYT_SearchAPI();
//# sourceMappingURL=nyt-api.js.map
