const STORAGE_KEY = "personalSiteGeneratorProject";

function getCurrentProjectData() {
	const {
		nameInput,
		titleInput,
		subheadingInput,
		introInput,
		skillsInput
	} = App.elements;

	return {
		profile: {
			name: nameInput.value,
			title: titleInput.value,
			subheading: subheadingInput.value,
			intro: introInput.value,
			skills: skillsInput.value
		},
		colors: {
			...colorState
		},
		fontSizes: {
			...fontSizeState
		},
		avatar: {
			mode: avatarState.mode,
			imageData: avatarState.imageData,
			size: avatarState.size,
			backgroundColor: avatarState.backgroundColor,
			textColor: avatarState.textColor,
			fontSize: avatarState.fontSize
		},
		contact: JSON.parse(JSON.stringify(contactState))
	};
}

function saveCurrentProject() {
	const projectData = getCurrentProjectData();

	localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));

	showStorageMessage("已儲存目前設定");
}

function exportProjectJson() {
	const projectData = getCurrentProjectData();

	const jsonContent = JSON.stringify(projectData, null, 2);
	const blob = new Blob([jsonContent], { type: "application/json" });
	const url = URL.createObjectURL(blob);

	const now = new Date();

	const dateText = [
		now.getFullYear(),
		String(now.getMonth() + 1).padStart(2, "0"),
		String(now.getDate()).padStart(2, "0")
	].join("-");

	const fileName = `portfolio-project-${dateText}.json`;

	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	a.click();

	URL.revokeObjectURL(url);

	showStorageMessage("已匯出 JSON 設定檔");
}

function importProjectJson(file) {
	if (!file) return;

	const reader = new FileReader();

	reader.addEventListener("load", () => {
		try {
			const projectData = JSON.parse(reader.result);

			applyProjectData(projectData);

			showStorageMessage("已匯入 JSON 設定檔");
		} catch (error) {
			console.error(error);
			showStorageMessage("匯入失敗，JSON 格式錯誤");
		}
	});

	reader.readAsText(file);
}

function getImageExtensionFromDataUrl(dataUrl) {
	if (!dataUrl || !dataUrl.startsWith("data:")) return "png";

	const mimeMatch = dataUrl.match(/^data:(.*?);base64,/);
	const mimeType = mimeMatch ? mimeMatch[1] : "image/png";

	if (mimeType === "image/jpeg") return "jpg";
	if (mimeType === "image/webp") return "webp";
	if (mimeType === "image/gif") return "gif";

	return "png";
}

