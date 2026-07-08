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

	bindCustomContactEvents();
}

function getEnabledContactLinks() {
	const defaultLinks = contactFields
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

	const customLinks = contactState.customLinks
		.map(link => {
			if (!link.enabled || !link.label || !link.value) return null;

			return {
				key: link.id,
				label: link.label,
				href: normalizeUrl(link.value),
				openNewTab: true
			};
		})
		.filter(link => link !== null);

	return [...defaultLinks, ...customLinks];
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

function bindCustomContactEvents() {
	const addButton = document.getElementById("addCustomContactBtn");

	if (addButton) {
		addButton.addEventListener("click", () => {
			addCustomContactLink();
		});
	}

	bindCustomContactItemEvents();
}

function bindCustomContactItemEvents() {
	const enabledInputs = document.querySelectorAll(".custom-contact-enabled-input");
	const labelInputs = document.querySelectorAll(".custom-contact-label-input");
	const valueInputs = document.querySelectorAll(".custom-contact-value-input");
	const removeButtons = document.querySelectorAll(".remove-contact-btn");

	enabledInputs.forEach(input => {
		input.addEventListener("change", () => {
			const link = findCustomContactLink(input.dataset.customContactId);

			if (!link) return;

			link.enabled = input.checked;
			renderPreview();
		});
	});

	labelInputs.forEach(input => {
		input.addEventListener("input", () => {
			const link = findCustomContactLink(input.dataset.customContactId);

			if (!link) return;

			link.label = input.value.trim();
			renderPreview();
		});
	});

	valueInputs.forEach(input => {
		input.addEventListener("input", () => {
			const link = findCustomContactLink(input.dataset.customContactId);

			if (!link) return;

			link.value = input.value.trim();
			renderPreview();
		});
	});

	removeButtons.forEach(button => {
		button.addEventListener("click", () => {
			removeCustomContactLink(button.dataset.customContactId);
		});
	});
}

function addCustomContactLink() {
	const newLink = {
		id: `custom_${Date.now()}`,
		enabled: true,
		label: "",
		value: ""
	};

	contactState.customLinks.push(newLink);

	renderCustomContactControls();
	bindCustomContactItemEvents();
	renderPreview();
}

function removeCustomContactLink(id) {
	contactState.customLinks = contactState.customLinks.filter(link => link.id !== id);

	renderCustomContactControls();
	bindCustomContactItemEvents();
	renderPreview();
}

function findCustomContactLink(id) {
	return contactState.customLinks.find(link => link.id === id);
}