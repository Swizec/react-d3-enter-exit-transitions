
import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import * as d3 from 'd3';

import Letter from './Letter';

class Alphabet extends Component {
    static letters = "abcdefghijklmnopqrstuvwxyz".split('');
    state = {alphabet: []};

    componentWillMount() {
        d3.interval(() => this.setState({
            alphabet: d3.shuffle(Alphabet.letters)
                        .slice(0, Math.floor(Math.random() * Alphabet.letters.length))
                        .sort()
        }), 1500);
    }

    render() {
        let transform = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={transform}>
                <TransitionGroup component="g">
                    {this.state.alphabet.map((l, i) => (
                        <Letter letter={l} i={i} key={`letter-${l}`} />
                     ))}
                </TransitionGroup>
            </g>
        );
    }
}

export default Alphabet;
