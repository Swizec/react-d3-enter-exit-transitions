
import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import d3 from 'd3';

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
        let transform = `translate(${this.props.x}, ${this.props.y})`,
            transition = d3.transition()
                           .duration(750)
                           .ease(d3.easeCubicInOut);

        return (
            <g transform={transform}>
                <ReactTransitionGroup component="g">
                    {this.state.alphabet.map((d, i) => (
                        <Letter letter={d} i={i} key={`letter-${d}`}
                                transition={transition} />
                     ))}
                </ReactTransitionGroup>
            </g>
        );
    }
}

export default Alphabet;
