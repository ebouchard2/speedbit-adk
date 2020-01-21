({
  getSearchUIRoot: function (component) {
    const coveoSearch = component.find('coveoCaseDeflection');
    const searchUIRoot = coveoSearch.get('v.searchUI');
    return searchUIRoot;
  },

  addStyles: function(component) {
    const searchUIRoot = this.getSearchUIRoot(component);
    // Css extensions
    let searchUIStyleExtentions = [];

    // Add basic resources if there are any
    const basicResources = searchUIRoot.get('v.searchUIStyleExtentions') || undefined;
    if(basicResources) searchUIStyleExtentions.push(basicResources);

    searchUIStyleExtentions.push($A.get('$Resource.speedbitstatic') + '/community/css/community-case-deflection.css');
    searchUIRoot.set('v.searchUIStyleExtentions', searchUIStyleExtentions.join(','));
  },

  bindEvents: function (component) {
    var _this = this;
    const coveoSearchUI = this.getSearchUIRoot(component);

    coveoSearchUI.proxyAddEventListener('deferredQuerySuccess', function (e, args) {
      _this.updateDebugInfos(component, args);
    });

    coveoSearchUI.proxyAddEventListener('querySuccess', function (e, args) {
      _this.highlightITD(component, args);
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

      if (query.lq) {
        debugInfos.push({
          'name': 'Large Expression',
          'value': query.lq
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
  },

  /**
   * Handle creating the proper highlighting for the keywords in the title and Excerpt of the results using ITD refined
   * keywords results.
   * @param {IComponent} component Salesforce aura component reference.
   * @param {IQuerySuccessEventArgs} querySuccessEventArgs Arguments for a querySuccess event.
   */
  highlightITD: function(component, querySuccessEventArgs) {
    if(querySuccessEventArgs.results && querySuccessEventArgs.results.refinedKeywords.length > 0) {
      // The query results.
      const results = querySuccessEventArgs.results.results;
      // The terms are returned in the form of ["keyword1", "keyword2 keyword3", "keyword4"].
      // So we join them with spaces as delimiter, then split on spaces to get each word separately.
      const keywordsToHighlight = querySuccessEventArgs.results.refinedKeywords.join(' ').split(' ');
      // Create a regex with each word in the refinedKeywords: /keyword1|keyword2|keyword3/ig .
      const regexp = new RegExp(keywordsToHighlight.join('|'), "ig");

      results.forEach(result => {
        // Find all words that match any of the keywords in the Excerpt of the result.
        const matchesExcerpt = result.excerpt.matchAll(regexp);
        for(const match of matchesExcerpt) {
          // Push the match position in the array of excerptHighlights on the result. The JSUI will then highlight them
          // in the text. <b>keyword</b>
          result.excerptHighlights.push({
            offset: match.index,
            length: match[0].length
          });
        }
        // Find all the words that match the keywords in the Title of the result.
        const matchesTitle = result.title.matchAll(regexp) 
        for (const match of matchesTitle) {
          // Push the match position in the array of titleHighlights on the result. The JSUI will then highlight them
          // in the rendered title. <b>keyword</b>
          result.titleHighlights.push({
            offset: match.index,
            length: match[0].length
          });
        }
      });
    }
  }

})