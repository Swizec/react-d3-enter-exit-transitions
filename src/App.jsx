
import React, { Component } from 'react';
import d3 from 'd3';

import Alphabet from './components/Alphabet';

class App extends Component {
    render() {

        return (
            <div className="container">
                <h2>An animated Alphabet built with React and d3js v4 transitions</h2>
                <svg width="800" height="600">
                    <Alphabet x="32" y="300" />
                </svg>
            </div>
        );
    }
}

export default App;
