// var introHTML = `
//     <div>
//         <div class='lead'>
//             Which email client do you use? 
//             <br>
//             <center style='margin:20px 0 20px 0'>
//                 <button class='btn btn-success btn-client' id='dddd' ec='gmail'>Gmail</button>&nbsp;&nbsp;
//                 <button class='btn btn-success btn-client' ec='yahoo'>Yahoo! Mail</button>&nbsp;&nbsp;
//                 <button class='btn btn-success btn-client' ec='outlook'>Microsoft Outlook</button>
//                 <button class='btn btn-success btn-client' ec='other'>Other</button>
//             </center>
//             <div class='inst-client hidden' ec='gmail'>
//                 Open your email client. Go to the folder where promotion emails are stored. If you are using Gmail, it would be 'Promotions' folder.
//             </div>
//             <div class='inst-client hidden' ec='yahoo'>
//                 Open your email client. Go to the folder where promotion emails are stored.
//             </div>
//             <div class='inst-client hidden' ec='outlook'>
//                 Open your email client. Go to the folder where promotion emails are stored.
//             </div>
//             <div class='inst-client hidden' ec='other'>
//                 I am sorry that you cannot participate this study without using one of the three clients listed above.   
//             </div> 
//         </div>
//     </div>
// `;

var instruction_promotion_folder = `
    <div class='lead'>
         Open your email client, and go to the folder where promotion emails are stored. If you are using Gmail, it would be 'Promotions' folder.
    </div>
`;
var instruction_raw_message = `
    <div style='margin-top:20px;'>
        <p class='lead'>We need a promotion email that you found most attractive.</p>
        <p>Preferrably, you have opened it already. However, if you did not open a promotion email recently, pick one that looks attractive now. </p>
        <p class='lead'>    
            Did you find an email? 
            First of all, we want you to copy and past the raw message of it. 
            To do that, please follow the instruction below.  
            Which email client do you use? 
            <br>
            <center style='margin:20px 0 20px 0'>
                <button class='btn btn-success btn-client' id='dddd' ec='gmail'>Gmail</button>&nbsp;&nbsp;
                <button class='btn btn-success btn-client' ec='yahoo'>Yahoo! Mail</button>&nbsp;&nbsp;
                <button class='btn btn-success btn-client' ec='outlook'>Microsoft Outlook</button>
                <button class='btn btn-success btn-client' ec='other'>Other</button>
            </center>
        </p>    
        </div>
        <div id='inst-get-raw-message'>
            <div class='inst-client ' ec='gmail'>
                <img src='assets/images/gmail.gif' style='width:80%;'>
            </div>
            <div class='inst-client ' ec='yahoo'>
                <img src='assets/images/yahoo.gif' style='width:80%;'>
            </div>
            <div class='inst-client ' ec='outlook'>
                <img src='assets/images/outlook.gif' style='width:80%;'>
            </div>
            <div class='inst-client ' ec='outlook'>
                Sorry you cannot.
            </div>
        </div>
        
    </div>
`;

var surveyJSON = { 
    title:"A Survey of Promotion Emails",
    triggers: [
        {  type:"complete", name: "emailClient", operator:"equal", value:"Others (You cannot complete this HIT)"}
    ],
    pages: [
        {
            name: "page1", questions: [
                {
                    name: "emailClient", type: "radiogroup", title: "Which email client do you use?",
                    colCount: 4, choices: ["Gmail", "Yahoo!", "Outlook", "Others (You cannot complete this HIT)"], isRequired: true
                },
            ]
        },
        {
            title:"General Questions: go to the promotion folder",
            name: "page2", questions: [
                { name:"inst_folder", type:"html", html:instruction_promotion_folder },
                {
                    name: "numEmails", type: "radiogroup", title: "How many promotion emails do you receive per day?",
                    colCount: 2, choices: ["0", "1-5", "6-20", "21-50", "51-100", "100-"], isRequired: true
                },
                { name: "freqOpenEmails", type: "radiogroup", title: "How often do you open promotion emails per week?", colCount: 2, choices: ["Never open promotion emails", "1-5 promotion emails per week", "6-20 promotion emails per week", "20-50 promotion emails per week", "50-100 promotion emails per week", "More than 100 emails"], isRequired: true },
                { name: "importantReason", type: "checkbox", title: "What do you consider when opening promotion emails? Pick all that matter, or describe other reasons.", isRequired:true, colCount:2, hasOther:true, choices: ["Brand", "Value of the offer", "Limited-time offer", "Targeted offer"], choicesOrder:"random"  }
            ]
        },
        { 
            name: "page3", questions: [
                { name: "inst2", type:"html", html: instruction_raw_message },
                { name: "rawMessage", type: "comment", title: ""  }
            ]
        }
        
    ],
    showProgressBar: "top",
    showCompletedPage:true,
    completedHtml: `<div style='height:300px; padding:30px;'>
        <h3>Thank you for helping us! <br> Here is your completion code.</h3>
    </div>`
};

export default surveyJSON;