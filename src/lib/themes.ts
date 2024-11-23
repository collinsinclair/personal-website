export interface Theme {
	name: string;
	label: string;
	colors: {
		background: string;
		text: string;
		primary: string; // For prompt
		secondary: string; // For commands
		success: string;
		error: string;
		info: string;
	};
}

export const themes: Theme[] = [
	{
		name: 'default',
		label: 'Default Dark',
		colors: {
			background: '#000000',
			text: '#f0f0f0',
			primary: '#00ff00',
			secondary: '#0000ff',
			success: '#00ff00',
			error: '#ff0000',
			info: '#00ffff'
		}
	},
	{
		name: 'matrix',
		label: 'Matrix',
		colors: {
			background: '#0D0208',
			text: '#00ff41',
			primary: '#00ff41',
			secondary: '#008F11',
			success: '#00ff41',
			error: '#FF0000',
			info: '#003B00'
		}
	},
	{
		name: 'sunset',
		label: 'Sunset',
		colors: {
			background: '#282828',
			text: '#FDF4DC',
			primary: '#FF8E7F',
			secondary: '#FFB4A2',
			success: '#B5E8E0',
			error: '#FF5C5C',
			info: '#F6BD60'
		}
	},
	{
		name: 'solarized-light',
		label: 'Solarized Light',
		colors: {
			background: '#FDF6E3',
			text: '#657B83',
			primary: '#268BD2',
			secondary: '#2AA198',
			success: '#859900',
			error: '#DC322F',
			info: '#B58900'
		}
	},
	{
		name: 'solarized-dark',
		label: 'Solarized Dark',
		colors: {
			background: '#002B36',
			text: '#839496',
			primary: '#268BD2',
			secondary: '#2AA198',
			success: '#859900',
			error: '#DC322F',
			info: '#B58900'
		}
	},
	{
		name: 'monokai',
		label: 'Monokai',
		colors: {
			background: '#272822',
			text: '#F8F8F2',
			primary: '#A6E22E',
			secondary: '#66D9EF',
			success: '#A6E22E',
			error: '#F92672',
			info: '#AE81FF'
		}
	},
	{
		name: 'nord',
		label: 'Nord',
		colors: {
			background: '#2E3440',
			text: '#D8DEE9',
			primary: '#81A1C1',
			secondary: '#88C0D0',
			success: '#A3BE8C',
			error: '#BF616A',
			info: '#5E81AC'
		}
	},
	{
		name: 'dracula',
		label: 'Dracula',
		colors: {
			background: '#282A36',
			text: '#F8F8F2',
			primary: '#BD93F9',
			secondary: '#50FA7B',
			success: '#50FA7B',
			error: '#FF5555',
			info: '#8BE9FD'
		}
	},
	{
		name: 'github-light',
		label: 'GitHub Light',
		colors: {
			background: '#FFFFFF',
			text: '#24292E',
			primary: '#0366D6',
			secondary: '#6A737D',
			success: '#28A745',
			error: '#D73A49',
			info: '#005CC5'
		}
	},
	{
		name: 'github-dark',
		label: 'GitHub Dark',
		colors: {
			background: '#0D1117',
			text: '#C9D1D9',
			primary: '#58A6FF',
			secondary: '#8B949E',
			success: '#238636',
			error: '#F85149',
			info: '#1F6FEB'
		}
	},
	{
		name: 'gruvbox-light',
		label: 'Gruvbox Light',
		colors: {
			background: '#FBF1C7',
			text: '#3C3836',
			primary: '#689D6A',
			secondary: '#458588',
			success: '#98971A',
			error: '#CC241D',
			info: '#D79921'
		}
	},
	{
		name: 'gruvbox-dark',
		label: 'Gruvbox Dark',
		colors: {
			background: '#282828',
			text: '#EBDBB2',
			primary: '#458588',
			secondary: '#83A598',
			success: '#B8BB26',
			error: '#FB4934',
			info: '#FABD2F'
		}
	},
	{
		name: 'pastel',
		label: 'Pastel',
		colors: {
			background: '#F4F1DE',
			text: '#3A3A3A',
			primary: '#E07A5F',
			secondary: '#81B29A',
			success: '#F2CC8F',
			error: '#EF476F',
			info: '#118AB2'
		}
	},
	{
		name: 'cyberpunk',
		label: 'Cyberpunk',
		colors: {
			background: '#000000',
			text: '#FF00FF',
			primary: '#FF0090',
			secondary: '#00FFFF',
			success: '#39FF14',
			error: '#FF3131',
			info: '#8D00FF'
		}
	},
	{
		name: 'oceanic',
		label: 'Oceanic',
		colors: {
			background: '#1B2B34',
			text: '#D8DEE9',
			primary: '#6699CC',
			secondary: '#99C794',
			success: '#5FB3B3',
			error: '#EC5f67',
			info: '#C594C5'
		}
	},
	{
		name: 'hacker',
		label: 'Hacker',
		colors: {
			background: '#1F1F1F',
			text: '#00FF00',
			primary: '#00FF00',
			secondary: '#007F00',
			success: '#00FF00',
			error: '#FF0000',
			info: '#00FF7F'
		}
	},
	{
		name: 'forest',
		label: 'Forest',
		colors: {
			background: '#0B3D0B',
			text: '#DFFFD6',
			primary: '#228B22',
			secondary: '#6B8E23',
			success: '#7CFC00',
			error: '#FF4500',
			info: '#2E8B57'
		}
	},
	{
		name: 'desert',
		label: 'Desert',
		colors: {
			background: '#C19A6B',
			text: '#5B4636',
			primary: '#DEB887',
			secondary: '#F4A460',
			success: '#FFD700',
			error: '#A52A2A',
			info: '#CD853F'
		}
	},
	{
		name: 'midnight',
		label: 'Midnight',
		colors: {
			background: '#121212',
			text: '#E0E0E0',
			primary: '#6200EA',
			secondary: '#BB86FC',
			success: '#03DAC6',
			error: '#CF6679',
			info: '#BB86FC'
		}
	},
	{
		name: 'retro',
		label: 'Retro',
		colors: {
			background: '#FDF6E3',
			text: '#586E75',
			primary: '#CB4B16',
			secondary: '#2AA198',
			success: '#859900',
			error: '#DC322F',
			info: '#B58900'
		}
	},
	{
		name: 'aqua',
		label: 'Aqua',
		colors: {
			background: '#E0FFFF',
			text: '#2E8B57',
			primary: '#4682B4',
			secondary: '#5F9EA0',
			success: '#3CB371',
			error: '#CD5C5C',
			info: '#20B2AA'
		}
	},
	{
		name: 'neon',
		label: 'Neon',
		colors: {
			background: '#1A1A1A',
			text: '#E0FF4F',
			primary: '#FF0266',
			secondary: '#40C4FF',
			success: '#69F0AE',
			error: '#FF1744',
			info: '#00E5FF'
		}
	},
	{
		name: 'berry',
		label: 'Berry',
		colors: {
			background: '#4B0082',
			text: '#FFDAB9',
			primary: '#8A2BE2',
			secondary: '#BA55D3',
			success: '#DA70D6',
			error: '#FF69B4',
			info: '#9932CC'
		}
	},
	{
		name: 'lava',
		label: 'Lava',
		colors: {
			background: '#3B0B0B',
			text: '#F8E0E0',
			primary: '#FF4500',
			secondary: '#FF6347',
			success: '#FF7F50',
			error: '#8B0000',
			info: '#CD5C5C'
		}
	},
	{
		name: 'polar',
		label: 'Polar',
		colors: {
			background: '#EAF6F6',
			text: '#034748',
			primary: '#00A896',
			secondary: '#02C39A',
			success: '#028090',
			error: '#05668D',
			info: '#0288D1'
		}
	},
	{
		name: 'spring',
		label: 'Spring',
		colors: {
			background: '#FAFAD2',
			text: '#556B2F',
			primary: '#98FB98',
			secondary: '#FFD700',
			success: '#ADFF2F',
			error: '#FF6347',
			info: '#FFDAB9'
		}
	}
];

export function getTheme(name: string): Theme {
	return themes.find((t) => t.name === name) || themes[0];
}
