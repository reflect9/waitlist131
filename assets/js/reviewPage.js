import React, { Component } from 'react';
import SurveyDetail from './surveyDetail.js';
import EmailPresentation from './emailPresentation.js';

class ReviewPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            code_list:[],
            current_userid: undefined,
            survey_data: {}
        };
        this.onClickUserID = this.onClickUserID.bind(this);
        this.retrieveSurveyDetail = this.retrieveSurveyDetail.bind(this);
    }
    componentDidMount() {
        this.serverRequest = $.get("review/fetchSurvey", {
            action: "allUserID"
        }, function (result) {
            // console.log("received: ", result);
            this.setState({
                code_list: JSON.parse(result)
            });
        }.bind(this));
    }
    componentWillUnmount(){
        // this.serverRequest.abort();
    }
    onClickUserID(event) {
        var uid = event.target.getAttribute("data-id");
        this.current_userid = uid;
        this.retrieveSurveyDetail(uid);
    }
    retrieveSurveyDetail(uid){
        $.ajax({
            url: "review/fetchSurvey",
            data: {
                action:'oneSurveyData', 
                userid: uid
            },
            method:"GET",
            cache: false,
            success: function(data) {
                this.setState({
                    survey_data: JSON.parse(data)
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });    
    }
    render() {
        if (typeof this.state.survey_data == "string") {
            var survey_data = JSON.parse(this.state.survey_data);
        } else {
            var survey_data = JSON.parse(JSON.stringify(this.state.survey_data));
        }
        var survey_without_content = JSON.parse(JSON.stringify(survey_data));
        survey_without_content["emailHTML"]="";
        return (
            <div className='review_wrapper'>
                <div className='user_id_list'>
                    {this.state.code_list.map(code => 
                        <div className='users_for_one_code'>
                            <label>{code['code']}</label>
                            {code["userid_list"].map(userid =>
                                {  if(this.current_userid === userid) 
                                        return (<div className='userid selected' data-id={userid} onClick={this.onClickUserID}>{userid}</div>)
                                    else 
                                        return (<div className='userid ' data-id={userid} onClick={this.onClickUserID}>{userid}</div>)
                            })}
                        </div>
                    )}
                </div>
                <div className='survey_detail'> 
                    <label>Survey detail</label>
                    <div className='json_table'>{JSON.stringify(survey_without_content)}</div>
                    <label>Email Content</label>
                    <EmailPresentation emailHTML={survey_data.emailHTML}/>
                </div>
            </div>
        );
    }   
}

export default ReviewPage;