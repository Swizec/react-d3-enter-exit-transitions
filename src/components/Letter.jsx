import React from "react";
import * as d3 from "d3";
import Transition from "react-transition-group/Transition";

const ExitColor = "brown",
    UpdateColor = "#333",
    EnterColor = "green";

class Letter extends React.Component {
    defaultState = {
        y: -60,
        x: this.props.index * 32,
        color: EnterColor,
        fillOpacity: 1e-6
    };
    state = this.defaultState;
    letterRef = React.createRef();

    onEnter = () => {
        // Letter is entering the visualization
        let node = d3.select(this.letterRef.current);

        node.transition()
            .duration(750)
            .ease(d3.easeCubicInOut)
            .attr("y", 0)
            .style("fill-opacity", 1)
            .on("end", () => {
                this.setState({
                    y: 0,
                    fillOpacity: 1,
                    color: UpdateColor
                });
            });
    };

    onExit = () => {
        // Letter is dropping out
        let node = d3.select(this.letterRef.current);

        node.style("fill", ExitColor)
            .transition(this.transition)
            .attr("y", 60)
            .style("fill-opacity", 1e-6)
            .on("end", () => this.setState(this.defaultState));
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.in !== this.props.in && this.props.in) {
            // A new enter transition has begun
            this.setState({
                x: this.props.index * 32
            });
        } else if (prevProps.index !== this.props.index) {
            // Letter is moving to a new location
            let node = d3.select(this.letterRef.current),
                targetX = this.props.index * 32;

            node.style("fill", UpdateColor)
                .transition()
                .duration(750)
                .ease(d3.easeCubicInOut)
                .attr("x", targetX)
                .on("end", () =>
                    this.setState({
                        x: targetX,
                        color: UpdateColor
                    })
                );
        }
    }

    render() {
        const { x, y, fillOpacity, color } = this.state,
            { letter } = this.props;

        return (
            <Transition
                in={this.props.in}
                unmountOnExit={false}
                timeout={750}
                onEnter={this.onEnter}
                onExit={this.onExit}
            >
                <text
                    dy=".35em"
                    x={x}
                    y={y}
                    style={{
                        fillOpacity: fillOpacity,
                        fill: color,
                        font: "bold 48px monospace"
                    }}
                    ref={this.letterRef}
                >
                    {letter}
                </text>
            </Transition>
        );
    }
}

export default Letter;
