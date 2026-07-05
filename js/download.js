function generateZipFile() {
	const {
		nameInput,
		titleInput,
		subheadingInput,
		introInput,
		skillsInput
	} = App.elements;

	const name = nameInput.value.trim() || "你的姓名";
	const title = titleInput.value.trim() || "你的身分 / 標題";
	const subheading = subheadingInput.value.trim() || "這裡會顯示小標。";
	const intro = introInput.value.trim() || "這裡會顯示你的自我介紹。";

	const skills = skillsInput.value
		.split(",")
		.map(skill => skill.trim())
		.filter(skill => skill !== "");

	const avatarText = name ? name[0] : "你";
	const avatarFileName = `avatar.${App.avatarFileExtension}`;

	const avatarHTML = avatarState.mode === "photo" && App.avatarFileBlob
		? `<img class="avatar-img" src="${avatarFileName}" alt="avatar">`
		: `${avatarText}`;

	const avatarStyle = avatarState.mode === "photo" && App.avatarFileBlob
		? ``
		: `style="background: ${avatarState.backgroundColor}; color: ${avatarState.textColor}; font-size: ${avatarState.fontSize}px;"`;

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
			<div class="avatar" ${avatarStyle}>${avatarHTML}</div>

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

	if (avatarState.mode === "photo" && App.avatarFileBlob) {
		zip.file(avatarFileName, App.avatarFileBlob);
	}

	zip.generateAsync({ type: "blob" }).then(content => {
		const url = URL.createObjectURL(content);

		const a = document.createElement("a");
		a.href = url;
		a.download = "portfolio-website.zip";
		a.click();

		URL.revokeObjectURL(url);
	});
}