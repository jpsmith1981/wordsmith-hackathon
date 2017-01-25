module.exports = {
    'GetCurrentStatusIntent': 'getcurrentstatus',
    'GetLocationDetailsIntent': 'getlocationdetails',
    'GetActivityDetailsIntent': 'getactivitydetails',
    'GetIncidentDetailsIntent': 'getincidentdetails',
    'GetInteractionDetailsIntent': 'getinteractiondetails',
    findUnused: function(intents){
        if(intents.indexOf('GetCurrentStatusIntent') == -1){
            return 'GetCurrentStatusIntent';
        }
        if(intents.indexOf('GetLocationDetailsIntent') == -1){
            return 'GetLocationDetailsIntent';
        }
        if(intents.indexOf('GetActivityDetailsIntent') == -1){
            return 'GetActivityDetailsIntent';
        }
        if(intents.indexOf('GetIncidentDetailsIntent') == -1){
            return 'GetIncidentDetailsIntent';
        }
        if(intents.indexOf('GetInteractionDetailsIntent') == -1){
            return 'GetInteractionDetailsIntent';
        }
    }
}