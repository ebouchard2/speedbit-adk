({
  searchInitialized: function (cmp, event, helper) {
    helper.bindEvents(cmp);
  },

  handlePersoChange: function (cmp, event, helper) {
    helper.savePersoState(cmp);
    helper.triggerNewQuery(cmp);
  },

  doInit: function (component, event, helper) {

    const searchUIRoot = helper.getSearchUIRoot(component);
    const _component = component;

    searchUIRoot.registerBeforeInit(function (component) {

      searchUIRoot.setSearchInterfaceOptions({
        FlowResultLink: {
          onClick: function (e, result) {
            const startFlowEvent = _component.getEvent('startFlowEvent');
            startFlowEvent.setParam('flowAPIName', result.raw.sfflowapinamec);
            startFlowEvent.fire();
          }
        }
      });
    });

    helper.loadPersoState(component);
    helper.bindEvents(component);
    helper.addStyles(component);
  },

  handleStartFlow: function (component, event) {
    const _component = component;
    const flowApiName = event.getParam('flowAPIName');
    if (flowApiName) {
      let modalBody;
      $A.createComponent("c:CustomFlowLauncher", {
        'flowApiName': flowApiName,
        'finishedHandler': $A.getCallback(function(output) {
          _component.get('v.modalPromise').then(function(modal) {
            if(modal) {
              modal.close();
            }
          });
        })
      },
      function (content, status, message) {
        if (status === "SUCCESS") {
          modalBody = content;
          const modalPromise = component.find('overlayLib').showCustomModal({
            body: modalBody,
            showCloseButton: true,
            cssClass: "mymodal"
          });
          _component.set('v.modalPromise', modalPromise);
        } else {
          console.error(message);
        }
      });
    }
  }
})