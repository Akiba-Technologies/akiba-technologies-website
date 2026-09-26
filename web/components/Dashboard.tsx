// A static, data-driven rendering of the Akiba ERP dual-pane dashboard.
// Reused on the home page spotlight and the portfolio's featured case with
// different rows and columns, instead of two copies of the same markup.

export type StockRow = {
  sku: string;
  site?: string;
  onHand: string;
  coverPct: number;
  coverState?: "ok" | "low" | "crit";
  bin?: string;
};

export type KeyValue = { k: string; v: string; ok?: boolean };

export type Column = "sku" | "site" | "onHand" | "cover" | "bin";

const COLUMN_LABEL: Record<Column, string> = {
  sku: "SKU",
  site: "Site",
  onHand: "On hand",
  cover: "Cover",
  bin: "Bin",
};

export function Dashboard({
  breadcrumb,
  cornerTag,
  columns,
  rows,
  kvs,
  sparkline,
  className = "",
}: {
  breadcrumb: string;
  cornerTag: string;
  columns: Column[];
  rows: StockRow[];
  kvs: KeyValue[];
  sparkline: number[];
  className?: string;
}) {
  return (
    <div
      className={`dash ${className}`.trim()}
      role="img"
      aria-label="Akiba ERP dashboard showing stock levels, cover and live sync status"
    >
      <div className="dash-bar">
        <span>Akiba ERP</span>
        <span className="dim">{breadcrumb}</span>
        <span className="dash-live">
          <span className="dot" aria-hidden="true" />
          Synced
        </span>
      </div>

      <div className="dash-body">
        <div className="dash-main">
          <div className="dash-h">
            <span className="tag">Stock on hand</span>
            <span className="tag tag-em">{cornerTag}</span>
          </div>
          <table className="dash-tbl">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c}>{COLUMN_LABEL[c]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {columns.map((c) => {
                    if (c === "cover") {
                      const stateCls = row.coverState && row.coverState !== "ok" ? ` ${row.coverState}` : "";
                      return (
                        <td key={c}>
                          <span className={`bar${stateCls}`}>
                            <i style={{ width: `${row.coverPct}%` }} />
                          </span>
                        </td>
                      );
                    }
                    const isText = c === "sku" || c === "site" || c === "bin";
                    const value = c === "sku" ? row.sku : c === "site" ? row.site : c === "bin" ? row.bin : row.onHand;
                    return (
                      <td key={c} className={isText ? "sku" : undefined}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dash-side">
          <span className="tag">Ledger status</span>
          <div className="spark" aria-hidden="true">
            {sparkline.map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          {kvs.map((kv) => (
            <div className="kv" key={kv.k}>
              <span className="k">{kv.k}</span>
              <span className={`v${kv.ok ? " ok" : ""}`}>{kv.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
