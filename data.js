window.PortfolioData = {
	defaultProfile: {
        subheading: "Personal Portfolio",
		name: "你的姓名",
		title: "你的身分 / 標題",
		intro: "這裡會顯示你的自我介紹",
		skills: ["技能1", "技能2", "技能3", "技能4"]
	},

	colorState: {
        subheading: "#777777",
		name: "#222222",
		title: "#555555",
		intro: "#444444",
		skills: "#222222",
		skills_outer: "#f1f3f5",
		background: "#dfe9f3",
		card: "#ffffff"
	},

	colorTargetNames: {
        subheading: "小標",
		name: "姓名",
		title: "身分 / 標題",
		intro: "自我介紹",
		skills: "技能字體顏色",
		skills_outer: "技能外框顏色",
		background: "背景顏色",
		card: "卡片顏色",
		avatar_background: "頭像底色",
		avatar_text: "頭像字體顏色"
	},

	fontSizeState: {
        subheading: 22,
		name: 44,
		title: 24,
		intro: 17,
		skills: 14
	},

	fontSizeLimit: {
        subheading: { min: 0, max: 999 },
		name: { min: 0, max: 999 },
		title: { min: 0, max: 999 },
		intro: { min: 0, max: 999 },
		skills: { min: 0, max: 999 }
	},

	contactFields: [
		{
			key: "email",
			label: "Email",
			type: "email",
			placeholder: "example@gmail.com",
			hrefPrefix: "mailto:",
			openNewTab: false
		},
		{
			key: "github",
			label: "GitHub",
			type: "url",
			placeholder: "https://github.com/username",
			hrefPrefix: "",
			openNewTab: true
		},
		{
			key: "linkedin",
			label: "LinkedIn",
			type: "url",
			placeholder: "https://linkedin.com/in/username",
			hrefPrefix: "",
			openNewTab: true
		},
		{
			key: "website",
			label: "個人網站",
			type: "url",
			placeholder: "https://example.com",
			hrefPrefix: "",
			openNewTab: true
		}
	],

	contactState: {
		email: {
			enabled: false,
			value: ""
		},
		github: {
			enabled: false,
			value: ""
		},
		linkedin: {
			enabled: false,
			value: ""
		},
		website: {
			enabled: false,
			value: ""
		},
		customLinks: []
	},

	avatarState: {
		mode: "initial", // initial = 姓氏, photo = 照片
		imageData: "",
		size: 150,
		backgroundColor: "#222222",
		textColor: "#ffffff",
		fontSize: 60
	},

	avatarSizeLimit: {
		size: { min: 40, max: 300 },
		fontSize: { min: 10, max: 160 }
	},

	colorArray: [
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
	],

    editorFields: [
        {
			key: "subheading",
			label: "小標",
			type: "text",
			inputId: "subheadingInput",
			sizeInputId: "subheadingSizeInput",
			hasColor: true,
			hasSize: true,
			defaultSize: 22,
			minSize: 0,
			maxSize: 999
		},
		{
			key: "name",
			label: "姓名",
			type: "text",
			inputId: "nameInput",
			sizeInputId: "nameSizeInput",
			hasColor: true,
			hasSize: true,
			defaultSize: 44,
			minSize: 0,
			maxSize: 999
		},
		{
			key: "title",
			label: "身分 / 標題",
			type: "text",
			inputId: "titleInput",
			sizeInputId: "titleSizeInput",
			hasColor: true,
			hasSize: true,
			defaultSize: 24,
			minSize: 0,
			maxSize: 999
		},
		{
			key: "intro",
			label: "自我介紹",
			type: "textarea",
			inputId: "introInput",
			sizeInputId: "introSizeInput",
			rows: 6,
			hasColor: true,
			hasSize: true,
			defaultSize: 17,
			minSize: 0,
			maxSize: 999
		},
		{
			key: "skills",
			label: "技能",
			type: "skills",
			inputId: "skillsInput",
			sizeInputId: "skillsSizeInput",
			hasColor: true,
			hasOuterColor: true,
			hasSize: true,
			defaultSize: 14,
			minSize: 0,
			maxSize: 999
		}
	],

	globalControls: [
		{
			key: "background",
			label: "背景顏色"
		},
		{
			key: "card",
			label: "卡片顏色"
		}
	]
};