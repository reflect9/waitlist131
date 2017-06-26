// SOME CLI USAGE
// - TO GO TO DEV DIRECTORY
// cd /Users/takyeonlee/Documents/study/Adobe\ Internship\ 2017/CrowdLinkRelevance/waitlist131
// - TO TURN ON MONITORING SOURCE CHANGE (https://webpack.js.org/guides/development/)
//       ./node_modules/.bin/webpack --progress --watch
// 

var React = require('react')
var ReactDOM = require('react-dom')

var Hello = React.createClass({
    render: function(){
        return (<h1>
                Hello, Reactdddd!
            </h1>
        )
    }
})

ReactDOM.render(<Hello />, 
    document.getElementById("container"))