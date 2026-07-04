const {
	defaultProfile,
	editorFields,
	globalControls,
	colorState,
	colorTargetNames,
	fontSizeState,
	fontSizeLimit,
	avatarState,
	avatarSizeLimit,
	colorArray
} = window.PortfolioData;

function createGlobalControls() {
	const container = document.getElementById("globalControlsContainer");

	container.innerHTML = `
		<div class="form-group">
			<details class="editor-accordion" data-flash-target="previewArea">
				<summary class="accordion-title">
					<span>主體調整</span>
					<span class="accordion-icon">＋</span>
				</summary>

				<div class="accordion-content">
					<div class="control-row">
						${globalControls.map(control => `
							<div class="control-item">
								<span>${control.label}</span>
								<button type="button" class="color-btn" data-target="${control.key}">🎨</button>
							</div>
						`).join("")}
					</div>
				</div>
			</details>
		</div>
	`;
}

function createEditorFields() {
	const container = document.getElementById("editorFieldsContainer");

	container.innerHTML = editorFields.map(field => {
		const value = defaultProfile[field.key] || "";

		const inputHTML = field.type === "textarea"
			? `<textarea id="${field.inputId}" rows="${field.rows || 4}">${value}</textarea>`
			: `<input type="text" id="${field.inputId}" value="${value}" />`;

		const colorControl = field.hasColor
			? `
				<div class="control-item">
					<span>顏色</span>
					<button type="button" class="color-btn" data-target="${field.key}">🎨</button>
				</div>
			`
			: "";

		const outerColorControl = field.hasOuterColor
			? `
				<div class="control-item">
					<span>外框顏色</span>
					<button type="button" class="color-btn" data-target="${field.key}_outer">🎨</button>
				</div>
			`
			: "";

		const sizeControl = field.hasSize
			? `
				<div class="control-item">
					<span>字體大小</span>

					<div class="stepper">
						<button type="button" class="size-minus" data-target="${field.key}">-</button>

						<input 
							type="number"
							class="size-value size-input"
							id="${field.sizeInputId}"
							data-target="${field.key}"
							value="${field.defaultSize}"
							min="${field.minSize}"
							max="${field.maxSize}"
						/>

						<button type="button" class="size-plus" data-target="${field.key}">+</button>
					</div>
				</div>
			`
			: "";

		const helpText = field.helpText
			? `<small>${field.helpText}</small>`
			: "";

		return `
			<div class="form-group">
				<details class="editor-accordion" data-flash-target="${field.key}">
					<summary class="accordion-title">
						<span>${field.label}</span>
						<span class="accordion-icon">＋</span>
					</summary>

					<div class="accordion-content">
						<div class="control-row">
							${colorControl}
							${outerColorControl}
							${sizeControl}
						</div>

						${inputHTML}
						${helpText}
					</div>
				</details>
			</div>
		`;
	}).join("");
}

function createAvatarControls() {
	const container = document.getElementById("editorFieldsContainer");

	const avatarControlHTML = `
		<div class="form-group">
			<details class="editor-accordion" data-flash-target="avatar">
				<summary class="accordion-title">
					<span>頭像設定</span>
					<span class="accordion-icon">＋</span>
				</summary>

				<div class="accordion-content">
					<div class="control-row">
						<div class="control-item">
							<span>模式</span>

							<select id="avatarModeInput" class="small-select">
								<option value="initial">姓氏</option>
								<option value="photo">照片</option>
							</select>
						</div>
					</div>

					<div class="avatar-control-section" id="avatarPhotoControls">
						<label for="avatarImageInput">上傳照片</label>
						<input type="file" id="avatarImageInput" accept="image/*">

						<div class="control-row">
							<div class="control-item">
								<span>照片大小</span>

								<div class="stepper">
									<button type="button" class="avatar-size-minus" data-target="size">-</button>

									<input 
										type="number"
										class="size-value size-input avatar-size-input"
										id="avatarSizeInput"
										data-target="size"
										value="${avatarState.size}"
										min="${avatarSizeLimit.size.min}"
										max="${avatarSizeLimit.size.max}"
									/>

									<button type="button" class="avatar-size-plus" data-target="size">+</button>
								</div>
							</div>
						</div>
					</div>

					<div class="avatar-control-section" id="avatarInitialControls">
						<div class="control-row">
							<div class="control-item">
								<span>底色顏色</span>
								<button type="button" class="color-btn" data-target="avatar_background">🎨</button>
							</div>

							<div class="control-item">
								<span>字體顏色</span>
								<button type="button" class="color-btn" data-target="avatar_text">🎨</button>
							</div>
						</div>

						<div class="control-row">
							<div class="control-item">
								<span>字體大小</span>

								<div class="stepper">
									<button type="button" class="avatar-size-minus" data-target="fontSize">-</button>

									<input 
										type="number"
										class="size-value size-input avatar-size-input"
										id="avatarFontSizeInput"
										data-target="fontSize"
										value="${avatarState.fontSize}"
										min="${avatarSizeLimit.fontSize.min}"
										max="${avatarSizeLimit.fontSize.max}"
									/>

									<button type="button" class="avatar-size-plus" data-target="fontSize">+</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</details>
		</div>
	`;

	container.insertAdjacentHTML("afterbegin", avatarControlHTML);
}

