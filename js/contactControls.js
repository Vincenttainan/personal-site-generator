function updateContactControlsVisibility() {
	const {
		emailControls,
		emailEnabledInput
	} = App.elements;

	if (!emailControls || !emailEnabledInput) return;

	emailEnabledInput.checked = contactState.emailEnabled;

	if (contactState.emailEnabled) {
		emailControls.style.display = "block";
	} else {
		emailControls.style.display = "none";
	}
}

function bindContactEvents() {
	const {
		emailEnabledInput,
		emailInput
	} = App.elements;

	emailEnabledInput.addEventListener("change", () => {
		contactState.emailEnabled = emailEnabledInput.checked;

		updateContactControlsVisibility();
		renderPreview();
	});

	emailInput.addEventListener("input", () => {
		contactState.email = emailInput.value.trim();

		renderPreview();
	});
}