
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

class Letter extends Component {
    state = {
        y: -60,
        className: 'enter',
        fillOpacity: 1e-6
    }

    componentWillEnter(callback) {
        let node = d3.select(ReactDOM.findDOMNode(this));

        node.transition()
            .duration(750)
            .attr('y', 0)
            .style('fill-opacity', 1)
            .on('end', callback);
    }

    componentWillLeave(callback) {
        let node = d3.select(ReactDOM.findDOMNode(this));

        this.setState({className: 'exit'});

        node.transition()
            .duration(750)
            .attr('y', 60)
            .style('fill-opacity', 1e-6)
            .on('end', callback);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.i != nextProps.i) {
            let node = d3.select(ReactDOM.findDOMNode(this));

            this.setState({className: 'update',
                           y: 0,
                           fillOpacity: 1,
                           old_i: this.props.i});

            node.transition()
                .duration(750)
                .attr('x', nextProps.i*32);
        }
    }

    render() {
        let x = this.state.old_i ? this.state.old_i*32 : this.props.i*32;

        return (
            <text dy=".35em"
                  y={this.state.y}
                  x={x}
                  className={this.state.className}
                  style={{fillOpacity: this.state.fillOpacity}}>
                {this.props.d}
            </text>
        );
    }
};

export default Letter;