createGlobalControls();
createEditorFields();
createAvatarControls();

const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const introInput = document.getElementById("introInput");
const skillsInput = document.getElementById("skillsInput");
const subheadingInput = document.getElementById("subheadingInput");
const downloadBtn = document.getElementById("downloadBtn");

const avatarPreview = document.getElementById("avatarPreview");
const namePreview = document.getElementById("namePreview");
const titlePreview = document.getElementById("titlePreview");
const introPreview = document.getElementById("introPreview");
const skillsPreview = document.getElementById("skillsPreview");
const subheadingPreview = document.getElementById("subheadingPreview");

const avatarModeInput = document.getElementById("avatarModeInput");
const avatarImageInput = document.getElementById("avatarImageInput");
const avatarSizeInput = document.getElementById("avatarSizeInput");
const avatarFontSizeInput = document.getElementById("avatarFontSizeInput");
const avatarPhotoControls = document.getElementById("avatarPhotoControls");
const avatarInitialControls = document.getElementById("avatarInitialControls");

const avatarSizeInputs = document.querySelectorAll(".avatar-size-input");
const avatarSizeMinusButtons = document.querySelectorAll(".avatar-size-minus");
const avatarSizePlusButtons = document.querySelectorAll(".avatar-size-plus");

const previewArea = document.querySelector(".preview-area");
const profileCard = document.querySelector(".profile-card");

avatarModeInput.addEventListener("change", () => {
	avatarState.mode = avatarModeInput.value;
	renderPreview();
});

avatarImageInput.addEventListener("change", () => {
	const file = avatarImageInput.files[0];

	if (!file) return;

	const reader = new FileReader();

	reader.addEventListener("load", () => {
		avatarState.imageData = reader.result;
		avatarState.mode = "photo";
		avatarModeInput.value = "photo";
		renderPreview();
	});

	reader.readAsDataURL(file);
});

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

avatarSizeMinusButtons.forEach(button => {
	button.addEventListener("click", () => {
		const target = button.dataset.target;
		changeAvatarSize(target, -1);
	});
});

avatarSizePlusButtons.forEach(button => {
	button.addEventListener("click", () => {
		const target = button.dataset.target;
		changeAvatarSize(target, 1);
	});
});

avatarSizeInputs.forEach(input => {
	input.addEventListener("input", () => {
		const target = input.dataset.target;
		const limit = avatarSizeLimit[target];

		let value = Number(input.value);

		if (Number.isNaN(value)) return;

		if (value < limit.min) {
			value = limit.min;
		}

		if (value > limit.max) {
			value = limit.max;
		}

		avatarState[target] = value;
		renderPreview();
	});
});

function getFlashElement(target) {
	const flashMap = {
		previewArea: previewArea,
		card: profileCard,
		avatar: avatarPreview,
		name: namePreview,
		title: titlePreview,
		subheading: subheadingPreview,
		intro: introPreview,
		skills: skillsPreview
	};

	return flashMap[target];
}

function flashElement(element) {
	if (!element) return;

	element.classList.remove("preview-flash");

	void element.offsetWidth;

	element.classList.add("preview-flash");

	setTimeout(() => {
		element.classList.remove("preview-flash");
	}, 650);
}

function setupAccordionFlash() {
	const accordions = document.querySelectorAll(".editor-accordion");

	accordions.forEach(accordion => {
		accordion.addEventListener("toggle", () => {
			if (!accordion.open) return;

			const target = accordion.dataset.flashTarget;
			const flashTarget = getFlashElement(target);

			flashElement(flashTarget);
		});
	});
}

