export default function CustomLoading() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
			width="300"
			height="300"
			style={{ shapeRendering: "auto", display: "block", margin: "auto" }}
		>
			<g>
				<rect fill="#f9253f" height="40" width="10" y="30" x="15">
					<animate
						begin="-0.6s"
						values="1;0.2;1"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
						keyTimes="0;0.5;1"
						calcMode="spline"
						repeatCount="indefinite"
						dur="1s"
						attributeName="opacity"
					/>
				</rect>
				<rect fill="#2dd1ff" height="40" width="10" y="30" x="35">
					<animate
						begin="-0.4s"
						values="1;0.2;1"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
						keyTimes="0;0.5;1"
						calcMode="spline"
						repeatCount="indefinite"
						dur="1s"
						attributeName="opacity"
					/>
				</rect>
				<rect fill="#a9a9a9" height="40" width="10" y="30" x="55">
					<animate
						begin="-0.2s"
						values="1;0.2;1"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
						keyTimes="0;0.5;1"
						calcMode="spline"
						repeatCount="indefinite"
						dur="1s"
						attributeName="opacity"
					/>
				</rect>
				<rect fill="#f9253f" height="40" width="10" y="30" x="75">
					<animate
						begin="-1s"
						values="1;0.2;1"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
						keyTimes="0;0.5;1"
						calcMode="spline"
						repeatCount="indefinite"
						dur="1s"
						attributeName="opacity"
					/>
				</rect>
			</g>
		</svg>
	);
};