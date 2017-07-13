// SOME CLI USAGE

// - TO GO TO DEV DIRECTORY
// cd /Users/takyeonlee/Documents/study/Adobe\ Internship\ 2017/CrowdLinkRelevance/waitlist131
// - TO TURN ON MONITORING SOURCE CHANGE (https://webpack.js.org/guides/development/)
//       ./node_modules/.bin/webpack --progress --watch
// 

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { 
    BrowserRouter as Router, 
    Route,
    Link
} from 'react-router-dom';
import SurveyPage from './surveyPage.js';
import surveyJSON from './surveyJSON.js';
import surveyJSON_Irrelevant from './surveyJSON2.js';
import ReviewPage from './reviewPage.js';
import $ from 'jquery';
import * as Utils from './utils.js';

class Home extends Component{
    render() {
        return (<div>
            <h1>USAGE</h1>
            <ul>
                <li><a href='/survey'>/survey</a></li>
                <li><a href='/review'>/review</a></li>
            </ul>
        </div>);
    }
}
const SurveyPageWrapper = () => {
    return (<div>
        <SurveyPage json={surveyJSON} userid={Utils.makeid()} code="attractiveEmails"  />
    </div>);
};
const SurveyPageIrrelevantWrapper = () => {
    return (<div>
        <SurveyPage json={surveyJSON_Irrelevant} userid={Utils.makeid()} code="irrelevantEmails"/>
    </div>);
};
const ReviewPageWrapper = () => {
    console.log("review page wrapper");
    return (<div>
        <ReviewPage/>
    </div>);
};
class Work extends Component{
    render() {
        return (<h1>Work</h1>);
    }   
}


render (
    <Router>
        <div className='reactMain' >
            <Route exact path='/' component = {Home}/>
            <Route path='/survey' component = {SurveyPageWrapper}/>
            <Route path='/surveyIrrelevant' component = {SurveyPageIrrelevantWrapper}/>
            <Route path='/review' component = {ReviewPageWrapper}/>
            <Route path='/work' component = {Work}/>
        </div>
    </Router>,
    document.getElementById("container")
); 

// ADDING EVENTHANDLER FOR CLIENT CHOICE
for(var el of document.querySelectorAll("button.btn-client")){
    el.addEventListener("click", function(event){
        var client = event.target.getAttribute("ec");
        $("div.inst-client").addClass("hidden");
        $("div.inst-client[ec='"+client+"'").removeClass("hidden");
    });
}