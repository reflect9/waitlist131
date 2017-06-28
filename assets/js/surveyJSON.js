var introHTML = `
    <div>
        <h2 class='page-header'>A Survey of Promotion Emails</h2>
        <strong>Please follow the steps below.</strong>
        <ol class='lead'>
            <li>Open your most frequently-used email client.</li>
            <li>Open the folder that promotion emails are stored. If you are using GMail, it is 'Promotions' folder by default.</li>
        </ol>
    </div>
`;


var surveyJSON = { 
    pages: [
        {
            name: "page1", questions: [
                { type: "html", name: "info", html: introHTML },
                {
                    name: "numEmails", type: "radiogroup", title: "How many promotion emails do you receive per day?",
                    colCount: 2, choices: ["0", "1-5", "6-20", "21-50", "51-100", "100-"], isRequired: true
                },
                { name: "freqOpenEmails", type: "radiogroup", title: "How often do you open promotion emails per week?", colCount: 2, choices: ["Never open promotion emails", "1-5 promotion emails per week", "6-20 promotion emails per week", "20-50 promotion emails per week", "50-100 promotion emails per week", "More than 100 emails"], isRequired: true },
                { name: "importantReason", type: "checkbox", title: "What do you consider when opening promotion emails?", isRequired:true, colCount:2, hasOther:true, choices: ["None", "Brand", "Value of the deal", "Limited offer", "Targeted offer"] }
            ]
        }
    ],
    showCompletedPage:true,
    completedHtml: `<div style='height:300px; padding:30px;'>
        <h3>Thank you for helping us! <br> Here is your completion code.</h3>
    </div>`
};

export default surveyJSON;