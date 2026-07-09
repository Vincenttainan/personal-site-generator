function renderSkillControls() {
	const container = document.getElementById("skillsEditorList");

	if (!container) return;

	container.innerHTML = getRawSkillsArray()
		.map((skill, index) => createSkillItemHTML(skill, index))
		.join("");

	bindSkillItemEvents();
}

function createSkillItemHTML(skill, index) {
	return `
		<div class="skill-editor-item" data-skill-index="${index}">
			<input 
				type="text" 
				class="skill-value-input"
				data-skill-index="${index}"
				value="${skill}"
				placeholder="輸入技能名稱"
			>

			<button 
				type="button" 
				class="remove-skill-btn"
				data-skill-index="${index}"
			>
				移除
			</button>
		</div>
	`;
}

function bindSkillEvents() {
	const addSkillBtn = document.getElementById("addSkillBtn");

	if (addSkillBtn) {
		addSkillBtn.addEventListener("click", addSkill);
	}

	renderSkillControls();
}

function bindSkillItemEvents() {
	const skillInputs = document.querySelectorAll(".skill-value-input");
	const removeButtons = document.querySelectorAll(".remove-skill-btn");

	skillInputs.forEach(input => {
		input.addEventListener("input", () => {
			const index = Number(input.dataset.skillIndex);

			if (Number.isNaN(index)) return;

			defaultProfile.skills[index] = input.value;

			renderPreview();
		});
	});

	removeButtons.forEach(button => {
		button.addEventListener("click", () => {
			const index = Number(button.dataset.skillIndex);

			if (Number.isNaN(index)) return;

			removeSkill(index);
		});
	});
}

function addSkill() {
	defaultProfile.skills.push("");

	renderSkillControls();
	renderPreview();
}

function removeSkill(index) {
	defaultProfile.skills.splice(index, 1);

	renderSkillControls();
	renderPreview();
}

function getRawSkillsArray() {
	if (Array.isArray(defaultProfile.skills)) {
		return defaultProfile.skills;
	}

	if (typeof defaultProfile.skills === "string") {
		defaultProfile.skills = defaultProfile.skills
			.split(",")
			.map(skill => skill.trim())
			.filter(skill => skill !== "");

		return defaultProfile.skills;
	}

	defaultProfile.skills = [];

	return defaultProfile.skills;
}

function getSkillsArray() {
	return getRawSkillsArray()
		.map(skill => skill.trim())
		.filter(skill => skill !== "");
}