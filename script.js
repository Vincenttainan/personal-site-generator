const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const introInput = document.getElementById("introInput");
const skillsInput = document.getElementById("skillsInput");

const downloadBtn = document.getElementById("downloadBtn");

const avatarPreview = document.getElementById("avatarPreview");
const namePreview = document.getElementById("namePreview");
const titlePreview = document.getElementById("titlePreview");
const introPreview = document.getElementById("introPreview");
const skillsPreview = document.getElementById("skillsPreview");
/*const skills_outerPreview = document.getElementById("skills_outerPreview");*/

const previewArea = document.querySelector(".preview-area");
const profileCard = document.querySelector(".profile-card");

/* 調色 Modal 元素 */
const colorButtons = document.querySelectorAll(".color-btn");
const floatingColorModal = document.getElementById("floatingColorModal");
const floatingModalHeader = document.getElementById("floatingModalHeader");
const floatingModalTitle = document.getElementById("floatingModalTitle");
const floatingModalClose = document.getElementById("floatingModalClose");
const colorGrid = document.getElementById("colorGrid");
const hexColorInput = document.getElementById("hexColorInput");
const colorPreviewBox = document.getElementById("colorPreviewBox");
const colorPreviewText = document.getElementById("colorPreviewText");

let currentColorTarget = null;

const colorState = {
	name: "#222222",
	title: "#555555",
	intro: "#444444",
	skills: "#222222",
	skills_outer: "#f1f3f5",
	background: "#dfe9f3",
	card: "#ffffff"
};

const colorTargetNames = {
	name: "姓名",
	title: "身分 / 標題",
	intro: "自我介紹",
	skills: "技能字體顏色",
	skills_outer: "技能外匡顏色",
	background: "背景顏色",
	card: "卡片顏色"
};

/* 你提供的色票表 */
const colorArray = [
	"#ffffff", "#e5e4e4", "#d9d8d8", "#c0bdbd", "#a7a4a4", "#8e8a8b", "#827e7f", "#767173", "#5c585a", "#000000",
	"#fefcdf", "#fef4c4", "#feed9b", "#fee573", "#ffed43", "#f6cc0b", "#f6cc0b", "#c9a601", "#ad8e00", "#8c7301",
	"#ffded3", "#ffc4b0", "#ff9d7d", "#ff7a4e", "#ff6600", "#e95d00", "#d15502", "#ba4b01", "#a44201", "#8d3901",
	"#ffd2d0", "#ffbab7", "#fe9a95", "#ff7a73", "#ff483f", "#fe2419", "#f10b00", "#d40a00", "#940000", "#6d201b",
	"#ffdaed", "#ffb7dc", "#ffa1d1", "#ff84c3", "#ff57ac", "#fd1289", "#ec0078", "#d6006d", "#bb005f", "#9b014f",
	"#fcd6fe", "#fbbcff", "#f9a1fe", "#f784fe", "#f564fe", "#f546ff", "#f328ff", "#d801e5", "#c001cb", "#8f0197",
	"#e2f0fe", "#c7e2fe", "#add5fe", "#92c7fe", "#6eb5ff", "#48a2ff", "#2690fe", "#0162f4", "#013add", "#0021b0",
	"#d3fdff", "#acfafd", "#7cfaff", "#4af7fe", "#1de6fe", "#01deff", "#00cdec", "#01b6de", "#00a0c2", "#0084a0",
	"#edffcf", "#dffeaa", "#d1fd88", "#befa5a", "#a8f32a", "#8fd80a", "#79c101", "#3fa701", "#307f00", "#156200",
	"#d4c89f", "#daad88", "#c49578", "#c2877e", "#ac8295", "#c0a5c4", "#969ac2", "#92b7d7", "#80adaf", "#9ca53b"
];

function renderPreview() {
	const name = nameInput.value.trim();
	const title = titleInput.value.trim();
	const intro = introInput.value.trim();

	const skills = skillsInput.value
		.split(",")
		.map(skill => skill.trim())
		.filter(skill => skill !== "");

	namePreview.textContent = name || "你的姓名";
	titlePreview.textContent = title || "你的身分 / 標題";
	introPreview.textContent = intro || "這裡會顯示你的自我介紹。";

	avatarPreview.textContent = name ? name[0] : "你";

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

	document.querySelectorAll("#skillsPreview span").forEach(skillTag => {
		skillTag.style.color = colorState.skills;
		skillTag.style.background = colorState.skills_outer;
	});

	previewArea.style.background = colorState.background;
	profileCard.style.background = colorState.card;
}

function isValidHexColor(color) {
	return /^#[0-9A-Fa-f]{6}$/.test(color);
}

function applyColor(color) {
	if (!currentColorTarget) return;
	if (!isValidHexColor(color)) return;

	colorState[currentColorTarget] = color;
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

		const currentColor = colorState[currentColorTarget];

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
introInput.addEventListener("input", renderPreview);
skillsInput.addEventListener("input", renderPreview);

/* 下載 ZIP */
function generateZipFile() {
	const name = nameInput.value.trim() || "你的姓名";
	const title = titleInput.value.trim() || "你的身分 / 標題";
	const intro = introInput.value.trim() || "這裡會顯示你的自我介紹。";

	const skills = skillsInput.value
		.split(",")
		.map(skill => skill.trim())
		.filter(skill => skill !== "");

	const avatarText = name ? name[0] : "你";

	const skillHTML = skills.length > 0
		? skills.map(skill => `<span style="color: ${colorState.skills}; background: ${colorState.skills_outer};">${skill}</span>`).join("\n\t\t\t\t\t")
		: `<span style="color: ${colorState.skills}; background: ${colorState.skills_outer};">技能</span>`;

	const htmlContent = `<!DOCTYPE html>
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
			<div class="avatar">${avatarText}</div>

			<div class="profile-content">
				<p class="label">Personal Portfolio</p>

				<h1 style="color: ${colorState.name};">${name}</h1>

				<h2 style="color: ${colorState.title};">${title}</h2>

				<p class="intro" style="color: ${colorState.intro};">${intro}</p>

				<div class="skills">
					${skillHTML}
				</div>
			</div>
		</section>
	</main>

	<script src="script.js"></script>
</body>
</html>`;

	const cssContent = `* {
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
	width: 150px;
	height: 150px;
	border-radius: 50%;
	background: #222;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 60px;
	font-weight: 700;
	flex-shrink: 0;
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
	margin: 12px 0 20px;
	font-size: 24px;
	font-weight: 500;
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
}`;

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

createColorGrid();
renderPreview();