"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var YelpApi = /*#__PURE__*/function () {
  function YelpApi() {
    var _this = this;

    _classCallCheck(this, YelpApi);

    _defineProperty(this, "API_KEY", 'Tow02LN0q2c-t3X-Sq8qlJOMtFc7-tmsGglB_PJ927cw4FMErKxZI8EJN5FaAFuZGL5_6USYexsippLsH5f8NOurISqUA02NvVF_zWYeoocmtlhSUZsqy8d4esl9YHYx');

    _defineProperty(this, "API_BASE_URL", 'https://circuslabs.net/proxies/yelp-fusion-proxy/');

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();
      console.log('searching....');
      var term = document.querySelector('input[name="term"]').value;
      var location = document.querySelector('input[name="location"]').value;
      var radius = document.querySelector('input[name="radius"]').value;
      console.log(radius); // ASK GREG for conversion

      var sort = document.querySelector('[name="sort-by"]').value;
      var price = document.querySelectorAll('[name="dollar"]:checked');
      var priceArray = [];

      for (var x = 0, l = price.length; x < l; x++) {
        priceArray.push(price[x].value); // console.log(price[x])
      }

      if (price.length === 0) {
        priceTerm === 0;
      } else {
        var priceTerm = priceArray.join(", ");
      }

      console.log(priceTerm);
      var open = document.querySelector('[name="open-now"]');
      var openNow = open.checked;
      var data = {
        _ep: '/businesses/search',
        term: term,
        location: location,
        sort_by: sort,
        radius: radius,
        price: priceTerm,
        open_now: openNow
      };
      var headers = {
        Authorization: "Bearer ".concat(_this.API_KEY)
      };
      axios.get(_this.API_BASE_URL, {
        params: data,
        headers: headers
      }).then(_this.processResults);
    });

    _defineProperty(this, "processResults", function (data) {
      var results = data.data.businesses;
      console.log('we got data!', results); //parent container

      var articleContainer = document.createElement('div');
      articleContainer.setAttribute('class', 'business-Container');
      var classResults = document.querySelector('.classResults');
      classResults.appendChild(articleContainer); //loop for businesses

      console.log(results.length);

      for (var i = 0; i < results.length; i++) {
        var business = results[i];
        var name = business.name;
        var photo = business.image_url;
        var price = business.price;
        var rating = business.rating;
        var transactionType = business.transactions; // Business Item

        var businessItemEl = document.createElement('div');
        businessItemEl.setAttribute('class', 'business-item');
        articleContainer.appendChild(businessItemEl); //Name

        var nameEl = document.createElement('h2');
        businessItemEl.appendChild(nameEl);
        nameEl.textContent = name; //location 

        var location = business.location.display_address;
        var locationEl = document.createElement('h3');
        businessItemEl.appendChild(locationEl);
        locationEl.textContent = location; //image 

        var photoEl = document.createElement('img');
        businessItemEl.appendChild(photoEl);
        photoEl.setAttribute('src', photo); //categories

        var category = business.categories;
        var categoryEl = document.createElement('h4');
        businessItemEl.appendChild(categoryEl);
        categoryEl.textContent = category.map(function (cat) {
          return cat.title;
        }).join('\n');
        businessItemEl.appendChild(categoryEl); //price

        var priceEL = document.createElement('p');
        priceEL.setAttribute('class', 'dollar-sign-price');
        businessItemEl.appendChild(priceEL);
        priceEL.textContent = price; //rating

        var ratingEl = document.createElement('p');
        ratingEl.setAttribute('class', 'rating');
        businessItemEl.appendChild(ratingEl);
        ratingEl.textContent = rating + '😉'; //transaction

        var transactionEL = document.createElement('p');
        transactionEL.setAttribute('class', 'transaction_type');
        businessItemEl.appendChild(transactionEL);
        transactionEL.textContent = transactionType;
      }
    });

    this.setUpListener();
  }

  _createClass(YelpApi, [{
    key: "setUpListener",
    value: function setUpListener() {
      var form = document.querySelector('form[name="business_search"]');
      form.addEventListener('submit', this.handleSearch);
    }
  }]);

  return YelpApi;
}();
//# sourceMappingURL=yelp.js.map
