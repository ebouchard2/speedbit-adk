({
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