({
  getSearchUIRoot: function (component) {
    const coveoSearch = component.find('coveoAgentPanel');
    const searchUIRoot = coveoSearch.get('v.searchUI');
    return searchUIRoot;
  },

  bindEvents: function(component) {
    var _this = this;
    const coveoSearchUI = this.getSearchUIRoot(component);
    const recordId = component.get('v.recordId');

    coveoSearchUI.proxyAddEventListener('deferredQuerySuccess', function (e, args) {
      _this.updateDebugInfos(component, args);
    });
    
    coveoSearchUI.registerBeforeInit(function(cmp, root, Coveo) {
      coveoSearchUI.proxyAddEventListener('doneBuildingQuery', function (e, args) {
        if(recordId) {
          var qb = args.queryBuilder;
          // Do not show up self in the results.
          qb.advancedExpression.addFieldNotEqualExpression('@sfid', [recordId]);
        }
      });
    });
  },

  updateDebugInfos: function (component, querySuccessEventArgs) {
    if (querySuccessEventArgs) {
      
      var debugInfos = [];
      var query = querySuccessEventArgs.query;
      var results = querySuccessEventArgs.results;

      if (query.searchHub) {
        debugInfos.push({
          'name': 'SearchHub',
          'value': query.searchHub
        });
      }

      if (results.pipeline) {
        debugInfos.push({
          'name': 'Pipeline',
          'value': results.pipeline
        });
      }

      if (query.context) {
        debugInfos.push({
          'name': 'Context',
          'value': JSON.stringify(query.context, null, 4)
        });
      }

      if (results.refinedKeywords) {
        debugInfos.push({
          'name': 'refinedKeywords',
          'value': results.refinedKeywords.join(', ')
        });
      }
      
      component.set('v.debugInfos', debugInfos);
    }
  }
})