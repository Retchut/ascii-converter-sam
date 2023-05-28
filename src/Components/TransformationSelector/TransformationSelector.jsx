import "./TransformationSelector.scss";

function TransformationForm(props) {
	let { applyTransformation, disallowedTransformations } = props; // get callback passed as prop

	if (!disallowedTransformations) disallowedTransformations = [];

	// each array will show up as buttons in a new row
	// value is the identifier on the `imageOps` script
	// text is the contents of the button
	const transformations = [
		[
			{ value: "grayscale", text: "Transform to grayscale" },
			{ value: "redscale", text: "Transform to redscale" },
			{ value: "bluescale", text: "Transform to bluescale" },
			{ value: "greenscale", text: "Transform to greenscale" },
		],
		[
			{ value: "redMask", text: "Get red mask" },
			{ value: "blueMask", text: "Get blue mask" },
			{ value: "greenMask", text: "Get green mask" },
		],
		[
			{ value: "rotateClockwise", text: "Rotate clockwise" },
			{ value: "rotateCounterClockwise", text: "Rotate counter clockwise" },
			{ value: "ascii", text: "ascii" },
		],
	];

	return (
		<div className="transformations-list">
			{transformations.map((row, rowIndex) => (
				<div key={"transf-row-" + rowIndex} className={"transformations-row"}>
					{row
						.filter((item) => !disallowedTransformations.includes(item.value))
						.map((transf, index) => (
							<button
								className="edit-btn btn-text"
								key={"transf" + index}
								name={"transform-" + transf.value}
								onClick={() => applyTransformation(transf.value)}
							>
								{transf.text}
							</button>
						))}
				</div>
			))}
		</div>
	);
}

export default TransformationForm;
