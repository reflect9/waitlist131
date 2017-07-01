import React, { Component } from 'react';
import * as Survey from 'survey-react';

class SurveyPage extends Component{
    constructor(props) {
        super(props);
        this.sendDataToServer = this.sendDataToServer.bind(this);
        this.json = props.json;
        Survey.Survey.cssType = "bootstrap";
        Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
        Survey.defaultBootstrapCss.progressBar = "btn-green";
    }
    sendDataToServer(survey) {
        var resultAsString = JSON.stringify(survey.data);
        alert(resultAsString); //send Ajax request to your web server.
    }
    render() {
        return (
            <div className='survey_wrapper'>
                <Survey.Survey json={this.json} onComplete={this.sendDataToServer} />
            </div>
        );
    }   
}

export default SurveyPage;