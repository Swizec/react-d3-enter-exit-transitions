
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

// Gonna have to use this: http://stackoverflow.com/questions/29977799/how-should-i-handle-a-leave-animation-in-componentwillunmount-in-react

class Letter extends Component {
    state = {
        y: -60,
        className: 'enter',
        fillOpacity: 1e-6
    }

    /* text.enter().append("text")
       .attr("class", "enter")
       .attr("dy", ".35em")
       .attr("y", -60)
       .attr("x", (d, i) => i * 32)
       .style("fill-opacity", 1e-6)
       .text((d) => d)
       .transition(t)
       .attr("y", 0)
       .style("fill-opacity", 1); */

    componentDidMount() {
        let node = d3.select(ReactDOM.findDOMNode(this));

        // there should be a reactier way to do this
        node.transition()
            .duration(750)
            .attr('y', 0)
            .style('fill-opacity', 1);
    }

    /* shouldComponentUpdate(nextProps, nextState) {
       return this.props.d != nextProps.d || this.props.i != nextProps.i;
       }

       componentDidUpdate() {
       this.setState({className: 'update',
       y: 0,
       fillOpacity: 1});

       let node = d3.select(ReactDOM.findDOMNode(this));

       node.transition()
       .duration(750)
       .attr('x', this.props.i*32);
       } */
    /* ext.exit()
       .attr("class", "exit")
       .transition(t)
       .attr("y", 60)
       .style("fill-opacity", 1e-6)
       .remove(); */

    componentWillUnmount() {
        let node = d3.select(ReactDOM.findDOMNode(this));

        this.setState({className: 'exit'});

        node.transition()
            .duration(750)
            .attr('y', 60)
            .style('fill-opacity', 1e-6);
    }

    render() {
        return (
            <text dy=".35em"
                  y={this.state.y}
                  x={this.props.i*32}
                  className={this.state.className}
                  style={{fillOpacity: this.state.fillOpacity}}>
                {this.props.d}
            </text>
        );
    }
};

export default Letter;
