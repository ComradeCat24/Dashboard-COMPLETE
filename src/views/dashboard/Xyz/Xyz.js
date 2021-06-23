import React from "react";
import StatisticsCard from "../StatisticsCard";
import { Users } from "react-feather";

class Xyz extends React.Component {
	state = {
		xyz: [
			{
				name: "xyz",
				data: [1, 1, 1, 1, 1, 1, 1],
			},
		],
	};

	// componentDidMount() {
	// 	axiosAPI
	// 		.get("/optix/stats/")
	// 		.then((response) => {
	// 			console.log(response.data);

	// 			const stat = response.data.UploadStats.reduce(
	// 				(r, c) => r + parseFloat(c),
	// 				0
	// 			);

	// 			this.setState({
	// 				uploadsThisWeek: [
	// 					{
	// 						name: "uploads",
	// 						data: response.data.UploadStats,
	// 					},
	// 				],
	// 				stat,
	// 			});
	// 		})
	// 		.catch((error) => console.log(error));
	// }

	render() {
		const xyzOptions = {
			chart: {
				id: "subscribers",
				toolbar: {
					show: false,
				},
				sparkline: {
					enabled: true,
				},
			},
			grid: {
				show: false,
			},
			colors: ["#7367F0"],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				width: 2.5,
			},
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 0.9,
					opacityFrom: 0.7,
					opacityTo: 0.5,
					stops: [0, 80, 100],
				},
			},

			xaxis: {
				labels: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
			tooltip: {
				x: { show: false },
			},
		};

		return (
			<StatisticsCard
				className="stat-card-text"
				icon={<Users className="primary" size={22} />}
				stat={this.state.stat}
				statTitle="xyz"
				options={xyzOptions}
				series={this.state.xyz}
				type="area"
			/>
		);
	}
}
export default Xyz;
