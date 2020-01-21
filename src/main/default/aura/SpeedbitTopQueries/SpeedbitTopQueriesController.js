({
  /**
   * Initialization of the component.
   * Get the search token, then query for top queries.
   */
  initComponent: function (component, event, helper) {
    helper.generateSearchToken(component)
    .then(
      $A.getCallback(function(result) {
        component.set('v.token', result);
        helper.executeQuery(component);
      })
    )
    .catch(
      $A.getCallback(function(error) {
        console.error(error);
      })
    );
  },

  /**
   * Handle the click on the table rows or on the anchor links to redirect to the search page and execute the query.
   */
  handleClick: function (component, event, helper) {
    var value = event.target.getAttribute('data-value');
    var urlToNavigate = '/global-search/' + encodeURIComponent('@uri');
    debugger;
    var urlEvent = $A.get('e.force:navigateToURL');
    urlEvent.setParams({
      url: urlToNavigate,
      isredirect: true
    });
    urlEvent.fire();

    window.location.hash = '#q=' + value;
  }
})