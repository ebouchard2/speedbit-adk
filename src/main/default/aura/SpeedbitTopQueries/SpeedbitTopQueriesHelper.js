({
  /**
   * Execute the query to the querySuggest endpoint with the token.
   */
  executeQuery: function (component) {
    var _this = this;
    var token = component.get('v.token');

    var url = 'https://platform.cloud.coveo.com/rest/search/v2/querySuggest?'
              + 'access_token='
              + token
              + '&language=en'
              + '&searchHub='
              + component.get('v.searchHub');

    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      _this.handleQuerySuggestResponse(component, JSON.parse(this.responseText));
    });
    xhr.open("GET", url);
    xhr.send();
  },

  /**
   * Returns a promise that will be resolved with the result of the creation of a search token in an Apex controller.
   */
  generateSearchToken: function (component) {
    return new Promise(function (resolve, renew) {
      var searchHub = component.get('v.searchHub');
      var action = component.get('c.generateToken');

      action.setParams({
        searchHub: searchHub
      });

      action.setCallback(this, function (response) {
        if (response.getState() === 'SUCCESS') {
          resolve(response.getReturnValue());
        } else {
          var errorMessage = 'Unknown error.';
          try {
            errorMessage = response.getError()[0].message;
          } finally {
            reject(errorMessage);
          }
        }
      });

      $A.enqueueAction(action);
    });
  },

  /**
   * This handles the response from the querySuggest endpoing and formats the response to set it to the component
   * attribute `topQueries`.
   */
  handleQuerySuggestResponse: function (component, response) {
    var suggestions = [];
    response.completions.forEach(function(query) {
      suggestions.push(query);
    });
    component.set('v.topQueries', suggestions);
  }
})