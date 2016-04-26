
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import d3 from 'd3';

require('./style.less');

import Letter from './Letter';

class Alphabet extends Component {
    alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    state = {letters: []}

    componentDidUpdate() { this.update(this.state.letters) }
    componentDidMount() {
        this.update(this.state.letters);

        d3.interval(() => this.updateLetters(), 1500);
    }

    updateLetters() {
        let oldLetters = this.state.letters,
            newLetters = d3.shuffle(this.alphabet)
                           .slice(0, Math.floor(Math.random() * this.alphabet.length))
                           .sort(),
            oldIndexes = {};

        oldLetters.forEach((l, i) => oldIndexes[l] = i);

        this.setState({
            letters: newLetters,
            oldIndexes: oldIndexes
        })
    }

    update(data) {
        let t = d3.transition()
                  .duration(750);

        let svg = d3.select(ReactDOM.findDOMNode(this));

        // JOIN new data with old elements
        let text = svg.selectAll("text")
                      .data(data, (d) => d);

        // EXIT old elements not present in new data
        /* text.exit()
           .attr("class", "exit")
           .transition(t)
           .attr("y", 60)
           .style("fill-opacity", 1e-6)
           .remove();

           // UPDATE old elements present in new data
           text.attr("class", "update")
           .attr("y", 0)
           .style("fill-opacity", 1)
           .transition(t)
           .attr("x", (d, i) => i * 32);

           // ENTER new elements present in new data
           text.enter().append("text")
           .attr("class", "enter")
           .attr("dy", ".35em")
           .attr("y", -60)
           .attr("x", (d, i) => i * 32)
           .style("fill-opacity", 1e-6)
           .text((d) => d)
           .transition(t)
           .attr("y", 0)
           .style("fill-opacity", 1); */
    }

    render() {
        let transform = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={transform}>
                <ReactTransitionGroup component="g">
                {this.state.letters.map((d, i) => (
                    <Letter d={d} i={i}
                            old_i={this.state.oldIndexes[d]} key={`letter-${i}`} />
                 ))}
                </ReactTransitionGroup>
            </g>
        );
    }
}

export default Alphabet;
