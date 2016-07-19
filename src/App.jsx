
import React, { Component } from 'react';
import d3 from 'd3';

import Alphabet from './components/Alphabet';
import FancyText from './components/FancyText';

class App extends Component {
    state = {text: ''};

    changeText(event) {
        console.log(event.target.value);
        this.setState({text: event.target.value});
    }

    render() {

        return (
            <div className="container">
                <h2>An animated Alphabet built with React and d3js v4 transitions</h2>
                <p>Based on Bostock's block <a href="https://bl.ocks.org/mbostock/a8a5baa4c4a470cda598">General Update Pattern 4.0</a></p>
                <input type="text" value={this.state.text}
                       onChange={::this.changeText} placeholder="Type here"
                       style={{padding: '.6em',
                               fontSize: '1.2em',
                               margin: '0px auto',
                               width: '80%'}} />
                <svg width="800" height="600">
                    <FancyText x="32" y="300" text={this.state.text} />
                </svg>
            </div>
        );
    }
}

export default App;