function dataUrlToBlob(dataUrl) {
	if (!dataUrl || !dataUrl.startsWith("data:")) return null;

	const parts = dataUrl.split(",");

	if (parts.length !== 2) return null;

	const meta = parts[0];
	const base64 = parts[1];

	const mimeMatch = meta.match(/data:(.*?);base64/);
	const mimeType = mimeMatch ? mimeMatch[1] : "image/png";

	const binaryString = atob(base64);
	const length = binaryString.length;
	const bytes = new Uint8Array(length);

	for (let i = 0; i < length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	return new Blob([bytes], { type: mimeType });
}

function applyProjectData(projectData) {
	if (!projectData) return;

	const {
		nameInput,
		titleInput,
		subheadingInput,
		introInput,
		skillsInput
	} = App.elements;

	if (projectData.profile) {
		nameInput.value = projectData.profile.name ?? "";
		titleInput.value = projectData.profile.title ?? "";
		subheadingInput.value = projectData.profile.subheading ?? "";
		introInput.value = projectData.profile.intro ?? "";
		skillsInput.value = projectData.profile.skills ?? "";
	}

	if (projectData.colors) {
		Object.keys(projectData.colors).forEach(key => {
			if (colorState[key] !== undefined) {
				colorState[key] = projectData.colors[key];
			}
		});
	}

	if (projectData.fontSizes) {
		Object.keys(projectData.fontSizes).forEach(key => {
			if (fontSizeState[key] !== undefined) {
				fontSizeState[key] = projectData.fontSizes[key];
			}
		});
	}

	if (projectData.avatar) {
        if (projectData.avatar.mode !== undefined) {
            avatarState.mode = projectData.avatar.mode;
        }

        if (projectData.avatar.imageData !== undefined) {
            avatarState.imageData = projectData.avatar.imageData;

            if (avatarState.imageData) {
                App.avatarFileBlob = dataUrlToBlob(avatarState.imageData);
                App.avatarFileExtension = getImageExtensionFromDataUrl(avatarState.imageData);
            } else {
                App.avatarFileBlob = null;
                App.avatarFileExtension = "png";
            }
        }

        if (projectData.avatar.size !== undefined) {
            avatarState.size = projectData.avatar.size;
        }

        if (projectData.avatar.backgroundColor !== undefined) {
            avatarState.backgroundColor = projectData.avatar.backgroundColor;
        }

        if (projectData.avatar.textColor !== undefined) {
            avatarState.textColor = projectData.avatar.textColor;
        }

        if (projectData.avatar.fontSize !== undefined) {
            avatarState.fontSize = projectData.avatar.fontSize;
        }
    }
	if (projectData.contact) {
		Object.keys(projectData.contact).forEach(key => {
			if (key === "customLinks") {
				contactState.customLinks = Array.isArray(projectData.contact.customLinks)
					? projectData.contact.customLinks
					: [];

				return;
			}

			if (!contactState[key]) return;

			if (typeof projectData.contact[key] === "object") {
				contactState[key].enabled = projectData.contact[key].enabled ?? false;
				contactState[key].value = projectData.contact[key].value ?? "";
			}
		});

		contactFields.forEach(field => {
			const state = contactState[field.key];

			if (!state) return;

			const enabledInput = document.querySelector(
				`.contact-enabled-input[data-contact-key="${field.key}"]`
			);

			const valueInput = document.querySelector(
				`.contact-value-input[data-contact-key="${field.key}"]`
			);

			if (enabledInput) {
				enabledInput.checked = state.enabled;
			}

			if (valueInput) {
				valueInput.value = state.value;
			}
		});

		renderCustomContactControls();
		bindCustomContactItemEvents();
		updateContactControlsVisibility();
	}

	renderPreview();
}

function loadSavedProject() {
	const savedData = localStorage.getItem(STORAGE_KEY);

	if (!savedData) {
		showStorageMessage("目前沒有已儲存的設定");
		return;
	}

	try {
		const projectData = JSON.parse(savedData);
		applyProjectData(projectData);
		showStorageMessage("已載入儲存設定");
	} catch (error) {
		console.error(error);
		showStorageMessage("載入失敗，儲存資料可能已損壞");
	}
}

function clearSavedProject() {
	const confirmed = confirm("確定要清除已儲存的設定嗎？");

	if (!confirmed) return;

	localStorage.removeItem(STORAGE_KEY);

	showStorageMessage("已清除儲存設定");
}

function showStorageMessage(message) {
	const { storageMessage } = App.elements;

	if (!storageMessage) return;

	storageMessage.textContent = message;
	storageMessage.classList.add("active");

	setTimeout(() => {
		storageMessage.classList.remove("active");
	}, 1800);
}

function bindStorageEvents() {
	const {
		saveProjectBtn,
		loadProjectBtn,
		clearProjectBtn,
		exportJsonBtn,
		importJsonInput
	} = App.elements;

	saveProjectBtn.addEventListener("click", saveCurrentProject);
	loadProjectBtn.addEventListener("click", loadSavedProject);
	clearProjectBtn.addEventListener("click", clearSavedProject);

	exportJsonBtn.addEventListener("click", exportProjectJson);

	importJsonInput.addEventListener("change", () => {
		const file = importJsonInput.files[0];

		if (!file) return;

		importProjectJson(file);

		importJsonInput.value = "";
	});
}