const colorButtons = document.querySelectorAll(".color-btn");

const floatingColorModal = document.getElementById("floatingColorModal");
const floatingModalHeader = document.getElementById("floatingModalHeader");
const floatingModalTitle = document.getElementById("floatingModalTitle");
const floatingModalClose = document.getElementById("floatingModalClose");
const colorGrid = document.getElementById("colorGrid");
const hexColorInput = document.getElementById("hexColorInput");
const colorPreviewBox = document.getElementById("colorPreviewBox");
const colorPreviewText = document.getElementById("colorPreviewText");

const nameSizeInput = document.getElementById("nameSizeInput");
const titleSizeInput = document.getElementById("titleSizeInput");
const introSizeInput = document.getElementById("introSizeInput");
const skillsSizeInput = document.getElementById("skillsSizeInput");
const subheadingSizeInput = document.getElementById("subheadingSizeInput");

const sizeInputs = document.querySelectorAll(".size-input");
const sizeMinusButtons = document.querySelectorAll(".size-minus");
const sizePlusButtons = document.querySelectorAll(".size-plus");

let currentColorTarget = null;

function renderAvatar(name) {
	avatarPreview.innerHTML = "";

	avatarPreview.style.width = `${avatarState.size}px`;
	avatarPreview.style.height = `${avatarState.size}px`;

	if (avatarState.mode === "photo" && avatarState.imageData) {
		const img = document.createElement("img");
		img.src = avatarState.imageData;
		img.alt = "avatar";
		img.className = "avatar-img";

		avatarPreview.appendChild(img);
	} else {
		avatarPreview.textContent = name ? name[0] : "你";
		avatarPreview.style.background = avatarState.backgroundColor;
		avatarPreview.style.color = avatarState.textColor;
		avatarPreview.style.fontSize = `${avatarState.fontSize}px`;
	}

	if (avatarModeInput) {
		avatarModeInput.value = avatarState.mode;
	}

	if (avatarSizeInput) {
		avatarSizeInput.value = avatarState.size;
	}

	if (avatarFontSizeInput) {
		avatarFontSizeInput.value = avatarState.fontSize;
	}

	if (avatarPhotoControls && avatarInitialControls) {
		if (avatarState.mode === "photo") {
			avatarPhotoControls.style.display = "block";
			avatarInitialControls.style.display = "none";
		} else {
			avatarPhotoControls.style.display = "none";
			avatarInitialControls.style.display = "block";
		}
	}
}

function renderPreview() {
	const name = nameInput.value.trim();
	const title = titleInput.value.trim();
	const subheading = subheadingInput.value.trim();
	const intro = introInput.value.trim();

	namePreview.style.fontSize = `${fontSizeState.name}px`;
	titlePreview.style.fontSize = `${fontSizeState.title}px`;
	introPreview.style.fontSize = `${fontSizeState.intro}px`;

	const skills = skillsInput.value
		.split(",")
		.map(skill => skill.trim())
		.filter(skill => skill !== "");

	namePreview.textContent = name || "你的姓名";
	titlePreview.textContent = title || "你的身分 / 標題";
	subheadingPreview.textContent = subheading || "這裡會顯示小標。";
	introPreview.textContent = intro || "這裡會顯示你的自我介紹。";

	renderAvatar(name);

	skillsPreview.innerHTML = "";

	skills.forEach(skill => {
		const skillTag = document.createElement("span");
		skillTag.textContent = skill;
		skillsPreview.appendChild(skillTag);
	});

	if (skills.length === 0) {
		const emptyTag = document.createElement("span");
		emptyTag.textContent = "技能";
		skillsPreview.appendChild(emptyTag);
	}

	namePreview.style.color = colorState.name;
	titlePreview.style.color = colorState.title;
	introPreview.style.color = colorState.intro;
	subheadingPreview.style.color = colorState.subheading;

	namePreview.style.fontSize = `${fontSizeState.name}px`;
	titlePreview.style.fontSize = `${fontSizeState.title}px`;
	introPreview.style.fontSize = `${fontSizeState.intro}px`;
	subheadingPreview.style.fontSize = `${fontSizeState.subheading}px`;

	document.querySelectorAll("#skillsPreview span").forEach(skillTag => {
		skillTag.style.color = colorState.skills;
		skillTag.style.background = colorState.skills_outer;
		skillTag.style.fontSize = `${fontSizeState.skills}px`;
	});

	previewArea.style.background = colorState.background;
	profileCard.style.background = colorState.card;

	updateFontSizeInputs();
}

