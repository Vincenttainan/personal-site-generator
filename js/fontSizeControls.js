function changeFontSize(target, amount) {
	const limit = fontSizeLimit[target];

	if (!limit) return;

	fontSizeState[target] += amount;

	if (fontSizeState[target] < limit.min) {
		fontSizeState[target] = limit.min;
	}

	if (fontSizeState[target] > limit.max) {
		fontSizeState[target] = limit.max;
	}

	renderPreview();
}

function bindFontSizeEvents() {
	const sizeInputs = document.querySelectorAll(".size-input:not(.avatar-size-input)");
	const sizeMinusButtons = document.querySelectorAll(".size-minus");
	const sizePlusButtons = document.querySelectorAll(".size-plus");

	sizeMinusButtons.forEach(button => {
		button.addEventListener("click", () => {
			changeFontSize(button.dataset.target, -1);
		});
	});

	sizePlusButtons.forEach(button => {
		button.addEventListener("click", () => {
			changeFontSize(button.dataset.target, 1);
		});
	});

	sizeInputs.forEach(input => {
		input.addEventListener("input", () => {
			const target = input.dataset.target;
			const limit = fontSizeLimit[target];

			if (!limit) return;

			let value = Number(input.value);

			if (Number.isNaN(value)) return;

			if (value < limit.min) value = limit.min;
			if (value > limit.max) value = limit.max;

			fontSizeState[target] = value;
			renderPreview();
		});
	});
}