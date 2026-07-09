function sanitizeFileName(fileName) {
	return fileName
		.trim()
		.replace(/[\\/:*?"<>|]/g, "")
		.replace(/\s+/g, "-");
}

function getDownloadFileName() {
	const { downloadFileNameInput } = App.elements;

	const rawFileName = downloadFileNameInput.value || "portfolio-website";
	const safeFileName = sanitizeFileName(rawFileName);

	return safeFileName || "portfolio-website";
}

function generateContactHTML() {
	const contactLinks = getEnabledContactLinks();

	if (contactLinks.length === 0) return "";

	return `
				<div class="contact-links">
					${contactLinks.map(link => {
						const targetAttr = link.openNewTab
							? `target="_blank" rel="noopener noreferrer"`
							: "";

						return `<a class="contact-link" href="${link.href}" ${targetAttr}>${link.label}</a>`;
					}).join("")}
				</div>
	`;
}

function generatePortfolioHtml() {
	const {
		nameInput,
		titleInput,
		subheadingInput,
		introInput
	} = App.elements;

	const name = nameInput.value.trim() || "你的姓名";
	const title = titleInput.value.trim() || "你的身分 / 標題";
	const subheading = subheadingInput.value.trim() || "這裡會顯示小標。";
	const intro = introInput.value.trim() || "這裡會顯示你的自我介紹。";

	const skills = getSkillsArray();

	const avatarText = name ? name[0] : "你";

	const avatarHTML = avatarState.mode === "photo" && avatarState.imageData
		? `<img class="avatar-img" src="${avatarState.imageData}" alt="avatar">`
		: `${avatarText}`;

	const avatarStyle = avatarState.mode === "photo" && avatarState.imageData
		? ``
		: `style="background: ${avatarState.backgroundColor}; color: ${avatarState.textColor}; font-size: ${avatarState.fontSize}px;"`;

	const skillHTML = skills.length > 0
		? skills.map(skill => `<span style="color: ${colorState.skills}; background: ${colorState.skills_outer}; font-size: ${fontSizeState.skills}px;">${skill}</span>`).join("\n\t\t\t\t\t")
		: `<span style="color: ${colorState.skills}; background: ${colorState.skills_outer}; font-size: ${fontSizeState.skills}px;">技能</span>`;

	const contactHTML = generateContactHTML();

	return `
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${name} 的個人網頁</title>

	<style>
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
		}

		.profile-content h2 {
			margin: 12px 0 10px;
			font-weight: 500;
		}

		.subheading {
			margin: 0 0 20px;
			letter-spacing: 1px;
		}

		.intro {
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
			border-radius: 999px;
		}

		.contact-links {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			margin-top: 18px;
		}

		.contact-link {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 8px 14px;
			border-radius: 999px;
			background: #222;
			color: white;
			font-size: 14px;
			text-decoration: none;
			transition: 0.2s;
		}

		.contact-link:hover {
			background: #444;
			transform: translateY(-1px);
		}

		@media (max-width: 700px) {
			.profile-card {
				flex-direction: column;
				text-align: center;
				padding: 32px 24px;
			}

			.skills {
				justify-content: center;
			}
		}
	</style>
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

				${contactHTML}
			</div>
		</section>
	</main>
</body>
</html>
`;
}

function openWebsitePreview() {
	const htmlContent = generatePortfolioHtml();
	const blob = new Blob([htmlContent], { type: "text/html" });
	const url = URL.createObjectURL(blob);

	window.open(url, "_blank");
}

function bindDownloadEvents() {
	const {
		downloadBtn,
		previewWebsiteBtn
	} = App.elements;

	previewWebsiteBtn.addEventListener("click", openWebsitePreview);
	downloadBtn.addEventListener("click", generateZipFile);
}

function generateZipFile() {
	const {
		nameInput,
		titleInput,
		subheadingInput,
		introInput
	} = App.elements;

	const name = nameInput.value.trim() || "你的姓名";
	const title = titleInput.value.trim() || "你的身分 / 標題";
	const subheading = subheadingInput.value.trim() || "這裡會顯示小標。";
	const intro = introInput.value.trim() || "這裡會顯示你的自我介紹。";

	const skills = getSkillsArray();

	const avatarText = name ? name[0] : "你";
	if (avatarState.mode === "photo" && avatarState.imageData && !App.avatarFileBlob) {
		App.avatarFileBlob = dataUrlToBlob(avatarState.imageData);
		App.avatarFileExtension = getImageExtensionFromDataUrl(avatarState.imageData);
	}

	const hasAvatarImage = avatarState.mode === "photo" && App.avatarFileBlob;
	const avatarFileName = `avatar.${App.avatarFileExtension}`;

	const avatarHTML = hasAvatarImage
		? `<img class="avatar-img" src="${avatarFileName}" alt="avatar">`
		: `${avatarText}`;

	const avatarStyle = hasAvatarImage
		? ``
		: `style="background: ${avatarState.backgroundColor}; color: ${avatarState.textColor}; font-size: ${avatarState.fontSize}px;"`;

	const skillHTML = skills.length > 0
		? skills.map(skill => `<span style="color: ${colorState.skills}; background: ${colorState.skills_outer}; font-size: ${fontSizeState.skills}px;">${skill}</span>`).join("\n\t\t\t\t\t")
		: `<span style="color: ${colorState.skills}; background: ${colorState.skills_outer}; font-size: ${fontSizeState.skills}px;">技能</span>`;

	const contactHTML = generateContactHTML();
	
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

				${contactHTML}
			</div>
		</section>
	</main>
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

.contact-links {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 18px;
}

.contact-link {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 8px 14px;
	border-radius: 999px;
	background: #222;
	color: white;
	font-size: 14px;
	text-decoration: none;
	transition: 0.2s;
}

.contact-link:hover {
	background: #444;
	transform: translateY(-1px);
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

	const zip = new JSZip();

	zip.file("index.html", htmlContent);
	zip.file("style.css", cssContent);

	if (hasAvatarImage) {
		zip.file(avatarFileName, App.avatarFileBlob);
	}

	zip.generateAsync({ type: "blob" }).then(content => {
		const url = URL.createObjectURL(content);

		const a = document.createElement("a");
		a.href = url;
		a.download = `${getDownloadFileName()}.zip`;
		a.click();

		URL.revokeObjectURL(url);
	});
}