function updateFontSizeInputs() {
	nameSizeInput.value = fontSizeState.name;
	titleSizeInput.value = fontSizeState.title;
	subheadingSizeInput.value = fontSizeState.subheading;
	introSizeInput.value = fontSizeState.intro;
	skillsSizeInput.value = fontSizeState.skills;
}

function changeFontSize(target, amount) {
	const limit = fontSizeLimit[target];

	fontSizeState[target] += amount;

	if (fontSizeState[target] < limit.min) {
		fontSizeState[target] = limit.min;
	}

	if (fontSizeState[target] > limit.max) {
		fontSizeState[target] = limit.max;
	}

	renderPreview();
}

sizeMinusButtons.forEach(button => {
	button.addEventListener("click", () => {
		const target = button.dataset.target;
		changeFontSize(target, -1);
	});
});

sizePlusButtons.forEach(button => {
	button.addEventListener("click", () => {
		const target = button.dataset.target;
		changeFontSize(target, 1);
	});
});

sizeInputs.forEach(input => {
	input.addEventListener("input", () => {
		const target = input.dataset.target;
		const limit = fontSizeLimit[target];

		let value = Number(input.value);

		if (Number.isNaN(value)) return;

		if (value < limit.min) {
			value = limit.min;
		}

		if (value > limit.max) {
			value = limit.max;
		}

		fontSizeState[target] = value;
		renderPreview();
	});
});

function isValidHexColor(color) {
	return /^#[0-9A-Fa-f]{6}$/.test(color);
}

function applyColor(color) {
	if (!currentColorTarget) return;
	if (!isValidHexColor(color)) return;

	if (currentColorTarget === "avatar_background") {
		avatarState.backgroundColor = color;
	} else if (currentColorTarget === "avatar_text") {
		avatarState.textColor = color;
	} else {
		colorState[currentColorTarget] = color;
	}

	hexColorInput.value = color;

	updateColorPreview(color);
	updateSelectedColorSquare(color);
	renderPreview();
}

function updateColorPreview(color) {
	colorPreviewBox.style.background = color;
	colorPreviewText.textContent = color;

	const darkColors = ["#000000", "#222222", "#555555", "#5c585a", "#6d201b", "#8f0197", "#0021b0", "#111827", "#1f2937"];

	if (darkColors.includes(color.toLowerCase())) {
		colorPreviewText.style.color = "white";
	} else {
		colorPreviewText.style.color = "#222";
	}
}

function createColorGrid() {
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
		if (square.dataset.color.toLowerCase() === color.toLowerCase()) {
			square.classList.add("selected");
		} else {
			square.classList.remove("selected");
		}
	});
}

/* 點 🎨 開啟可移動調色 modal */
colorButtons.forEach(button => {
	button.addEventListener("click", () => {
		currentColorTarget = button.dataset.target;

		if (!currentColorTarget) return;

		let currentColor = colorState[currentColorTarget];

		if (currentColorTarget === "avatar_background") {
			currentColor = avatarState.backgroundColor;
		}

		if (currentColorTarget === "avatar_text") {
			currentColor = avatarState.textColor;
		}

        floatingModalTitle.textContent = `調整：${colorTargetNames[currentColorTarget]}`;
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
	});
});

/* 手動輸入色號，也要同步 */
hexColorInput.addEventListener("input", () => {
	let inputColor = hexColorInput.value.trim();

	if (!inputColor.startsWith("#")) {
		inputColor = `#${inputColor}`;
	}

	if (!isValidHexColor(inputColor)) return;

	applyColor(inputColor);
});

/* 關閉 modal */
floatingModalClose.addEventListener("click", () => {
	floatingColorModal.classList.remove("active");
});

/* modal 拖曳 */
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

/* 基本資料即時同步 */
nameInput.addEventListener("input", renderPreview);
titleInput.addEventListener("input", renderPreview);
subheadingInput.addEventListener("input", renderPreview);
introInput.addEventListener("input", renderPreview);
skillsInput.addEventListener("input", renderPreview);

