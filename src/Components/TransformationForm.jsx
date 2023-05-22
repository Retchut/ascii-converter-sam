import "./TransformationForm.scss";

function TransformationForm(props) {
	const { applyTransformation } = props; // get callback passed as prop

	// each array will show up as buttons in a new row
	// value is the identifier on the `imageOps` script
	// text is the contents of the button
	const transformations = [
		[
			{ value: "grayscale", text: "Transform to grayscale" },
			{ value: "rotateClockwise", text: "Rotate clockwise" },
			{ value: "rotateCounterClockwise", text: "Rotate counter clockwise" },
			{ value: "ascii", text: "ascii" },
		],
	];

	return (
		<section>
			<h1>Choose a transformation to perform</h1>
			<div>
				{transformations.map((row, rowIndex) => (
					<div
						key={"transf-row-" + rowIndex}
						className="transformations-container"
					>
						{row.map((transf, index) => (
							<button
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
		</section>
	);
}

export default TransformationForm;
