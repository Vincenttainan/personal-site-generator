function isValidHexColor(color) {
	return /^#[0-9A-Fa-f]{6}$/.test(color);
}

function getCurrentColor(target) {
	if (target === "avatar_background") {
		return avatarState.backgroundColor;
	}

	if (target === "avatar_text") {
		return avatarState.textColor;
	}

	return colorState[target];
}

function applyColor(color) {
	const {
		hexColorInput
	} = App.elements;

	if (!App.currentColorTarget) return;
	if (!isValidHexColor(color)) return;

	if (App.currentColorTarget === "avatar_background") {
		avatarState.backgroundColor = color;
	} else if (App.currentColorTarget === "avatar_text") {
		avatarState.textColor = color;
	} else {
		colorState[App.currentColorTarget] = color;
	}

	hexColorInput.value = color;

	updateColorPreview(color);
	updateSelectedColorSquare(color);
	renderPreview();
}

function updateColorPreview(color) {
	const {
		colorPreviewBox,
		colorPreviewText
	} = App.elements;

	colorPreviewBox.style.background = color;
	colorPreviewText.textContent = color;

	const darkColors = [
		"#000000",
		"#222222",
		"#555555",
		"#5c585a",
		"#6d201b",
		"#8f0197",
		"#0021b0",
		"#111827",
		"#1f2937"
	];

	if (darkColors.includes(color.toLowerCase())) {
		colorPreviewText.style.color = "white";
	} else {
		colorPreviewText.style.color = "#222";
	}
}

function createColorGrid() {
	const { colorGrid } = App.elements;

	colorGrid.innerHTML = "";

	colorArray.forEach(color => {
		const square = document.createElement("button");
		square.className = "color-square";
		square.dataset.color = color;
		square.style.background = color;
		square.title = color;

		square.addEventListener("click", () => {
			applyColor(color);
		});

		colorGrid.appendChild(square);
	});
}

function updateSelectedColorSquare(color) {
	const squares = document.querySelectorAll(".color-square");

	squares.forEach(square => {
		square.classList.toggle(
			"selected",
			square.dataset.color.toLowerCase() === color.toLowerCase()
		);
	});
}

function openColorModal(button) {
	const {
		floatingColorModal,
		floatingModalTitle,
		hexColorInput
	} = App.elements;

	App.currentColorTarget = button.dataset.target;

	if (!App.currentColorTarget) return;

	const currentColor = getCurrentColor(App.currentColorTarget);

	floatingModalTitle.textContent = `調整：${colorTargetNames[App.currentColorTarget]}`;
	hexColorInput.value = currentColor;

	updateColorPreview(currentColor);
	updateSelectedColorSquare(currentColor);

	const rect = button.getBoundingClientRect();

	let modalLeft = rect.right + 12;
	let modalTop = rect.top;

	const modalWidth = floatingColorModal.offsetWidth || 270;
	const modalHeight = floatingColorModal.offsetHeight || 360;

	if (modalLeft + modalWidth > window.innerWidth) {
		modalLeft = rect.left - modalWidth - 12;
	}

	if (modalTop + modalHeight > window.innerHeight) {
		modalTop = window.innerHeight - modalHeight - 12;
	}

	modalLeft = Math.max(12, modalLeft);
	modalTop = Math.max(12, modalTop);

	floatingColorModal.style.left = `${modalLeft}px`;
	floatingColorModal.style.top = `${modalTop}px`;

	floatingColorModal.classList.add("active");
}

function bindColorModalEvents() {
	const {
		floatingColorModal,
		floatingModalHeader,
		floatingModalClose,
		hexColorInput
	} = App.elements;

	const colorButtons = document.querySelectorAll(".color-btn");

	colorButtons.forEach(button => {
		button.addEventListener("click", () => {
			openColorModal(button);
		});
	});

	hexColorInput.addEventListener("input", () => {
		let inputColor = hexColorInput.value.trim();

		if (!inputColor.startsWith("#")) {
			inputColor = `#${inputColor}`;
		}

		if (!isValidHexColor(inputColor)) return;

		applyColor(inputColor);
	});

	floatingModalClose.addEventListener("click", () => {
		floatingColorModal.classList.remove("active");
	});

	let isDragging = false;
	let dragOffsetX = 0;
	let dragOffsetY = 0;

	floatingModalHeader.addEventListener("mousedown", event => {
		isDragging = true;

		const modalRect = floatingColorModal.getBoundingClientRect();

		dragOffsetX = event.clientX - modalRect.left;
		dragOffsetY = event.clientY - modalRect.top;

		document.body.style.userSelect = "none";
	});

	document.addEventListener("mousemove", event => {
		if (!isDragging) return;

		let newLeft = event.clientX - dragOffsetX;
		let newTop = event.clientY - dragOffsetY;

		const maxLeft = window.innerWidth - floatingColorModal.offsetWidth;
		const maxTop = window.innerHeight - floatingColorModal.offsetHeight;

		newLeft = Math.max(0, Math.min(newLeft, maxLeft));
		newTop = Math.max(0, Math.min(newTop, maxTop));

		floatingColorModal.style.left = `${newLeft}px`;
		floatingColorModal.style.top = `${newTop}px`;
	});

	document.addEventListener("mouseup", () => {
		isDragging = false;
		document.body.style.userSelect = "";
	});
}