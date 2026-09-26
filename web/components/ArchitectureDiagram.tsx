// Static reference architecture diagram. Pure server-rendered SVG; the
// travelling mint traces are CSS animations (see .arch .flow in globals.css),
// so nothing here needs to be a client component.
export function ArchitectureDiagram() {
  return (
    <div className="arch">
      <svg
        viewBox="0 0 900 404"
        role="img"
        aria-label="Architecture diagram: clients connect through an edge layer and API gateway to internal services, which read and write encrypted databases and call third-party APIs."
      >
        <text className="col" x="20" y="22">Clients</text>
        <text className="col" x="256" y="22">Edge</text>
        <text className="col" x="492" y="22">Services</text>
        <text className="col" x="728" y="22">Data</text>

        <path className="wire" d="M186 70 H216 V212 H186" />
        <path className="wire" d="M186 141 H216" />
        <path className="wire" d="M216 141 H250" />
        <path className="flow" d="M60 70 H216 V141 H250" style={{ animationDelay: "0s" }} />
        <path className="flow" d="M60 212 H216 V141 H250" style={{ animationDelay: "1.5s" }} />

        <path className="wire" d="M424 106 H452 V300 H452" />
        <path className="wire" d="M424 176 H452" />
        <path className="wire" d="M452 60 H488 M452 130 H488 M452 200 H488 M452 270 H488" />
        <path className="wire" d="M452 60 V300" />
        <path className="flow" d="M424 176 H452 V60 H488" style={{ animationDelay: ".6s" }} />
        <path className="flow" d="M424 176 H452 V200 H488" style={{ animationDelay: "2.2s" }} />

        <path className="wire" d="M660 60 H690 M660 130 H690 M660 200 H690" />
        <path className="wire" d="M690 60 V230" />
        <path className="wire" d="M690 60 H724 M690 130 H724 M690 230 H724" />
        <path className="flow" d="M660 60 H690 V60 H724" style={{ animationDelay: "1s" }} />
        <path className="flow" d="M660 130 H690 V230 H724" style={{ animationDelay: "2.8s" }} />

        <path className="wire" d="M574 306 V344" />
        <path className="flow" d="M574 270 V344" style={{ animationDelay: "3.4s" }} />

        <g>
          <rect className="box" x="20" y="46" width="166" height="48" rx="9" />
          <text className="lab" x="36" y="68">Web client</text>
          <text className="sub" x="36" y="84">NEXT.JS &bull; SSR</text>
        </g>
        <g>
          <rect className="box" x="20" y="117" width="166" height="48" rx="9" />
          <text className="lab" x="36" y="139">Warehouse scanner</text>
          <text className="sub" x="36" y="155">HANDHELD &bull; OFFLINE QUEUE</text>
        </g>
        <g>
          <rect className="box" x="20" y="188" width="166" height="48" rx="9" />
          <text className="lab" x="36" y="210">Partner integration</text>
          <text className="sub" x="36" y="226">REST &bull; WEBHOOKS</text>
        </g>

        <g>
          <rect className="box" x="256" y="82" width="168" height="48" rx="9" />
          <text className="lab" x="272" y="104">Edge, WAF and CDN</text>
          <text className="sub" x="272" y="120">TLS 1.3 &bull; RATE LIMIT</text>
        </g>
        <g>
          <rect className="box em" x="256" y="152" width="168" height="48" rx="9" />
          <text className="lab" x="272" y="174">API gateway</text>
          <text className="sub" x="272" y="190">AUTH &bull; RBAC &bull; AUDIT</text>
        </g>

        <g>
          <rect className="box em" x="488" y="36" width="172" height="48" rx="9" />
          <text className="lab" x="504" y="58">Inventory service</text>
          <text className="sub" x="504" y="74">STOCK &bull; TRANSFERS</text>
        </g>
        <g>
          <rect className="box em" x="488" y="106" width="172" height="48" rx="9" />
          <text className="lab" x="504" y="128">Ledger service</text>
          <text className="sub" x="504" y="144">POSTINGS &bull; FX LOCK</text>
        </g>
        <g>
          <rect className="box em" x="488" y="176" width="172" height="48" rx="9" />
          <text className="lab" x="504" y="198">Identity service</text>
          <text className="sub" x="504" y="214">SSO &bull; SAML &bull; ROLES</text>
        </g>
        <g>
          <rect className="box em" x="488" y="246" width="172" height="48" rx="9" />
          <text className="lab" x="504" y="268">Automation workers</text>
          <text className="sub" x="504" y="284">QUEUES &bull; SCHEDULES</text>
        </g>

        <g>
          <rect className="box bl" x="724" y="36" width="156" height="48" rx="9" />
          <text className="lab" x="740" y="58">PostgreSQL</text>
          <text className="sub" x="740" y="74">ENCRYPTED AT REST</text>
        </g>
        <g>
          <rect className="box bl" x="724" y="106" width="156" height="48" rx="9" />
          <text className="lab" x="740" y="128">Read replica</text>
          <text className="sub" x="740" y="144">REPORTING LOAD</text>
        </g>
        <g>
          <rect className="box bl" x="724" y="206" width="156" height="48" rx="9" />
          <text className="lab" x="740" y="228">Redis</text>
          <text className="sub" x="740" y="244">CACHE &bull; LOCKS</text>
        </g>

        <g>
          <rect className="box" x="352" y="344" width="444" height="44" rx="9" />
          <text className="lab" x="372" y="365">Third-party APIs</text>
          <text className="sub" x="372" y="380">PAYMENTS &bull; CARRIERS &bull; TAX &bull; EMAIL &bull; ALL EGRESS LOGGED</text>
        </g>
      </svg>

      <div className="arch-key">
        <span><i />Akiba services</span>
        <span><i className="b" />Data stores, encrypted</span>
        <span><i className="g" />Clients and external</span>
        <span>Mint traces show a request in flight</span>
      </div>
    </div>
  );
}
