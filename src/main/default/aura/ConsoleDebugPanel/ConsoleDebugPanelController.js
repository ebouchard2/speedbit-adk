({
  closeDebug: function(component, event, helper) {
    component.set('v.showDebugPanel', false);
  },

  showDebug: function(component, event, helper) {
    component.set('v.showDebugPanel', true);
  }
})