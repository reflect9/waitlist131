import React, { Component } from 'react';
import * as Survey from 'survey-react';
import * as Utils from './utils.js';

class SurveyPage extends Component{
    constructor(props) {
        super(props);
        this.json = props.json;
        this.userid = props.userid;
        Survey.Survey.cssType = "bootstrap";
        Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
        Survey.defaultBootstrapCss.progressBar = "btn-green";
        this.processHtml = this.processHtml.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
        
    }
    // Preprocess HTML of the completion page based on the data
    processHtml(survey, options){
        // If the survey was completed because participants picked "Others" as their browser
        // then show a message that says 'sorry'. 
        if(survey.isCompleted) {
            if (survey.data.browser.indexOf("other") != -1) {
                options.html = `<div class='surveyResult' style='height:300px; padding:30px;'>
                    <h3>We are sorry. To participate this survey, you need to use either Chrome, Firefox, or Safari.</h3>
                    <button class='btn btn-success' onClick='window.location.href="/survey"'>Start Over</button>
                </div>`;
                console.log(options);
            } else {
                options.html = `<div class='surveyResult' style='height:300px; padding:30px;'>
                    <h3>Thank you for helping us! <br> Here is your completion code: <em style='color:red'>${this.userid}</em>
                    <br> Don't forget to copy the completion code if you came from Amazon Mechanical Turk.
                    </h3>
                </div>`;
            }    
        } else  { // The survey is not finished yet.
            // Show browser-specific guide in the page3
            if (survey.currentPageValue.name === "page3") {
                options.html = options.html
                    .replace("{{instructionForBrowser}}",this.json.etc.instructionForBrowser[survey.data.browser]);
            } else {

            }
            console.log(options);
        }
    }
    sendDataToServer(survey) {
        // DONT SUBMIT IF THE SURVEY WAS TERMINATED FOR USING OTHER CLIENTS
        if(survey.data.emailClient == "others") return;
        // SUBMITTING PROCESS
        console.log(survey.data);
        $.ajax({
            url: "survey/submit",
            data: {
                json: JSON.stringify(survey.data),
                userid: this.userid
            },
            method:"POST",
            cache: false,
            success: function(data) {
                // 
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });    
    }
    render() {
        return (
            <div className='survey_wrapper'>
                <Survey.Survey json={this.json} 
                    onComplete={this.sendDataToServer} 
                    onProcessHtml={this.processHtml} />
            </div>
        );
    }   
}

export default SurveyPage;