import React, { Component } from 'react';

class EmailPresentation extends Component {
    constructor(props) {
        super(props);
        this.emailHTML = props.emailHTML;
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        this.emailHTML = nextProps.emailHTML;
    }
    createMarkup() {
        if(this.emailHTML){
            var regex = new RegExp("blockedimagesrc",'g')
            var emailHTML_unblocked = this.emailHTML.replace(regex, "src");
            return {__html: emailHTML_unblocked };
        } else {
            return {__html: "" };
        }
        
    }

    render() {
        return (
            <div className='email_presentation' dangerouslySetInnerHTML={this.createMarkup()} />
        );
    }   
}

export default EmailPresentation;