import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CanvasJSReact from '../lib/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class LicenseComponent extends Component {
    static propTypes = {
        types: PropTypes.object.isRequired
    }

    constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
        const dataPoints = Object.keys(this.props.types).filter(k => k !='All').map(key => 
            ({ label: [key],
               y: this.props.types[key] })
            ).filter(row => row.y)
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "License Types",
				fontFamily: "verdana"
			},
			axisY: {
				title: "Educators",
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
			{
				type: "stackedColumn",
				name: "General",
				// showInLegend: true,
				dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
			
		</div>
        );
        }
}
