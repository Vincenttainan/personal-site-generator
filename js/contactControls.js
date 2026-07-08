function updateContactControlsVisibility() {
	contactFields.forEach(field => {
		const state = contactState[field.key];

		if (!state) return;

		const enabledInput = document.querySelector(
			`.contact-enabled-input[data-contact-key="${field.key}"]`
		);

		const inputSection = document.querySelector(
			`[data-contact-section="${field.key}"]`
		);

		if (enabledInput) {
			enabledInput.checked = state.enabled;
		}

		if (inputSection) {
			inputSection.style.display = state.enabled ? "block" : "none";
		}
	});
}

function bindContactEvents() {
	const enabledInputs = document.querySelectorAll(".contact-enabled-input");
	const valueInputs = document.querySelectorAll(".contact-value-input");

	enabledInputs.forEach(input => {
		input.addEventListener("change", () => {
			const key = input.dataset.contactKey;

			if (!contactState[key]) return;

			contactState[key].enabled = input.checked;

			updateContactControlsVisibility();
			renderPreview();
		});
	});

	valueInputs.forEach(input => {
		input.addEventListener("input", () => {
			const key = input.dataset.contactKey;

			if (!contactState[key]) return;

			contactState[key].value = input.value.trim();

			renderPreview();
		});
	});
}

function getEnabledContactLinks() {
	return contactFields
		.map(field => {
			const state = contactState[field.key];

			if (!state) return null;
			if (!state.enabled || !state.value) return null;

			return {
				key: field.key,
				label: field.label,
				href: buildContactHref(field, state.value),
				openNewTab: field.openNewTab
			};
		})
		.filter(link => link !== null);
}

function buildContactHref(field, value) {
	if (field.hrefPrefix) {
		return `${field.hrefPrefix}${value}`;
	}

	if (field.type === "url") {
		return normalizeUrl(value);
	}

	return value;
}

function normalizeUrl(url) {
	if (!url) return "";

	if (url.startsWith("http://") || url.startsWith("https://")) {
		return url;
	}

	return `https://${url}`;
}