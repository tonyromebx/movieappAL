module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	setupFiles: ['raf/polyfill'],
	setupFilesAfterEnv: ['./testUtils/setupTestFrameworkScript.js'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	testRegex: '/__tests__/.*(.test.)jsx?$',
	coverageReporters: ['text', 'html'],
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/build/**',
		'!**/*.config.js',
		'!**/coverage/**',
		'!testUtils/**',
		'!src/router/router.jsx',
		'!src/index.js'
	],
	moduleNameMapper: {
		'\\.(css|scss)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
			'<rootDir>/testUtils/fileMock.js',
	},
	transform: {
		'^.+\\.jsx?$': 'babel-jest'
	},
};
