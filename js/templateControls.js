function applyTemplate(templateId) {
	const template = templates.find(item => item.id === templateId);

	if (!template) return;

	if (template.colors) {
		Object.keys(template.colors).forEach(key => {
			if (colorState[key] !== undefined) {
				colorState[key] = template.colors[key];
			}
		});
	}

	if (template.fontSizes) {
		Object.keys(template.fontSizes).forEach(key => {
			if (fontSizeState[key] !== undefined) {
				fontSizeState[key] = template.fontSizes[key];
			}
		});
	}

	if (template.avatar) {
		if (template.avatar.size !== undefined) {
			avatarState.size = template.avatar.size;
		}

		if (template.avatar.backgroundColor !== undefined) {
			avatarState.backgroundColor = template.avatar.backgroundColor;
		}

		if (template.avatar.textColor !== undefined) {
			avatarState.textColor = template.avatar.textColor;
		}

		if (template.avatar.fontSize !== undefined) {
			avatarState.fontSize = template.avatar.fontSize;
		}
	}

	document.querySelectorAll(".template-btn").forEach(button => {
		button.classList.toggle("active", button.dataset.templateId === templateId);
	});

	renderPreview();
}

function bindTemplateEvents() {
	const templateButtons = document.querySelectorAll(".template-btn");

	templateButtons.forEach(button => {
		button.addEventListener("click", () => {
			applyTemplate(button.dataset.templateId);
		});
	});
}