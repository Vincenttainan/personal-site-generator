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

function createTemplateControls() {
	const container = document.getElementById("templateControlsContainer");

	container.innerHTML = `
		<div class="form-group">
			<details class="editor-accordion">
				<summary class="accordion-title">
					<span>模板套用</span>
					<span class="accordion-icon">＋</span>
				</summary>

				<div class="accordion-content">
					<div class="template-grid">
						${templates.map(template => `
							<button 
								type="button" 
								class="template-btn" 
								data-template-id="${template.id}"
							>
								<span class="template-name">${template.name}</span>
								<span class="template-desc">${template.description}</span>

								<span class="template-colors">
									<span style="background: ${template.colors.background};"></span>
									<span style="background: ${template.colors.card};"></span>
									<span style="background: ${template.colors.name};"></span>
									<span style="background: ${template.colors.skills_outer};"></span>
								</span>
							</button>
						`).join("")}
					</div>
				</div>
			</details>
		</div>
	`;
}

function createStorageControls() {
	const container = document.getElementById("storageControlsContainer");

	container.innerHTML = `
		<div class="form-group">
			<details class="editor-accordion" open>
				<summary class="accordion-title">
					<span>資料管理</span>
					<span class="accordion-icon">＋</span>
				</summary>

				<div class="accordion-content">
					<div class="storage-actions">
						<button type="button" id="saveProjectBtn" class="storage-btn">儲存目前設定</button>
						<button type="button" id="loadProjectBtn" class="storage-btn">載入儲存設定</button>
						<button type="button" id="clearProjectBtn" class="storage-btn danger">清除儲存設定</button>
					</div>

					<p id="storageMessage" class="storage-message"></p>
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

					<div class="control-row">
						<div class="control-item">
							<span>頭像大小</span>

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

					<div class="avatar-control-section" id="avatarPhotoControls">
						<label for="avatarImageInput">上傳照片</label>
						<input type="file" id="avatarImageInput" accept="image/*">
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

	container.insertAdjacentHTML("beforeend", avatarControlHTML);
}

function getFlashElement(target) {
	const {
		previewArea,
		profileCard,
		avatarPreview,
		namePreview,
		titlePreview,
		subheadingPreview,
		introPreview,
		skillsPreview
	} = App.elements;

	const flashMap = {
		previewArea,
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