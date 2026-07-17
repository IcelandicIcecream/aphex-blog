import { r as __exportAll } from "./rolldown-runtime.js";
import { n as private_env } from "./shared-server.js";
import { t as building } from "./environment.js";
import { dirname, resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { applyRecommendedPragmas, createSQLiteProvider } from "@aphexcms/sqlite-adapter";
import { assets, documentReferences, documentStatuses, documentVersions, documents, instanceSettings, invitations, organizationMembers, organizations, pluginSettings, roles, schemaTypeKinds, schemaTypes, userProfiles, userSessions, versionEvents } from "@aphexcms/sqlite-adapter/schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
//#region src/lib/server/db/cms-schema.ts
var cms_schema_exports = /* @__PURE__ */ __exportAll({
	assets: () => assets,
	documentReferences: () => documentReferences,
	documentStatuses: () => documentStatuses,
	documentVersions: () => documentVersions,
	documents: () => documents,
	instanceSettings: () => instanceSettings,
	invitations: () => invitations,
	organizationMembers: () => organizationMembers,
	organizations: () => organizations,
	pluginSettings: () => pluginSettings,
	roles: () => roles,
	schemaTypeKinds: () => schemaTypeKinds,
	schemaTypes: () => schemaTypes,
	userProfiles: () => userProfiles,
	userSessions: () => userSessions,
	versionEvents: () => versionEvents
});
//#endregion
//#region src/lib/server/db/auth-schema.ts
var auth_schema_exports = /* @__PURE__ */ __exportAll({
	account: () => account,
	apikey: () => apikey,
	session: () => session,
	user: () => user,
	verification: () => verification
});
var timestamp = (name) => integer(name, { mode: "timestamp_ms" });
var boolean = (name) => integer(name, { mode: "boolean" });
var user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
var session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp("updated_at").$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
});
var account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp("updated_at").$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
var verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
var apikey = sqliteTable("apikey", {
	id: text("id").primaryKey(),
	configId: text("config_id").notNull().default("default"),
	name: text("name"),
	start: text("start"),
	prefix: text("prefix"),
	key: text("key").notNull(),
	referenceId: text("reference_id").notNull(),
	refillInterval: integer("refill_interval"),
	refillAmount: integer("refill_amount"),
	lastRefillAt: timestamp("last_refill_at"),
	enabled: boolean("enabled").default(true),
	rateLimitEnabled: boolean("rate_limit_enabled").default(true),
	rateLimitTimeWindow: integer("rate_limit_time_window").default(864e5),
	rateLimitMax: integer("rate_limit_max").default(1e4),
	requestCount: integer("request_count").default(0),
	remaining: integer("remaining"),
	lastRequest: timestamp("last_request"),
	expiresAt: timestamp("expires_at"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	permissions: text("permissions"),
	metadata: text("metadata")
});
//#endregion
//#region src/lib/server/db/index.ts
var schema = {
	...cms_schema_exports,
	...auth_schema_exports
};
var SLOW_QUERY_THRESHOLD_MS = parseInt(private_env.SLOW_QUERY_MS || "100");
var SlowQueryLogger = class {
	logQuery(query, _params) {
		const start = performance.now();
		queueMicrotask(() => {
			const duration = performance.now() - start;
			if (duration >= SLOW_QUERY_THRESHOLD_MS) {
				const truncatedQuery = query.length > 200 ? query.slice(0, 200) + "..." : query;
				console.warn(`[SLOW QUERY] ${duration.toFixed(1)}ms — ${truncatedQuery}`);
			}
		});
	}
};
var logger = private_env.ENABLE_QUERY_LOG === "true" ? new SlowQueryLogger() : void 0;
var url = building ? "file::memory:" : private_env.DATABASE_URL || "file:.aphex/blog.db";
if (url.startsWith("file:") && !url.startsWith("file::memory:")) mkdirSync(dirname(resolve(url.slice(5))), { recursive: true });
var client = createClient({
	url,
	authToken: private_env.DATABASE_AUTH_TOKEN
});
if (!building) await applyRecommendedPragmas(client, url);
if (!building) await migrate(drizzle(client), { migrationsFolder: resolve("drizzle") });
var drizzleDb = drizzle(client, {
	schema,
	logger
});
var db = createSQLiteProvider({
	client,
	multiTenancy: { enableHierarchy: false }
}).createAdapter();
//#endregion
export { invitations as a, user as i, drizzleDb as n, organizationMembers as o, apikey as r, organizations as s, db as t };
