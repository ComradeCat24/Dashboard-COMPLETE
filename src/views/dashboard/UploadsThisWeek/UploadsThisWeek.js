import React from "react";
import StatisticsCard from "../StatisticsCard";
import { Package } from "react-feather";
import axiosAPI from "../../../components/axiosApi";

class UploadsThisWeek extends React.Component {
	state = {
		uploadsThisWeek: [],
		stat: 0,
	};

	componentDidMount() {
		axiosAPI
			.get("/optix/stats/upload")
			.then((response) => {
				const stat = response.data.UploadStats.reduce(
					(r, c) => r + parseFloat(c),
					0
				);

				this.setState({
					uploadsThisWeek: [
						{
							name: "uploads",
							data: response.data.UploadStats,
						},
					],
					stat,
				});
			})
			.catch((error) => console.log(error));
	}

	render() {
		const uploadOptions = {
			chart: {
				id: "revenue",
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
			colors: ["#539bf5"],
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
			<>
				{this.state.stat !== 0 && (
					<StatisticsCard
						className="stat-card-text"
						icon={
							<Package
								// className="info"
								color="#539bf5"
								size={22}
							/>
						}
						stat={this.state.stat}
						statTitle="Uploads This Week"
						options={uploadOptions}
						series={this.state.uploadsThisWeek}
						type="area"
					/>
				)}
			</>
		);
	}
}
export default UploadsThisWeek;
