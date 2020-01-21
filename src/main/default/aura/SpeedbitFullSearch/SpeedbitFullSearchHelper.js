({
  renameTab: function (component) {
    var workspaceApi = component.find('workspace');
    workspaceApi.getEnclosingTabId().then(function (tabId) {
      if (tabId) {
        workspaceApi.setTabLabel({
          tabId: tabId,
          label: "Coveo Search"
        });
        workspaceApi.setTabIcon({
          tabId: tabId,
          icon: "utility:search"
        });
      }
    });
  },

  injectStyles: function(component) {    
    const coveoSearch = component.find('coveoFullSearch');
    const searchUIRoot = coveoSearch.get('v.searchUI');
    // Css extensions
    let searchUIStyleExtentions = [];

    // Add basic resources if there are any
    const basicResources = searchUIRoot.get('v.searchUIStyleExtentions') || undefined;
    if(basicResources) searchUIStyleExtentions.push(basicResources);

    searchUIStyleExtentions.push($A.get('$Resource.speedbitstatic') + '/agent-panel/css/agent-fullsearch.css');
    searchUIRoot.set('v.searchUIStyleExtentions', searchUIStyleExtentions.join(','));
  }
})