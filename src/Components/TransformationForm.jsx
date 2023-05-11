import { useState } from "react";

function TransformationForm(props) {
	const { applyTransformation } = props;
	const [selectedTransform, setSelectedTransform] = useState("grayscale");

	const handleChange = (event) => {
		setSelectedTransform(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		applyTransformation(selectedTransform);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="transform-select">
				Choose a transformation to perform
			</label>
			<select name="transform-select" onChange={handleChange}>
				{/* Make sure the "value"s are the same we have in the function that applies these transformations */}
				<option value="grayscale" selected="selected">
					Transform to Grayscale
				</option>
				<option value="value2">Transformation 2</option>
				{/* <option value="value3">
					Transformation 3
				</option> */}
			</select>
			<input type="submit" value="Apply" />
		</form>
	);
}

export default TransformationForm;
