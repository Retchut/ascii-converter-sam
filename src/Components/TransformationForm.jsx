import { useState } from "react";

function TransformationForm(props) {
	const { applyTransformation } = props; // get callback passed as prop

	const defaultTransform = "grayscale";
	const [selectedTransform, setSelectedTransform] = useState(defaultTransform);

	// called whenever the form's select value changes
	const handleChange = (event) => {
		setSelectedTransform(event.target.value);
	};

	// called when the form is submitted
	const handleSubmit = (event) => {
		event.preventDefault();
		applyTransformation(selectedTransform);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="transform-select">
				Choose a transformation to perform
			</label>
			<select
				defaultValue={defaultTransform}
				name="transform-select"
				onChange={handleChange}
			>
				{/* Make sure the "value"s are the same we have in the function that applies these transformations */}
				<option value={defaultTransform}>
					Transform to {defaultTransform}
				</option>
				<option value="ascii">
					Transform to ascii
				</option>
				{/* <option value="value3">Transformation 3</option> */}
			</select>
			<input type="submit" value="Apply" />
		</form>
	);
}

export default TransformationForm;
