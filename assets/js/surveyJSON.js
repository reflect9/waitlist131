var instruction_promotion_folder = `
    <div class='lead'>
         Open your email client, and go to the folder where promotion emails are stored. If you are using Gmail, it would be 'Promotions' folder.
    </div>
`;
var instruction_raw_message = `
    <div style='margin-top:20px;'>
        <p class='lead'>We need a promotion email that you found attractive.
         The email can be either previosuly opened or what looks interesting now.
         Once you find an attractive email, please follow the instruction below to 
        copy-paste HTML of the email.  
        </p>    
        {{instructionForBrowser}}
    </div>
`;
var instructionForBrowser = {
    "chrome":`<div class='inst-client'>
            If you are using Chrome,
            <ol>
                <li>Open the email that you chose, and right-click at the top of the email content</li>
                <li>Press "Inspect Element"
                    <br><img src='assets/images/chrome-step-1.png' width="650px" '>
                </li>
                <li>Click the inspect button in the Developer panel
                    <br><img src='assets/images/chrome-step-2.png' width="650px">
                </li>
                <li>Click the top of the email so that the entire content will be highlighted
                    <br><img src='assets/images/chrome-step-3.png'  width="650px">
                </li>
                <li>Right-click the currently selected element in the developer panel</li>
                <li>Press "Copy" > "Copy OuterHTML"
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
                <li>Open the email that you chose, and right-click at the top of the email content</li>
                <li>Press "Inspect Element"
                    <br><img src='assets/images/safari-step-1.png' width="650px" '>
                </li>
                <li>Click the crosshair button in the Developer panel
                    <br><img src='assets/images/safari-step-2.png' width="650px">
                </li>
                <li>Click the top of the email so that the entire content will be highlighted
                    <br><img src='assets/images/safari-step-3.png'  width="650px">
                </li>
                <li>Right-click the currently selected element in the developer panel</li>
                <li>Click "Copy as HTML"
                    <br><img src='assets/images/safari-step-4.png'  width="650px">
                </li>
            </ol>
        </div>`,
    "firefox":`<div class='inst-client'>
            If you are using Firefox,
            <ol>
                <li>Open the email that you chose, and right-click at the top of the email content</li>
                <li>Press "Inspect Element"
                    <br><img src='assets/images/firefox-step-1.png' width="650px" '>
                </li>
                <li>Click the inspect button in the Developer panel
                    <br><img src='assets/images/firefox-step-2.png' width="650px">
                </li>
                <li>Click the top of the email so that the entire content will be highlighted
                    <br><img src='assets/images/firefox-step-3.png'  width="650px">
                </li>
                <li>Right-click the currently selected element in the developer panel</li>
                <li>Press "Copy" > "OuterHTML"
                    <br><img src='assets/images/firefox-step-4.png'  width="650px">
                </li>
            </ol>
        </div>`
};



var surveyJSON = { 
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
                    name: "numEmails", type: "radiogroup", title: "How many promotion emails do you receive (approximately) per day?",
                    colCount: 3, choices: ["0", "1-5","6-20", "21-50", "51-100", "100-"], 
                    isRequired: true
                },
                { name: "freqOpenEmails", type: "radiogroup", title: "How often do you open promotion emails (approximately) per week?", 
                    colCount: 3, choices: [  "0|Rarely open any promotion email", 
                                "1-5|1-5", 
                                "6-20|6-20", 
                                "20-50|20-50", 
                                "50-100|50-100", 
                                "100-|More than 100 emails"], isRequired: true },
                { name: "importantReasons", type: "checkbox", title: "What do you consider when opening promotion emails? Pick all that matter, or describe other reasons.", isRequired:true, colCount:3, hasOther:true, 
                    choices: ["Brand", "Value of the offer", "Limited-time offer", "Targeted offer"], choicesOrder:"random"  }
            ]
        },
        { 
            name: "page3", questions: [
                { name: "inst2", type:"html", html: instruction_raw_message },
                { name: "rawMessage", title:"Paste the email's raw message.", type: "comment", isRequired:true  }
            ]
        }
        
    ],
    showCompletedPage:true,
    completedHtml: `/* WILL BE PREOCESSED IN the processHtml method */`,
    etc: {
        instructionForBrowser: instructionForBrowser
    }
};

export default surveyJSON;