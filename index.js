"use strict"

const Alexa = require('alexa-sdk');
const templates = require('./Templates');
var session = require('./Session');

const wordsmithAPIKey = '3861c2becc354261579e06cae7bbbc775dc1c08db5b039c4a514831375823189';
const wordsmith = require('wordsmith-node-sdk')(wordsmithAPIKey, 'GreatCall');

var handlers = {


    'AMAZON.HelpIntent': function() {
        var personName = this.getCurrentPersonNameOrNull();
        if (personName != null) {
            this.emit(':ask', 'I can tell you about how ' + personName + ' is doing.  Try saying, how is ' + personName );
        } else {
            this.emit(':ask', 'I can tell you about how mom or dad is doing', 'Try saying, how is Mom.');
        }
      },

    'AMAZON.StopIntent': function(){
        this.emit(':tell', 'Goodbye.');
    },

    'Unhandled': function() {
        this.emit('AMAZON.HelpIntent');
    },

    'GetCurrentStatusIntent': function(){
       executeIntent(this, 'GetCurrentStatusIntent');
    },
    
    'GetLocationDetailsIntent': function(){
        executeIntent(this, 'GetLocationDetailsIntent');
    },
    
    'GetActivityDetailsIntent': function(){
        executeIntent(this, 'GetActivityDetailsIntent');
    },

    'GetIncidentDetailsIntent': function(){
        executeIntent(this, 'GetIncidentDetailsIntent');
    },

    'GetInteractionDetailsIntent': function(){
        executeIntent(this, 'GetInteractionDetailsIntent');
    },

    'TellMeMoreIntent': function(){
        const history = this.attributes['history'] || [];
        const next = templates.findUnused(history);
        if(next){
            this.emit(next);
        }
        else{
            this.emit(':tell', 'Technology is not a replacement for human interaction.  Please call them.');
        }
    },

    'SendEncouragementIntent': function(){
        this.emit(':ask', 'Thank you, I am sure it is appreciated');
    },

    'AMAZON.YesIntent': function(){
        const previousIntent = this.attributes['previousIntent'];
        if(previousIntent == 'GetInteractionDetailsIntent'){
            this.emit('SendEncouragementIntent');
        }
        else{
            this.emit(':ask', 'We do not understand');
        }
    },

    'AMAZON.NoIntent': function(){
        const previousIntent = this.attributes['previousIntent']; 
        if(previousIntent == 'GetInteractionDetailsIntent') {
            var data = getCurrentPersonNameOrNull(this);
            var pronoun = "They";
            if (data != null) {
                var g = (data.gender + '').toLowerCase().trim();
                if (g === 'male'){
                    pronoun = 'he';
                }
                if (g === 'female'){
                    pronoun = 'she';
                }
            }
            this.emit(':ask', 'Ok, ' + pronoun + ' are not going to be angry, just disappointed');
        }
        else {
            this.emit(':ask', 'We do not understand');
        }

    },

    'SpecifyPersonIntent': function(){
        var self = this;

        const personSlot = this.event.request.intent.slots.Person;
        let personName;
        if(personSlot && personSlot.value){
            personName = personSlot.value;
            this.attributes['personName'] = personName;
        }
        else{
            this.emit(':ask', 'Who are you talking about');
            return;
        }

        const previousIntent = this.attributes['previousIntent'];
        if(!previousIntent){
            this.emit(':ask', 'what do you want to know?');
        }
        else{
            this.emit(previousIntent);
        }

        
    }
};

function getCurrentPersonNameOrNull(context){

    const personSlot = context.event.request.intent.slots.Person;
    let personName;
    if(personSlot && personSlot.value) {
        personName = personSlot.value;
    } else {
        personName = null;
    }
    return personName;
}

function executeIntent(context, intentName) {
    const personSlot = context.event.request.intent.slots.Person;
    
    let personName;
    const templateName = templates[intentName];
    context.attributes['previousIntent'] = intentName;
    let history = context.attributes['history'] || [];

    if(personSlot && personSlot.value){
        personName = personSlot.value;
        context.attributes['personName'] = personName;
        history = [];
    }
    else{
        personName = context.attributes['personName'] || null;
    }

    // Update history
    if(personName) {
        const data = session.findProfileByNameOrNull(personName);
        if(!data){
            context.emit(':ask', 'Sorry, I did not recognize that person.');
            return;
        }
        history.push(intentName);
        context.attributes['history'] = history;
        console.log(`Slot name ${personName}`);
        wordsmith.projects.find('wshack')
        .then(project => project.templates.find(templateName))
        .then(template => template.generate(data))
        .then((content) => {
            // content is the text generated by Wordsmith
            context.emit(':askWithCard', content, content, 'PersonName', personName);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    else{
        context.emit(':ask', 'Who are you talking about');
    }
}



exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
