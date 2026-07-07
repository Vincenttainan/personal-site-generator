function cacheElements() {
	App.elements = {
		nameInput: document.getElementById("nameInput"),
		titleInput: document.getElementById("titleInput"),
		subheadingInput: document.getElementById("subheadingInput"),
		introInput: document.getElementById("introInput"),
		skillsInput: document.getElementById("skillsInput"),
		downloadBtn: document.getElementById("downloadBtn"),
		downloadFileNameInput: document.getElementById("downloadFileNameInput"),
		previewWebsiteBtn: document.getElementById("previewWebsiteBtn"),

		saveProjectBtn: document.getElementById("saveProjectBtn"),
		loadProjectBtn: document.getElementById("loadProjectBtn"),
		clearProjectBtn: document.getElementById("clearProjectBtn"),
		exportJsonBtn: document.getElementById("exportJsonBtn"),
		importJsonInput: document.getElementById("importJsonInput"),
		storageMessage: document.getElementById("storageMessage"),

		avatarPreview: document.getElementById("avatarPreview"),
		namePreview: document.getElementById("namePreview"),
		titlePreview: document.getElementById("titlePreview"),
		subheadingPreview: document.getElementById("subheadingPreview"),
		introPreview: document.getElementById("introPreview"),
		skillsPreview: document.getElementById("skillsPreview"),

		avatarModeInput: document.getElementById("avatarModeInput"),
		avatarImageInput: document.getElementById("avatarImageInput"),
		avatarSizeInput: document.getElementById("avatarSizeInput"),
		avatarFontSizeInput: document.getElementById("avatarFontSizeInput"),
		avatarPhotoControls: document.getElementById("avatarPhotoControls"),
		avatarInitialControls: document.getElementById("avatarInitialControls"),

		avatarSizeInputs: document.querySelectorAll(".avatar-size-input"),
		avatarSizeMinusButtons: document.querySelectorAll(".avatar-size-minus"),
		avatarSizePlusButtons: document.querySelectorAll(".avatar-size-plus"),

		previewArea: document.querySelector(".preview-area"),
		profileCard: document.querySelector(".profile-card"),

		floatingColorModal: document.getElementById("floatingColorModal"),
		floatingModalHeader: document.getElementById("floatingModalHeader"),
		floatingModalTitle: document.getElementById("floatingModalTitle"),
		floatingModalClose: document.getElementById("floatingModalClose"),
		colorGrid: document.getElementById("colorGrid"),
		hexColorInput: document.getElementById("hexColorInput"),
		colorPreviewBox: document.getElementById("colorPreviewBox"),
		colorPreviewText: document.getElementById("colorPreviewText"),

		nameSizeInput: document.getElementById("nameSizeInput"),
		titleSizeInput: document.getElementById("titleSizeInput"),
		subheadingSizeInput: document.getElementById("subheadingSizeInput"),
		introSizeInput: document.getElementById("introSizeInput"),
		skillsSizeInput: document.getElementById("skillsSizeInput")
	};
}

function bindBasicInputEvents() {
	const {
		nameInput,
		titleInput,
		subheadingInput,
		introInput,
		skillsInput
	} = App.elements;

	nameInput.addEventListener("input", renderPreview);
	titleInput.addEventListener("input", renderPreview);
	subheadingInput.addEventListener("input", renderPreview);
	introInput.addEventListener("input", renderPreview);
	skillsInput.addEventListener("input", renderPreview);
}

function initApp() {
	createStorageControls();
	createTemplateControls();
	createGlobalControls();
	createEditorFields();
	createAvatarControls();

	cacheElements();

	bindStorageEvents();
	bindTemplateEvents();
	bindAvatarEvents();
	bindColorModalEvents();
	bindFontSizeEvents();
	bindDownloadEvents();
	bindBasicInputEvents();

	setupAccordionFlash();

	createColorGrid();
	updateAvatarControlsVisibility();
	renderPreview();
}

initApp();