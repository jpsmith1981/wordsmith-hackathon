/**
 * Created by scottbrenton on 1/24/17.
 */
module.exports = {
    "Mom": {
        aliases:['mom','mom\'s', 'shelley', 'shelley\'s'],
        profile: {
            userid:1,
            name:'Shelley',
            alias:'Mom',
            gender:'Female',
            relationship:'Mom',
            steps: 8189,
            avgdailysteps: 6543,
            challengescompleted: 2,
            pointsearned: 692,
            lastknownlocation: "Home",
            lastknownlocationtimestamp: 12,
            previousknownlocation: "Doctor's Office",
            placesvisitedthisweek: ['Salon','Pacific Beach'],
            peopleinteractedwith: "Sam, Mike",
            fencecrossinglast24: "8",
            encouragementreceived: 2,
            "5starcalls": 0,
            "911calls": 0,
            fallsdetected: 0,
            stepslastweek: 23678,
            currentweather: "Partly Cloudy",
            weatherhigh: "68",
            weatherlow: "44",
            "3dayforecast": "",
            severealerts: "Flash Floods"
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
        aliases: ['dad','dad\'s','richard', 'richard\'s'],
        profile: {
            userid:2,
            name:'Richard',
            alias:'Dad',
            gender:'Male',
            relationship:'Dad',
            steps: 5432,
            avgdailysteps: 9654,
            challengescompleted: 1,
            pointsearned: 477,
            lastknownlocation: "Out and About",
            lastknownlocationtimestamp: 11,
            previousknownlocation: "Casino",
            placesvisitedthisweek: ['Library','Senior Center'],
            peopleinteractedwith: "Crystal",
            fencecrossinglast24: "4",
            encouragementreceived: 1,
            "5starcalls": 0,
            "911calls": 1,
            fallsdetected: 0,
            stepslastweek: 18974,
            currentweather: "Partly Cloudy",
            weatherhigh: "68",
            weatherlow: "44",
            "3dayforecast": "",
            severealerts: "Flash Floods"
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
    findProfileByNameOrNull: function(personName){
        var session = this;
        var target = (personName + '').toLowerCase().trim();
        var data = null;
        session['Mom'].aliases.forEach(item =>{
            if (item === target){
                data = session['Mom'].profile;
            }
        });
        session['Dad'].aliases.forEach(item =>{
            if (item === target){
                data = session['Dad'].profile;
            }
        });
        return data;
    }

};
