var instruction_promotion_folder = `
    <div class='lead'>
         Open your email client, and go to the folder where promotion emails are stored. If you are using Gmail, it would be 'Promotions' folder.
    </div>
`;
var instruction_raw_message = `
    <div style='margin-top:20px;'>
        <p class='lead'>We are collecting promotion emails that are inconsistent with linked pages.
        Try links in a promotion email. Check if the landing pages are exactly what you expected. </p>
        <p>If all the links are relevant, please try another email.</p>
        <p>If you found any unexpected landing page, follow the instruction below to copy-paste HTML of the email.
        {{instructionForBrowser}}
        </p>    
    </div>
`;
var instructionForBrowser = {
    "chrome":`<div class='inst-client'>
            If you are using Chrome,
            <ol>
                <li>Right-click the email content, and Press "Inspect Element"
                    <br><img src='assets/images/chrome-step-1.png' width="650px" '>
                </li>
                <li>Click the first button in the Developer panel
                    <br><img src='assets/images/chrome-step-2.png' width="650px">
                </li>
                <li>Hover mouse at the top of the email content. Left-click when the entire content is highlighted as below.
                    <br><img src='assets/images/chrome-step-3.png'  width="650px">
                </li>
                <li>In the Developer panel, find the currently highlighted element.</li>
                <li>Right-click the element > "Copy" > "Copy OuterHTML"
                    <br><img src='assets/images/chrome-step-4.png'  width="650px">
                </li>
            </ol>
        </div>`,
    "safari":`<div class='inst-client'>
            If you are using Safari,
            <ol>
                <li>Open the preference of Safari browser
                    <br><img src='assets/images/safari-pref-1.png' width="650px">
                </li>
                <li>Make sure "Advanced" > "Show Develop menu in menu bar" is checked
                    <br><img src='assets/images/safari-pref-2.png' width="650px">
                </li>
                <li>Right-click the email content, and Press "Inspect Element"
                    <br><img src='assets/images/safari-step-1.png' width="650px" '>
                </li>
                <li>Click the crosshair button in the Developer panel. Make sure the icon is turned on.
                    <br><img src='assets/images/safari-step-2.png' width="650px">
                </li>
                <li>Hover mouse at the top of the email content. Left-click when the entire content is highlighted as below.
                    <br><img src='assets/images/safari-step-3.png'  width="650px">
                </li>
                <li>In the Developer panel, find the currently highlighted element.</li>
                <li>Right-click the element > "Copy as HTML"
                    <br><img src='assets/images/safari-step-4.png'  width="650px">
                </li>
            </ol>
        </div>`,
    "firefox":`<div class='inst-client'>
            If you are using Firefox,
            <ol>
                <li>Right-click the email content, and Press "Inspect Element"
                    <br><img src='assets/images/firefox-step-1.png' width="650px" '>
                </li>
                <li>Click the inspect button in the Developer panel
                    <br><img src='assets/images/firefox-step-2.png' width="650px">
                </li>
                <li>Hover mouse at the top of the email content. Left-click when the entire content is highlighted as below.
                    <br><img src='assets/images/firefox-step-3.png'  width="650px">
                </li>
                <li>IN the Developer panel, find the currently highlighted element</li>
                <li>Right-click the element > "Copy" > "OuterHTML"
                    <br><img src='assets/images/firefox-step-4.png'  width="650px">
                </li>
            </ol>
        </div>`
};



var surveyJSON_Irrelevant = { 
    title:"A Survey about Promotion Emails",
    triggers: [
        {  type:"complete", name: "browser", operator:"equal", value:"other"}
    ],
    pages: [
        {
            name: "page1", 
            title: `We are researchers who study how people perceive values of promotion emails. 
              In this survey, you will answer a few questions about promotion emails that you received.
              `,
            questions: [
                {   name: "emailClient", type: "radiogroup", title: "Which email client do you mainly use?",
                    colCount: 4, choices: [
                     {value:"gmail", text:"Gmail"},
                     {value:"yahoo", text:"Yahoo! Mail"},
                     {value:"outlook", text:"Microsoft Outlook"}],
                     hasOther:true,
                     isRequired: true
                },
                {   name: "browser", type: "radiogroup", title: "Which browser do you use to access your emails? To participate, you need to use either Chrome, Firefox, or Safari browser.",
                    colCount: 4, choices: [
                     {value:"chrome", text:"Chrome"},
                     {value:"safari", text:"Safari"},
                     {value:"firefox", text:"Firefox"}
                     ],
                     hasOther:true,
                     isRequired: true
                },
            ]
        },
        {
            name: "page2", questions: [
                { name:"inst_folder", type:"html", html:instruction_promotion_folder },
                {
                    name: "numEmails", type: "radiogroup", title: "How many *promotion* emails do you receive (approximately) per day?",
                    colCount: 3, choices: ["0|Rarely get any promotion email", "1-5","6-20", "21-50", "51-100", "100-"], 
                    isRequired: true
                },
                { name: "freqOpenEmails", type: "radiogroup", title: "How frequently do you open promotion emails (approximately) per week?", 
                    colCount: 3, choices: [  "0|Rarely open any promotion email", 
                                "1-5|1-5", 
                                "6-20|6-20", 
                                "20-50|20-50", 
                                "50-100|50-100", 
                                "100-|More than 100 emails"], isRequired: true },
                { name: "importantReasons", type: "checkbox", title: "What do you consider when opening promotion emails? Pick all that matter, or describe other reasons.", isRequired:true, colCount:3, hasOther:true, 
                    choices: ["Trustworthiness","Brand image", "Value of the offer", "Limited-time offer", "Targeted offer"], choicesOrder:"random"  }
            ]
        },
        { 
            name: "page3", questions: [
                { name: "inst2", type:"html", html: instruction_raw_message },
                { name: "emailHTML", title:"Paste the email's HTML that you copied through the above steps.", type: "comment", isRequired:true  },
                { name: "emailSubject", title:"Copy and Paste the email's subject line", type: "text", isRequired:true  },
                { name: "emailDate", title:"When did you receive the email?", type: "datetime", isRequired:true  },
                { name: "emailLink", title:"Describe the anchor text(or describe image) in the email you clicked that led to the irrelevant landing page.", type: "text", isRequired:true  },
                { name: "emailReason", title:"Briefly explain why you think the link is irrelevant", type: "text", isRequired:true  },
                { name: "emailSeverity", type: "rating", title: "To what extent did the link negatively impact your impression of the advertisement?", 
                    mininumRateDescription: "No impact at all", maximumRateDescription: "Strong negative impact",
                    isRequired: true },
            ]
        }
        
    ],
    showCompletedPage:true,
    completedHtml: `/* WILL BE PREOCESSED IN the processHtml method */`,
    etc: {
        instructionForBrowser: instructionForBrowser
    }
};

export default surveyJSON_Irrelevant;