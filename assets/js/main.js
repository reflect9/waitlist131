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
import $ from 'jquery';
import * as Utils from './utils.js';

class Home extends Component{
    render() {
        return (<h1>Hiiii</h1>);
    }
}

class Work extends Component{
    render() {
        return (<h1>Work</h1>);
    }   
}
const SurveyPageWrapper = () => {
    return (<div>
        <SurveyPage json={surveyJSON} userid={Utils.makeid()}/>
    </div>);
};

render (
    <Router>
        <div className='reactMain' >
            <Route exact path='/' component = {Home}/>
            <Route path='/survey' component = {SurveyPageWrapper}/>
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