
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import d3 from 'd3';

require('./style.less');

import Letter from './Letter';

class Alphabet extends Component {
    alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    state = {letters: []}

    componentDidMount() {
        d3.interval(() => this.setState({
            letters: d3.shuffle(this.alphabet)
                       .slice(0, Math.floor(Math.random() * this.alphabet.length))
                       .sort()
        }), 1500);
    }

    render() {
        let transform = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={transform}>
                <ReactTransitionGroup component="g">
                    {this.state.letters.map((d, i) => (
                        <Letter d={d} i={i} key={`letter-${d}`} />
                     ))}
                </ReactTransitionGroup>
            </g>
        );
    }
}

export default Alphabet;
