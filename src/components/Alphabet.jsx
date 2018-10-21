import React, { Component } from "react";
import * as d3 from "d3";
import { TransitionGroup } from "react-transition-group";

import Letter from "./Letter";

class Alphabet extends Component {
    static letters = "abcdefghijklmnopqrstuvwxyz".split("");
    state = { alphabet: [] };

    componentDidMount() {
        d3.interval(
            () =>
                this.setState({
                    alphabet: d3
                        .shuffle(Alphabet.letters)
                        .slice(
                            0,
                            Math.floor(Math.random() * Alphabet.letters.length)
                        )
                        .sort()
                }),
            1500
        );
    }

    render() {
        let transform = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={transform}>
                <TransitionGroup
                    appear={true}
                    enter={true}
                    exit={true}
                    component="g"
                >
                    {this.state.alphabet.map((d, i) => (
                        <Letter letter={d} index={i} key={`letter-${d}`} />
                    ))}
                </TransitionGroup>
            </g>
        );
    }
}

export default Alphabet;
