({
    doInit : function(component, event, helper) {
        const flow = component.find('flowData');
        flow.startFlow(component.get('v.flowApiName'));
    },

    handleStatusChange: function(component, event) {
        if(event.getParam("status") === "FINISHED") {
            const outputVariables = event.getParam("outputVariables");
            const finishedHandler = component.get('v.finishedHandler');
            if(finishedHandler instanceof Function) {
                finishedHandler(outputVariables);
            }
        }
    }
})