/* 下載 ZIP */
function generateZipFile() {	
	const name = nameInput.value.trim() || "你的姓名";
	const title = titleInput.value.trim() || "你的身分 / 標題";
	const subheading = subheadingInput.value.trim() || "這裡會顯示小標。";
	const intro = introInput.value.trim() || "這裡會顯示你的自我介紹。";

	const skills = skillsInput.value
		.split(",")
		.map(skill => skill.trim())
		.filter(skill => skill !== "");

	const avatarText = name ? name[0] : "你";

	const avatarHTML = avatarState.mode === "photo" && avatarState.imageData
		? `<div class="avatar"><img class="avatar-img" src="${avatarState.imageData}" alt="avatar"></div>`
		: `<div class="avatar" style="background: ${avatarState.backgroundColor}; color: ${avatarState.textColor}; font-size: ${avatarState.fontSize}px;">${avatarText}</div>`;

	const skillHTML = skills.length > 0
		? skills.map(skill => `<span style="color: ${colorState.skills}; background: ${colorState.skills_outer}; font-size: ${fontSizeState.skills}px;">${skill}</span>`).join("\n\t\t\t\t\t")
		: `<span style="color: ${colorState.skills}; background: ${colorState.skills_outer}; font-size: ${fontSizeState.skills}px;">技能</span>`;

	const htmlContent = `
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${name} 的個人網頁</title>
	<link rel="stylesheet" href="style.css" />
</head>
<body>

	<main class="page">
		<section class="profile-card">
			<div class="avatar">${avatarHTML}</div>

			<div class="profile-content">
				<p class="subheading" style="color: ${colorState.subheading}; font-size: ${fontSizeState.subheading}px;">${subheading}</p>

				<h1 style="color: ${colorState.name}; font-size: ${fontSizeState.name}px;">${name}</h1>

				<h2 style="color: ${colorState.title}; font-size: ${fontSizeState.title}px;">${title}</h2>

				<p class="intro" style="color: ${colorState.intro}; font-size: ${fontSizeState.intro}px;">${intro}</p>

				<div class="skills">
					${skillHTML}
				</div>
			</div>
		</section>
	</main>

	<script src="script.js"></script>
</body>
</html>
`;

	const cssContent = `
* {
	box-sizing: border-box;
}

body {
	margin: 0;
	font-family: "Noto Sans TC", Arial, sans-serif;
	background: ${colorState.background};
	color: #222;
}

.page {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px;
}

.profile-card {
	width: min(850px, 100%);
	background: ${colorState.card};
	border-radius: 28px;
	padding: 48px;
	display: flex;
	gap: 36px;
	align-items: center;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

.avatar {
	width: ${avatarState.size}px;
	height: ${avatarState.size}px;
	border-radius: 50%;
	background: #222;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 60px;
	font-weight: 700;
	flex-shrink: 0;
	overflow: hidden;
}

.avatar-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}

.profile-content {
	flex: 1;
}

.label {
	margin: 0 0 12px;
	font-size: 14px;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: #777;
}

.profile-content h1 {
	margin: 0;
	font-size: 44px;
}

.profile-content h2 {
	margin: 12px 0 10px;
	font-size: 24px;
	font-weight: 500;
}

.subheading {
	margin: 0 0 20px;
	font-size: 12px;
	color: #777;
	letter-spacing: 1px;
}

.intro {
	font-size: 17px;
	line-height: 1.8;
	margin-bottom: 28px;
	white-space: pre-line;
}

.skills {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.skills span {
	padding: 8px 14px;
	background: #f1f3f5;
	border-radius: 999px;
	font-size: 14px;
}

@media (max-width: 700px) {
	.profile-card {
		flex-direction: column;
		text-align: center;
		padding: 32px 24px;
	}

	.profile-content h1 {
		font-size: 36px;
	}

	.skills {
		justify-content: center;
	}
}
`;

	const jsContent = `console.log("Portfolio website loaded.");`;

	const zip = new JSZip();

	zip.file("index.html", htmlContent);
	zip.file("style.css", cssContent);
	zip.file("script.js", jsContent);

	zip.generateAsync({ type: "blob" }).then(function(content) {
		const url = URL.createObjectURL(content);

		const a = document.createElement("a");
		a.href = url;
		a.download = "portfolio-website.zip";
		a.click();

		URL.revokeObjectURL(url);
	});
}

downloadBtn.addEventListener("click", generateZipFile);

setupAccordionFlash();

createColorGrid();
renderPreview();