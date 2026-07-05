function changeAvatarSize(target, amount) {
	const limit = avatarSizeLimit[target];

	avatarState[target] += amount;

	if (avatarState[target] < limit.min) {
		avatarState[target] = limit.min;
	}

	if (avatarState[target] > limit.max) {
		avatarState[target] = limit.max;
	}

	renderPreview();
}

function bindAvatarEvents() {
	const {
		avatarModeInput,
		avatarImageInput,
		avatarSizeInputs,
		avatarSizeMinusButtons,
		avatarSizePlusButtons
	} = App.elements;

	avatarModeInput.addEventListener("change", () => {
		avatarState.mode = avatarModeInput.value;
		updateAvatarControlsVisibility();
		renderPreview();
	});

	avatarImageInput.addEventListener("change", () => {
		const file = avatarImageInput.files[0];

		if (!file) return;

		App.avatarFileBlob = file;

		if (file.type === "image/jpeg") {
			App.avatarFileExtension = "jpg";
		} else if (file.type === "image/webp") {
			App.avatarFileExtension = "webp";
		} else {
			App.avatarFileExtension = "png";
		}

		const reader = new FileReader();

		reader.addEventListener("load", () => {
			avatarState.imageData = reader.result;
			avatarState.mode = "photo";
			avatarModeInput.value = "photo";
			renderPreview();
		});

		reader.readAsDataURL(file);
	});

	avatarSizeMinusButtons.forEach(button => {
		button.addEventListener("click", () => {
			changeAvatarSize(button.dataset.target, -1);
		});
	});

	avatarSizePlusButtons.forEach(button => {
		button.addEventListener("click", () => {
			changeAvatarSize(button.dataset.target, 1);
		});
	});

	avatarSizeInputs.forEach(input => {
		input.addEventListener("input", () => {
			const target = input.dataset.target;
			const limit = avatarSizeLimit[target];

			let value = Number(input.value);

			if (Number.isNaN(value)) return;

			if (value < limit.min) value = limit.min;
			if (value > limit.max) value = limit.max;

			avatarState[target] = value;
			renderPreview();
		});
	});
}