
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(site)" | "/(protected)" | "/" | "/(protected)/admin" | "/(protected)/admin/organizations" | "/(protected)/admin/organizations/_components" | "/(protected)/admin/settings" | "/(protected)/admin/settings/_components" | "/(protected)/admin/settings/account" | "/(protected)/admin/settings/api-keys" | "/(protected)/admin/settings/members" | "/(protected)/admin/settings/plugins" | "/(protected)/admin/settings/roles" | "/api" | "/api/instance-settings" | "/api/invitations" | "/api/invitations/[id]" | "/api/invitations/[id]/accept" | "/api/invitations/[id]/reject" | "/api/seed-blog" | "/api/settings" | "/api/settings/api-keys" | "/api/settings/api-keys/[id]" | "/api/[...slug]" | "/(site)/author" | "/(site)/author/[slug]" | "/(site)/blog" | "/(site)/blog/[slug]" | "/god-mode" | "/god-mode/_components" | "/god-mode/organizations" | "/invitations" | "/invite" | "/invite/[token]" | "/login" | "/mcp" | "/media" | "/media/[id]" | "/media/[id]/[filename]" | "/reset-password" | "/reset-password/[token]" | "/robots.txt" | "/sitemap.xml" | "/(site)/tag" | "/(site)/tag/[slug]" | "/verify-email" | "/(site)/[slug]";
		RouteParams(): {
			"/api/invitations/[id]": { id: string };
			"/api/invitations/[id]/accept": { id: string };
			"/api/invitations/[id]/reject": { id: string };
			"/api/settings/api-keys/[id]": { id: string };
			"/api/[...slug]": { slug: string };
			"/(site)/author/[slug]": { slug: string };
			"/(site)/blog/[slug]": { slug: string };
			"/invite/[token]": { token: string };
			"/media/[id]": { id: string };
			"/media/[id]/[filename]": { id: string; filename: string };
			"/reset-password/[token]": { token: string };
			"/(site)/tag/[slug]": { slug: string };
			"/(site)/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/(site)": { slug?: string };
			"/(protected)": Record<string, never>;
			"/": { id?: string; slug?: string; token?: string; filename?: string };
			"/(protected)/admin": Record<string, never>;
			"/(protected)/admin/organizations": Record<string, never>;
			"/(protected)/admin/organizations/_components": Record<string, never>;
			"/(protected)/admin/settings": Record<string, never>;
			"/(protected)/admin/settings/_components": Record<string, never>;
			"/(protected)/admin/settings/account": Record<string, never>;
			"/(protected)/admin/settings/api-keys": Record<string, never>;
			"/(protected)/admin/settings/members": Record<string, never>;
			"/(protected)/admin/settings/plugins": Record<string, never>;
			"/(protected)/admin/settings/roles": Record<string, never>;
			"/api": { id?: string; slug?: string };
			"/api/instance-settings": Record<string, never>;
			"/api/invitations": { id?: string };
			"/api/invitations/[id]": { id: string };
			"/api/invitations/[id]/accept": { id: string };
			"/api/invitations/[id]/reject": { id: string };
			"/api/seed-blog": Record<string, never>;
			"/api/settings": { id?: string };
			"/api/settings/api-keys": { id?: string };
			"/api/settings/api-keys/[id]": { id: string };
			"/api/[...slug]": { slug: string };
			"/(site)/author": { slug?: string };
			"/(site)/author/[slug]": { slug: string };
			"/(site)/blog": { slug?: string };
			"/(site)/blog/[slug]": { slug: string };
			"/god-mode": Record<string, never>;
			"/god-mode/_components": Record<string, never>;
			"/god-mode/organizations": Record<string, never>;
			"/invitations": Record<string, never>;
			"/invite": { token?: string };
			"/invite/[token]": { token: string };
			"/login": Record<string, never>;
			"/mcp": Record<string, never>;
			"/media": { id?: string; filename?: string };
			"/media/[id]": { id: string; filename?: string };
			"/media/[id]/[filename]": { id: string; filename: string };
			"/reset-password": { token?: string };
			"/reset-password/[token]": { token: string };
			"/robots.txt": Record<string, never>;
			"/sitemap.xml": Record<string, never>;
			"/(site)/tag": { slug?: string };
			"/(site)/tag/[slug]": { slug: string };
			"/verify-email": Record<string, never>;
			"/(site)/[slug]": { slug: string }
		};
		Pathname(): "/" | "/admin" | "/admin/organizations" | "/admin/settings" | "/admin/settings/account" | "/admin/settings/api-keys" | "/admin/settings/members" | "/admin/settings/plugins" | "/admin/settings/roles" | "/api/instance-settings" | "/api/invitations" | `/api/invitations/${string}/accept` & {} | `/api/invitations/${string}/reject` & {} | "/api/seed-blog" | "/api/settings/api-keys" | `/api/settings/api-keys/${string}` & {} | `/api/${string}` & {} | `/author/${string}` & {} | "/blog" | `/blog/${string}` & {} | "/god-mode" | "/god-mode/organizations" | "/invitations" | `/invite/${string}` & {} | "/login" | "/mcp" | `/media/${string}/${string}` & {} | `/reset-password/${string}` & {} | "/robots.txt" | "/sitemap.xml" | `/tag/${string}` & {} | "/verify-email" | `/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/aphex-darkmode.png" | "/images/aphex-lightmode.png" | "/robots.txt" | "/uploads/scheming-villain-emoticon-rubbing-his-600nw-1194509842.webp" | string & {};
	}
}