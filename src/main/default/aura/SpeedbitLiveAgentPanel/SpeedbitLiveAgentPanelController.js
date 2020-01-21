({
    fillDebugInfo: function (component, event, helper) {
      var coveoAgentPanel = component.find('coveoAgentPanel');
      var coveoSearchUI = coveoAgentPanel.get('v.searchUI');
      coveoSearchUI.proxyAddEventListener('deferredQuerySuccess', function (e, args) {
        helper.updateDebugInfos(component, args);
      });
    }
  })