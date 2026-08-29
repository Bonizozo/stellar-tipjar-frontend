const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const { flattenKeys, auditCatalog, auditAllCatalogs } = require("./check-locale-catalogs");

const SCRIPT = path.join(__dirname, "check-locale-catalogs.js");

const MESSAGES_DIR = path.join(__dirname, "..", "messages");

describe("check-locale-catalogs", () => {
  describe("flattenKeys", () => {
    it("flattens a nested catalog into dotted keys", () => {
      const catalog = { nav: { home: "Home", sub: { x: "X" } }, common: { welcome: "Hi" } };
      expect(flattenKeys(catalog).sort()).toEqual([
        "common.welcome",
        "nav.home",
        "nav.sub.x",
      ]);
    });

    it("treats arrays as leaf values", () => {
      expect(flattenKeys({ list: ["a", "b"] })).toEqual(["list"]);
    });
  });

  describe("auditCatalog", () => {
    const source = { common: { welcome: "Hi" }, nav: { home: "Home", about: "About" } };

    it("finds keys present in the source but missing in the catalog", () => {
      const catalog = { common: { welcome: "Salut" }, nav: { home: "Accueil" } };
      const { missing, extra } = auditCatalog(source, catalog);
      expect(missing).toEqual(["nav.about"]);
      expect(extra).toEqual([]);
    });

    it("reports keys in the catalog that the source does not define", () => {
      const catalog = {
        common: { welcome: "Salut" },
        nav: { home: "Accueil", about: "Ã€ propos", settings: "RÃ©glages" },
      };
      const { missing, extra } = auditCatalog(source, catalog);
      expect(missing).toEqual([]);
      expect(extra).toEqual(["nav.settings"]);
    });
  });

  describe("auditAllCatalogs (messages/)", () => {
    let tmpDir;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "locale-catalogs-"));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it("finds no missing keys in any of the shipped catalogs", () => {
      const results = auditAllCatalogs(MESSAGES_DIR);
      expect(results).toHaveLength(4);
      for (const { locale, missing } of results) {
        expect(missing, `locale ${locale} is missing keys`).toEqual([]);
      }
    });

    it("flags a locale whose key set has drifted from en", () => {
      fs.copyFileSync(path.join(MESSAGES_DIR, "en.json"), path.join(tmpDir, "en.json"));
      fs.copyFileSync(path.join(MESSAGES_DIR, "fr.json"), path.join(tmpDir, "fr.json"));

      const frPath = path.join(tmpDir, "fr.json");
      const fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
      delete fr.nav;
      fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));

      const results = auditAllCatalogs(tmpDir);
      const frResult = results.find((r) => r.locale === "fr");
      expect(frResult).toBeDefined();
      expect(frResult.missing).toEqual([
        "nav.about",
        "nav.achievements",
        "nav.brandName",
        "nav.dashboard",
        "nav.explore",
        "nav.home",
        "nav.marketplace",
        "nav.openMenu",
        "nav.profile",
        "nav.searchPlaceholder",
        "nav.settings",
        "nav.tips",
        "nav.widgets",
      ]);
    });
  });

  describe("main (CLI)", () => {
    function runCli(dir, extraArgs = []) {
      const res = spawnSync(
        process.execPath,
        [SCRIPT, `--dir=${dir}`, ...extraArgs],
        { encoding: "utf8" },
      );
      return { ...res, output: `${res.stdout}\n${res.stderr}` };
    }

    function copyCatalogs(tmpDir, overrides = {}) {
      fs.copyFileSync(path.join(MESSAGES_DIR, "en.json"), path.join(tmpDir, "en.json"));
      for (const [file, mutate] of Object.entries(overrides)) {
        const src = path.join(MESSAGES_DIR, file);
        const dest = path.join(tmpDir, file);
        fs.copyFileSync(src, dest);
        if (mutate) {
          const catalog = JSON.parse(fs.readFileSync(dest, "utf8"));
          mutate(catalog);
          fs.writeFileSync(dest, JSON.stringify(catalog, null, 2));
        }
      }
    }

    it("exits 0 and reports PASS when every locale matches en", () => {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "locale-cli-"));
      try {
        copyCatalogs(tmpDir);
        const res = runCli(tmpDir);
        expect(res.status).toBe(0);
        expect(res.output).toContain("PASS");
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });

    it("exits 1 and reports the missing keys when a catalog drifts", () => {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "locale-cli-"));
      try {
        copyCatalogs(tmpDir, {
          "fr.json": (catalog) => {
            delete catalog.nav;
          },
        });
        const res = runCli(tmpDir);
        expect(res.status).toBe(1);
        expect(res.output).toContain("MISSING  nav.brandName");
        expect(res.output).toContain("FAIL");
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });

    it("warns but exits 0 on orphaned keys, and fails with --strict", () => {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "locale-cli-"));
      try {
        copyCatalogs(tmpDir, {
          "es.json": (catalog) => {
            catalog.nav.orphan = "never used";
          },
        });

        const warn = runCli(tmpDir);
        expect(warn.status).toBe(0);
        expect(warn.output).toContain("EXTRA    nav.orphan");
        expect(warn.output).toContain("WARN");
        expect(warn.output).toContain("PASS");

        const strict = runCli(tmpDir, ["--strict"]);
        expect(strict.status).toBe(1);
        expect(strict.output).toContain("orphaned key(s) present (--strict)");
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });
  });
});
