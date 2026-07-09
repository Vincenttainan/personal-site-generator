function updateAvatarControlsVisibility() {
	const { avatarPhotoControls, avatarInitialControls } = App.elements;

	if (!avatarPhotoControls || !avatarInitialControls) return;

	if (avatarState.mode === "photo") {
		avatarPhotoControls.style.display = "block";
		avatarInitialControls.style.display = "none";
	} else {
		avatarPhotoControls.style.display = "none";
		avatarInitialControls.style.display = "block";
	}
}

function renderAvatar(name) {
	const {
		avatarPreview,
		avatarModeInput,
		avatarSizeInput,
		avatarFontSizeInput
	} = App.elements;

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

	if (avatarModeInput) avatarModeInput.value = avatarState.mode;
	if (avatarSizeInput) avatarSizeInput.value = avatarState.size;
	if (avatarFontSizeInput) avatarFontSizeInput.value = avatarState.fontSize;

	updateAvatarControlsVisibility();
}

function updateFontSizeInputs() {
	const {
		nameSizeInput,
		titleSizeInput,
		subheadingSizeInput,
		introSizeInput,
		skillsSizeInput
	} = App.elements;

	nameSizeInput.value = fontSizeState.name;
	titleSizeInput.value = fontSizeState.title;
	subheadingSizeInput.value = fontSizeState.subheading;
	introSizeInput.value = fontSizeState.intro;
	skillsSizeInput.value = fontSizeState.skills;
}

function renderContactLinks() {
	const { contactLinksPreview } = App.elements;

	if (!contactLinksPreview) return;

	contactLinksPreview.innerHTML = "";

	const links = getEnabledContactLinks();

	links.forEach(link => {
		const anchor = document.createElement("a");

		anchor.href = link.href;
		anchor.textContent = link.label;
		anchor.className = "contact-link";

		if (link.openNewTab) {
			anchor.target = "_blank";
			anchor.rel = "noopener noreferrer";
		}

		contactLinksPreview.appendChild(anchor);
	});
}

function renderPreview() {
	const {
		nameInput,
		titleInput,
		subheadingInput,
		introInput,
		namePreview,
		titlePreview,
		subheadingPreview,
		introPreview,
		skillsPreview,
		previewArea,
		profileCard
	} = App.elements;

	const name = nameInput.value.trim();
	const title = titleInput.value.trim();
	const subheading = subheadingInput.value.trim();
	const intro = introInput.value.trim();
	const skills = getSkillsArray();

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
	subheadingPreview.style.color = colorState.subheading;
	introPreview.style.color = colorState.intro;

	namePreview.style.fontSize = `${fontSizeState.name}px`;
	titlePreview.style.fontSize = `${fontSizeState.title}px`;
	subheadingPreview.style.fontSize = `${fontSizeState.subheading}px`;
	introPreview.style.fontSize = `${fontSizeState.intro}px`;

	document.querySelectorAll("#skillsPreview span").forEach(skillTag => {
		skillTag.style.color = colorState.skills;
		skillTag.style.background = colorState.skills_outer;
		skillTag.style.fontSize = `${fontSizeState.skills}px`;
	});

	renderContactLinks();

	previewArea.style.background = colorState.background;
	profileCard.style.background = colorState.card;

	updateFontSizeInputs();
}