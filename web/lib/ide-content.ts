// Content for the hero's live IDE window, as data rather than markup, so the
// terminal is real syntax-highlighted output built from typed tokens instead
// of a wall of raw HTML.

export type Token = {
  text: string;
  cls?:
    | "m" // http method / sql keyword
    | "k" // key / column
    | "s" // string
    | "n" // number
    | "c" // comment
    | "ok" // success
    | "w" // warning
    | "p"; // path / timestamp
};

export type IdeLine = {
  tokens: Token[];
  /** blank spacer line, still counted for line numbers */
  blank?: boolean;
};

export type IdePane = {
  id: "api" | "sql" | "log";
  tabLabel: string;
  ariaLabel: string;
  lines: IdeLine[];
};

const t = (text: string, cls?: Token["cls"]): Token => ({ text, cls });

export const IDE_PANES: IdePane[] = [
  {
    id: "api",
    tabLabel: "api.http",
    ariaLabel: "REST API call",
    lines: [
      { tokens: [t("### Reserve stock across three warehouses", "c")] },
      { tokens: [t("POST", "m"), t(" "), t("/v2/inventory/reservations", "k"), t(" "), t("HTTP/1.1", "p")] },
      { tokens: [t("Host", "k"), t(": api.akiba.tech")] },
      { tokens: [t("Authorization", "k"), t(": Bearer ak_live_••••••••")] },
      { tokens: [t("Idempotency-Key", "k"), t(": "), t("5f2c-91ab-7de4", "s")] },
      { tokens: [], blank: true },
      { tokens: [t("{")] },
      { tokens: [t("  "), t('"sku"', "k"), t(": "), t('"AKB-7741-B"', "s"), t(",")] },
      { tokens: [t("  "), t('"quantity"', "k"), t(": "), t("240", "n"), t(",")] },
      { tokens: [t("  "), t('"warehouse"', "k"), t(": "), t('"EU-WH-03"', "s"), t(",")] },
      { tokens: [t("  "), t('"strategy"', "k"), t(": "), t('"fifo"', "s")] },
      { tokens: [t("}")] },
      { tokens: [], blank: true },
      { tokens: [t("HTTP/1.1 201 Created", "ok"), t("  "), t("// 38ms, 1 write, 0 retries", "c")] },
      { tokens: [t("{ "), t('"reservation_id"', "k"), t(": "), t('"rsv_8fd12c"', "s"), t(", "), t('"committed"', "k"), t(": "), t("240", "n"), t(" }")] },
    ],
  },
  {
    id: "sql",
    tabLabel: "2026_09_17_stock_ledger.sql",
    ariaLabel: "Database schema migration",
    lines: [
      { tokens: [t("-- migration 2026_09_17_stock_ledger, applied online", "c")] },
      { tokens: [t("BEGIN", "m"), t(";")] },
      { tokens: [], blank: true },
      { tokens: [t("ALTER TABLE", "m"), t(" stock_ledger")] },
      { tokens: [t("  "), t("ADD COLUMN", "m"), t(" "), t("reconciled_at", "k"), t(" "), t("TIMESTAMPTZ", "p"), t(",")] },
      { tokens: [t("  "), t("ADD COLUMN", "m"), t(" "), t("source_ref", "k"), t("    "), t("VARCHAR(64)", "p"), t(" "), t("NOT NULL", "m"), t(";")] },
      { tokens: [], blank: true },
      { tokens: [t("CREATE INDEX CONCURRENTLY", "m"), t(" idx_ledger_wh_sku")] },
      { tokens: [t("  "), t("ON", "m"), t(" stock_ledger ("), t("warehouse_id", "k"), t(", "), t("sku", "k"), t(", "), t("recorded_at", "k"), t(" "), t("DESC", "m"), t(");")] },
      { tokens: [], blank: true },
      { tokens: [t("CREATE UNIQUE INDEX", "m"), t(" idx_ledger_idem")] },
      { tokens: [t("  "), t("ON", "m"), t(" stock_ledger ("), t("source_ref", "k"), t(");")] },
      { tokens: [], blank: true },
      { tokens: [t("COMMIT", "m"), t(";")] },
      { tokens: [t("-- 4 statements, 0 rows locked, 812ms, zero downtime", "ok")] },
    ],
  },
  {
    id: "log",
    tabLabel: "ledger-sync.log",
    ariaLabel: "Live ledger sync log",
    lines: [
      { tokens: [t("12:04:11.204", "p"), t("  "), t("INFO", "k"), t("  sync.worker   pulling delta from EU-WH-03")] },
      { tokens: [t("12:04:11.240", "p"), t("  "), t("INFO", "k"), t("  sync.worker   1,482 movements across 96 SKUs")] },
      { tokens: [t("12:04:11.318", "p"), t("  "), t("INFO", "k"), t("  ledger.match  matched 1,482 of 1,482 against POS")] },
      { tokens: [t("12:04:11.402", "p"), t("  "), t("WARN", "w"), t("  reorder.rule  AKB-2210-A below reorder point (18)")] },
      { tokens: [t("12:04:11.403", "p"), t("  "), t("INFO", "k"), t("  reorder.rule  drafted PO-40117 for supplier NORDIC-4")] },
      { tokens: [t("12:04:11.486", "p"), t("  "), t("INFO", "k"), t("  fx.rates      EUR/SEK locked at close, 11.4182")] },
      { tokens: [t("12:04:11.511", "p"), t("  "), t("OK", "ok"), t("    ledger.close  variance 0.00 EUR, books balanced")] },
      { tokens: [t("12:04:11.512", "p"), t("  "), t("OK", "ok"), t("    health        p95 41ms, 3 nodes, no queue backlog")] },
      { tokens: [], blank: true },
      { tokens: [t("-- watching. next delta in 14s", "c")] },
    ],
  },
];
