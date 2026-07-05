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

const templates = window.PortfolioTemplates || [];

const App = {
	elements: {},
	currentColorTarget: null,
	avatarFileBlob: null,
	avatarFileExtension: "png"
};