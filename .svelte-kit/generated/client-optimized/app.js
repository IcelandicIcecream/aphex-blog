export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26')
];

export const server_loads = [2,3,4,5];

export const dictionary = {
		"/": [6],
		"/(protected)/admin": [~7,[2]],
		"/(protected)/admin/organizations": [~8,[2]],
		"/(protected)/admin/settings": [~9,[2,3]],
		"/(protected)/admin/settings/account": [~10,[2,3]],
		"/(protected)/admin/settings/api-keys": [~11,[2,3]],
		"/(protected)/admin/settings/members": [~12,[2,3]],
		"/(protected)/admin/settings/plugins": [13,[2,3]],
		"/(protected)/admin/settings/roles": [~14,[2,3]],
		"/(site)/author/[slug]": [~16,[4]],
		"/(site)/blog": [~17,[4]],
		"/(site)/blog/[slug]": [~18,[4]],
		"/god-mode": [~20,[5]],
		"/god-mode/organizations": [~21,[5]],
		"/invitations": [~22],
		"/invite/[token]": [~23],
		"/login": [~24],
		"/reset-password/[token]": [~25],
		"/(site)/tag/[slug]": [~19,[4]],
		"/verify-email": [26],
		"/(site)/[slug]": [~15,[4]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';