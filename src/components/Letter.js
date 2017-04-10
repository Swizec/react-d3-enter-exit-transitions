
import React, { Component } from 'react';
import * as d3 from 'd3';

const ExitColor = 'brown',
      UpdateColor = '#333',
      EnterColor = 'green';

class Letter extends Component {
    state = {
        y: -60,
        x: 0,
        color: EnterColor,
        fillOpacity: 1e-6
    }
    transition = d3.transition()
                   .duration(750)
                   .ease(d3.easeCubicInOut);

    componentWillEnter(callback) {
        let node = d3.select(this.refs.letter);

        this.setState({x: this.props.i*32});

        node.transition(this.transition)
            .attr('y', 0)
            .style('fill-opacity', 1)
            .on('end', () => {
                this.setState({y: 0,
                               fillOpacity: 1,
                               color: UpdateColor});
                callback()
            });
    }

    componentWillLeave(callback) {
        let node = d3.select(this.refs.letter);

        this.setState({color: ExitColor});

        node.transition(this.transition)
            .attr('y', 60)
            .style('fill-opacity', 1e-6)
            .on('end', () => {
                this.setState({y: 60,
                               fillOpacity: 1e-6});
                callback()
            });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.i !== nextProps.i) {
            let node = d3.select(this.refs.letter);

            this.setState({color: UpdateColor});

            node.transition(this.transition)
                .attr('x', nextProps.i*32)
                .on('end', () => this.setState({x: nextProps.i*32}));
        }
    }

    render() {
        const { x, y, fillOpacity, color } = this.state;

        return (
            <text dy=".35em"
                  x={x}
                  y={y}
                  style={{fillOpacity: fillOpacity,
                          fill: color,
                          font: 'bold 48px monospace'}}
                  ref="letter">
                {this.props.letter}
            </text>
        );
    }
};

export default Letter;
