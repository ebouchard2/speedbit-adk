window.coveoCustomScripts['SpeedbitAgentPanel'] = function (promise, component) {
  const fakeActions = [
    {
      T: new Date('03/30/2019 12:00:00 EDT').getTime(),
      N: 'Search',
      V: { query_expression: 'Speedbit Charge problems' }
    },
    {
      T: new Date('04/22/2019 12:00:00 EDT').getTime(),
      N: 'Search',
      V: { query_expression: 'Speedbit Charge floor count' }
    },
    {
      T: new Date('04/27/2019 12:00:30 EDT').getTime(),
      N: 'Click',
      // Title : Updating your Speedbit
      V: { uri_hash: 'mfoRYJ7FF36cLEWW' }
    },
    {
      T: new Date('04/28/2019 12:00:45 EDT').getTime(),
      N: 'Search',
      V: { query_expression: 'Version 8.124' }
    },
    {
      T: new Date('04/27/2019 12:00:30 EDT').getTime(),
      N: 'Click',
      // Title : Wiki -> VERSION 8.124
      V: { uri_hash: 'ENyx4nqMcXpa6fe7' }
    },
    {
      T: new Date('04/29/2019 12:01:00 EDT').getTime(),
      N: 'Search',
      V: { query_expression: 'Speedbit Charge is skipping floors' }
    },
    {
      T: new Date('04/27/2019 12:00:30 EDT').getTime(),
      N: 'Click',
      // Title : Speedbit Blaze User Manual.pdf
      V: { uri_hash: 'Nz9iBðfgEqfQQR0X' }
    },
    {
      T: new Date('04/29/2019 18:01:45.123 EDT').getTime(),
      N: 'Custom',
      V: {
        event_type: 'CaseSubmit',
        event_value: ''
      }
    }
  ].map(action => {
    return {
      'name': action.N.toUpperCase(),
      'time': action.T,
      'value': action.V
    }
  });

  const documentsViewed = fakeActions.filter(action => action.name === 'CLICK').map(action => action.value.uri_hash);

  if (component && component.getElements) {
    var root = component.getElements().map(function (element) {
      return element.querySelector('.CoveoSearchInterface');
    }).find(function (element) {
      return element != null;
    });
  }

  if (root) {
    Coveo.$$(root).on(Coveo.InitializationEvents.beforeInitialization, () => {
      let userProfileModel = Coveo.get(root, 'UserProfileModel');
      if(userProfileModel) {
        userProfileModel.getActions = (userId) => { return userProfileModel.buildUserActions(fakeActions); }
      }
    });

    Coveo.$$(root).on(Coveo.QueryEvents.preprocessResults, (e, args) => {
      args.results.results.forEach(result => result['isUserActionView'] = documentsViewed.includes(result.raw.urihash));
    });
  }
}