import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getTheme } from '$lib/themes';

function createThemeStore() {
	const STORAGE_KEY = 'selected-theme';
	const defaultTheme = 'default';

	// Initialize from localStorage if available
	const initialTheme = browser ? localStorage.getItem(STORAGE_KEY) || defaultTheme : defaultTheme;

	const { subscribe, set } = writable<string>(initialTheme);

	return {
		subscribe,
		set: (themeName: string) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, themeName);
			}
			set(themeName);
		}
	};
}

export const currentTheme = createThemeStore();

// Apply theme to document root
if (browser) {
	currentTheme.subscribe((themeName) => {
		const theme = getTheme(themeName);
		const root = document.documentElement;
		Object.entries(theme.colors).forEach(([key, value]) => {
			root.style.setProperty(`--color-${key}`, value);
		});
	});
}
