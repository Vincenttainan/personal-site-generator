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
}

nameInput.addEventListener("input", renderPreview);
titleInput.addEventListener("input", renderPreview);
introInput.addEventListener("input", renderPreview);
skillsInput.addEventListener("input", renderPreview);

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
		? skills.map(skill => `<span>${skill}</span>`).join("\n\t\t\t\t\t")
		: "<span>技能</span>";

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

				<h1>${name}</h1>

				<h2>${title}</h2>

				<p class="intro">${intro}</p>

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
	background: linear-gradient(135deg, #f5f7fa, #dfe9f3);
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
	background: white;
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
	color: #555;
}

.intro {
	font-size: 17px;
	line-height: 1.8;
	color: #444;
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

renderPreview();