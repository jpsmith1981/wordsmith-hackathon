/**
 * Created by scottbrenton on 1/24/17.
 */
var SessionMap = {
    "Mom": {
        profile: {
            userid:1,
            name:'Shelley',
            alias:'Mom',
            gender:'Female',
            relationship:'Mom'
        },
        activity:{
            steps: 4534,
            challengescompleted: 2,
            pointsearned: 8546,
            lastknownlocation: "Home",
            lastknownlocationtimestamp: 12
        },
        session: {
            previousIntent: '',
            currentIntent: '',
            history: [
            {'GetCurrentStatusIntent': false},
            {'GetLocationDetailsIntent': false},
            {'GetActivityDetailsIntent': false},
            {'GetIncidentDetailsIntent': false},
            {'GetInteractionDetailsIntent': false}
        ]}
    },
    "Dad":{
        profile: {
            userid:2,
            name:'Richard',
            alias:'Dad',
            gender:'Male',
            relationship:'Dad'
        },
        activity:{
            steps: 5432,
            challengescompleted: 1,
            pointsearned: 6576,
            lastknownlocation: "Home",
            lastknownlocationtimestamp: 11
        },
        session: {
            previousIntent: '',
            currentIntent: '',
            history: [
                {'GetCurrentStatusIntent': false},
                {'GetLocationDetailsIntent': false},
                {'GetActivityDetailsIntent': false},
                {'GetIncidentDetailsIntent': false},
                {'GetInteractionDetailsIntent': false}
            ]}
    },
    "Unknown":{}
};