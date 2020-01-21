({
  getSearchUIRoot: function (component) {
    const coveoSearch = component.find('coveoSearch');
    const searchUIRoot = coveoSearch.get('v.searchUI');
    return searchUIRoot;
  },

  addStyles: function (component) {
    const searchUIRoot = this.getSearchUIRoot(component);
    // Css extensions
    let searchUIStyleExtentions = [];

    // Add basic resources if there are any
    const basicResources = searchUIRoot.get('v.searchUIStyleExtentions') || undefined;
    if (basicResources) searchUIStyleExtentions.push(basicResources);

    searchUIStyleExtentions.push($A.get('$Resource.speedbitstatic') + '/community/css/community-search.css');

    searchUIRoot.set('v.searchUIStyleExtentions', searchUIStyleExtentions.join(','));
  },

  bindEvents: function (component) {
    var _this = this;
    const searchUIRoot = this.getSearchUIRoot(component);
    searchUIRoot.registerBeforeInit(function (cmp, rootInterface, Coveo) {

      searchUIRoot.proxyAddEventListener('buildingQuery', function (e, args) {
        _this.handlePersonalization(component, args.queryBuilder);
      });

      searchUIRoot.proxyAddEventListener('deferredQuerySuccess', function(e, args) {
        const results = args.results.results;
        // hack to open the sandbox knowledge article instead of prod.
        results.forEach(result => result.raw.sfid = (result.raw.sfid === 'kA03s000000NvKWCA0') ? 'kA00v0000006SjG' : result.raw.sfid);
      })

      searchUIRoot.proxyAddEventListener('changeAnalyticsCustomData', function(e, args) {
        if(args && args.type === 'ClickEvent') {
          const newAction = {
            timestamp: new Date(),
            icon: 'utility:touch_action',
            type: 'Click',
            value: args.resultData.title
          };
          const pubsub = component.find('pubsub');
          pubsub.fireEvent('historyChange', newAction);
        }
      });

      searchUIRoot.proxyAddEventListener('doneBuildingQuery', function(e, args) {
        const qb = args.queryBuilder;
        if(qb && qb.expression) {
          const userQuery = qb.expression.build();
          const newAction = {
            timestamp: new Date(),
            icon: 'utility:search',
            type: 'Query',
            value: userQuery
          };
          const pubsub = component.find('pubsub');
          pubsub.fireEvent('historyChange', newAction);
          const actionsHistory = localStorage.getItem('coveoActionsData');
          qb.addContextValue('actions', actionsHistory);
        }
      });
    });
  },

  handlePersonalization: function (component, queryBuilder) {
    //var select = component.find('perso-select').get('v.value');
    /*switch (select) {
      case "new-customer":
        queryBuilder.constantExpression.add("$qre(expression:@connectortype==YouTubeCrawler, modifier:'250')");
        queryBuilder.addContextValue('UserRole', select);
        break;
      case "sales-rep":
        queryBuilder.constantExpression.add("$qre(expression:@objecttypename==File, modifier:'250')");
        queryBuilder.addContextValue('UserRole', select);
        break;

      default:
        queryBuilder.addContextValue('UserRole', "");
        break;
    }

    const coveoActionsData = localStorage.getItem('coveoActionsData') || '[]';
    const actionsHistory = JSON.parse(coveoActionsData);
    if(actionsHistory.filter(action => {action.type === 'View' && action.value.includes('Blaze')})) {
      queryBuilder.addContextValue('ProductReferrer', 'Speedbit Blaze');
    }*/
  },

  triggerNewQuery: function (component) {
    const searchUIRoot = this.getSearchUIRoot(component);
    searchUIRoot.executeImmediate(function (cmp, root, Coveo) {
      var searchEvent = { name: 'demo-personalization-change', type: 'demo' }
      searchUIRoot.logSearchEvent(searchEvent, {});
      searchUIRoot.executeQuery();
    });
  },

  savePersoState: function (cmp) {
    //var persoValue = cmp.find('perso-select').get('v.value');
    //window.localStorage.setItem('persoValue', persoValue);
  },

  loadPersoState: function (cmp) {
    //var persoState = window.localStorage.getItem('persoValue') || "";
    //cmp.find('perso-select').set('v.value', persoState);
  }

})