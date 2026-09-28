"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  type AdminInquiry,
  type AdminProject,
  type InquiryStatus,
  getStoredInquiries,
  saveInquiries,
  getStoredProjects,
  saveProjects,
  getStoredAuth,
  setStoredAuth,
} from "@/lib/admin-store";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Auth inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Navigation
  const [activeTab, setActiveTab] = useState<"overview" | "inquiries" | "projects">("overview");

  // Inquiries State
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState<InquiryStatus | "all">("all");
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);
  const [inquiryNotesEdit, setInquiryNotesEdit] = useState("");

  // Projects State
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectCategory, setProjectCategory] = useState<string>("all");
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<AdminProject> | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    setMounted(true);
    const isAuth = getStoredAuth();
    setAuthenticated(isAuth);
    setInquiries(getStoredInquiries());
    setProjects(getStoredProjects());
  }, []);

  // Update Inquiries helper
  const handleUpdateInquiryStatus = (id: string, newStatus: InquiryStatus) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq));
    setInquiries(updated);
    saveInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
    showToast(`Inquiry status updated to "${newStatus}"`);
  };

  const handleSaveInquiryNotes = () => {
    if (!selectedInquiry) return;
    const updated = inquiries.map((inq) =>
      inq.id === selectedInquiry.id ? { ...inq, notes: inquiryNotesEdit } : inq
    );
    setInquiries(updated);
    saveInquiries(updated);
    setSelectedInquiry({ ...selectedInquiry, notes: inquiryNotesEdit });
    showToast("Notes saved successfully");
  };

  const handleDeleteInquiry = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    saveInquiries(updated);
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
    showToast("Inquiry removed");
  };

  // Update Projects helper
  const handleToggleProjectStatus = (id: string) => {
    const updated = projects.map((p) =>
      p.id === id
        ? {
            ...p,
            status: (p.status === "published" ? "draft" : "published") as "published" | "draft",
          }
        : p
    );
    setProjects(updated);
    saveProjects(updated);
    showToast("Project visibility updated");
  };

  const handleDeleteProject = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
    showToast("Project removed");
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.client) return;

    if (editingProject.id) {
      // Edit existing
      const updated = projects.map((p) => (p.id === editingProject.id ? ({ ...p, ...editingProject } as AdminProject) : p));
      setProjects(updated);
      saveProjects(updated);
      showToast("Case study updated");
    } else {
      // Create new
      const newProj: AdminProject = {
        id: "proj-" + Date.now(),
        slug: editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: editingProject.title,
        client: editingProject.client,
        category: (editingProject.category || "Enterprise ERP") as AdminProject["category"],
        year: editingProject.year || new Date().getFullYear().toString(),
        summary: editingProject.summary || "",
        metricValue: editingProject.metricValue || "Verified",
        metricLabel: editingProject.metricLabel || "System impact",
        stack: Array.isArray(editingProject.stack)
          ? editingProject.stack
          : typeof editingProject.stack === "string"
          ? (editingProject.stack as string).split(",").map((s) => s.trim()).filter(Boolean)
          : ["Next.js", "TypeScript"],
        status: editingProject.status || "published",
      };
      const updated = [newProj, ...projects];
      setProjects(updated);
      saveProjects(updated);
      showToast("New case study created");
    }

    setIsEditingProject(false);
    setEditingProject(null);
  };

  // Export CSV helper
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Subject", "Status", "Date", "Message", "Notes"];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.email.replace(/"/g, '""')}"`,
      `"${inq.subject.replace(/"/g, '""')}"`,
      `"${inq.status}"`,
      `"${new Date(inq.createdAt).toLocaleDateString()}"`,
      `"${inq.message.replace(/"/g, '""')}"`,
      `"${(inq.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `akiba_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Inquiries CSV exported successfully");
  };

  // Auth Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === "admin@akibatech.com" && loginPassword === "akiba2026") {
      setStoredAuth(true);
      setAuthenticated(true);
      setLoginError("");
      showToast("Signed in as Administrator");
    } else {
      setLoginError("Invalid credentials. Please use the demo credentials.");
    }
  };

  const handleDemoFill = () => {
    setLoginEmail("admin@akibatech.com");
    setLoginPassword("akiba2026");
    setStoredAuth(true);
    setAuthenticated(true);
    setLoginError("");
    showToast("Signed in with 1-click Demo credentials");
  };

  const handleLogout = () => {
    setStoredAuth(false);
    setAuthenticated(false);
    showToast("Signed out from Admin Portal");
  };

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.subject.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.message.toLowerCase().includes(inquirySearch.toLowerCase());
      const matchesFilter = inquiryFilter === "all" || inq.status === inquiryFilter;
      return matchesSearch && matchesFilter;
    });
  }, [inquiries, inquirySearch, inquiryFilter]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.client.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.stack.some((s) => s.toLowerCase().includes(projectSearch.toLowerCase()));
      const matchesCategory = projectCategory === "all" || p.category === projectCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, projectSearch, projectCategory]);

  // Analytics Metrics
  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === "new").length;
    const inReview = inquiries.filter((i) => i.status === "in-review").length;
    const contacted = inquiries.filter((i) => i.status === "contacted").length;
    const converted = inquiries.filter((i) => i.status === "converted").length;
    const publishedProjects = projects.filter((p) => p.status === "published").length;
    return { total, newCount, inReview, contacted, converted, publishedProjects };
  }, [inquiries, projects]);

  if (!mounted) {
    return (
      <div className="admin-page admin-loading">
        <div className="admin-spinner" />
        <p>Initializing Akiba Admin Portal...</p>
      </div>
    );
  }

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!authenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-brand">
            <span className="admin-brand-chip">Akiba Admin Console</span>
            <h1>Operations Portal</h1>
            <p>Access client inquiries, manage portfolio case studies, and inspect real-time system metrics.</p>
          </div>

          {loginError && <div className="admin-alert-error">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-form">
            <div className="admin-fgroup">
              <label htmlFor="adm-email">Administrator Email</label>
              <input
                id="adm-email"
                type="email"
                required
                className="admin-input"
                placeholder="admin@akibatech.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="admin-fgroup">
              <label htmlFor="adm-password">Password</label>
              <input
                id="adm-password"
                type="password"
                required
                className="admin-input"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Sign In to Admin Console
            </button>

            <button
              type="button"
              onClick={handleDemoFill}
              className="admin-btn admin-btn-outline"
              style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
            >
              ⚡ Instant Demo Sign-In
            </button>
          </form>

          <div className="admin-demo-box">
            <span className="admin-demo-label">Demo Credentials:</span>
            <code>admin@akibatech.com</code> / <code>akiba2026</code>
          </div>

          <div className="admin-login-foot">
            <Link href="/" className="admin-back-link">
              &larr; Back to Akiba Technologies Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="admin-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="admin-toast">
          <span className="admin-toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="admin-topbar">
        <div className="admin-wrap admin-topbar-inner">
          <div className="admin-brand-section">
            <Link href="/admin" className="admin-brand-logo">
              <span className="admin-logo-mark">A</span>
              <span className="admin-logo-text">Akiba Admin</span>
            </Link>
            <span className="admin-status-indicator">
              <span className="admin-status-pulse" />
              <span>Addis Ababa Pod &bull; 99.98% Uptime</span>
            </span>
          </div>

          <div className="admin-user-section">
            <Link href="/" target="_blank" className="admin-btn admin-btn-ghost admin-btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>View Public Site</span>
            </Link>

            <div className="admin-user-profile">
              <span className="admin-user-avatar">AH</span>
              <div className="admin-user-meta">
                <span className="admin-user-name">Abdulhamid H.</span>
                <span className="admin-user-role">Super Admin</span>
              </div>
            </div>

            <button type="button" onClick={handleLogout} className="admin-btn admin-btn-danger admin-btn-sm" title="Sign out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="admin-wrap admin-main-content">
        {/* Navigation Tabs Bar */}
        <div className="admin-tabs-bar">
          <div className="admin-tabs-list">
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              <span>Overview &amp; Metrics</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "inquiries" ? "active" : ""}`}
              onClick={() => setActiveTab("inquiries")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Client Inquiries</span>
              {stats.newCount > 0 && <span className="admin-tab-badge">{stats.newCount} New</span>}
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span>Portfolio Case Studies</span>
              <span className="admin-tab-count">{projects.length}</span>
            </button>
          </div>

          <div className="admin-tabs-actions">
            {activeTab === "inquiries" && (
              <button type="button" onClick={handleExportCSV} className="admin-btn admin-btn-outline admin-btn-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export CSV</span>
              </button>
            )}

            {activeTab === "projects" && (
              <button
                type="button"
                onClick={() => {
                  setEditingProject({
                    title: "",
                    client: "",
                    category: "Enterprise ERP",
                    year: new Date().getFullYear().toString(),
                    summary: "",
                    metricValue: "99.9%",
                    metricLabel: "System reliability",
                    stack: ["TypeScript", "Next.js", "PostgreSQL"],
                    status: "published",
                  });
                  setIsEditingProject(true);
                }}
                className="admin-btn admin-btn-primary admin-btn-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Add Case Study</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & ANALYTICS                               */}
        {/* ========================================================= */}
        {activeTab === "overview" && (
          <div className="admin-tab-panel">
            {/* KPI Cards */}
            <div className="admin-kpi-grid">
              <div className="admin-card admin-kpi-card">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">Total Inquiries</span>
                  <span className="admin-kpi-icon mint">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                </div>
                <div className="admin-kpi-val">{stats.total}</div>
                <div className="admin-kpi-trend positive">
                  <span>&uarr; 28%</span> vs previous month
                </div>
              </div>

              <div className="admin-card admin-kpi-card">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">Pending Action (New)</span>
                  <span className="admin-kpi-icon cyan">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 14 14" />
                    </svg>
                  </span>
                </div>
                <div className="admin-kpi-val">{stats.newCount}</div>
                <div className="admin-kpi-trend neutral">
                  <span>{stats.inReview}</span> currently in review
                </div>
              </div>

              <div className="admin-card admin-kpi-card">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">Published Case Studies</span>
                  <span className="admin-kpi-icon purple">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </span>
                </div>
                <div className="admin-kpi-val">{stats.publishedProjects}</div>
                <div className="admin-kpi-trend positive">
                  <span>100%</span> active on public portfolio
                </div>
              </div>

              <div className="admin-card admin-kpi-card">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">System SLA Reliability</span>
                  <span className="admin-kpi-icon emerald">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </span>
                </div>
                <div className="admin-kpi-val">99.98%</div>
                <div className="admin-kpi-trend positive">
                  <span>Zero incidents</span> reported (30d)
                </div>
              </div>
            </div>

            {/* Charts & Breakdown Row */}
            <div className="admin-grid-2">
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Lead Pipeline &amp; Inquiries by Status</h3>
                  <span className="admin-badge-subtle">Real-time status</span>
                </div>
                <div className="admin-pipeline-bars">
                  <div className="admin-pipeline-item">
                    <div className="admin-pipe-meta">
                      <span>New / Unread</span>
                      <b>{stats.newCount}</b>
                    </div>
                    <div className="admin-bar-track">
                      <div className="admin-bar-fill cyan" style={{ width: `${(stats.newCount / (stats.total || 1)) * 100}%` }} />
                    </div>
                  </div>

                  <div className="admin-pipeline-item">
                    <div className="admin-pipe-meta">
                      <span>In Review</span>
                      <b>{stats.inReview}</b>
                    </div>
                    <div className="admin-bar-track">
                      <div className="admin-bar-fill amber" style={{ width: `${(stats.inReview / (stats.total || 1)) * 100}%` }} />
                    </div>
                  </div>

                  <div className="admin-pipeline-item">
                    <div className="admin-pipe-meta">
                      <span>Contacted / In Progress</span>
                      <b>{stats.contacted}</b>
                    </div>
                    <div className="admin-bar-track">
                      <div className="admin-bar-fill blue" style={{ width: `${(stats.contacted / (stats.total || 1)) * 100}%` }} />
                    </div>
                  </div>

                  <div className="admin-pipeline-item">
                    <div className="admin-pipe-meta">
                      <span>Converted / Project Signed</span>
                      <b>{stats.converted}</b>
                    </div>
                    <div className="admin-bar-track">
                      <div className="admin-bar-fill mint" style={{ width: `${(stats.converted / (stats.total || 1)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Capabilities Demand Distribution</h3>
                  <span className="admin-badge-subtle">Inquiry Scope</span>
                </div>
                <div className="admin-capabilities-list">
                  <div className="admin-cap-row">
                    <div className="admin-cap-info">
                      <span className="admin-dot mint" />
                      <div>
                        <strong>Enterprise ERP &amp; Offline Systems</strong>
                        <p>Multi-branch synchronization, logistics, POS</p>
                      </div>
                    </div>
                    <span className="admin-cap-pct">45%</span>
                  </div>

                  <div className="admin-cap-row">
                    <div className="admin-cap-info">
                      <span className="admin-dot cyan" />
                      <div>
                        <strong>AI &amp; Machine Learning Solutions</strong>
                        <p>AgriTech forecasting, vision, predictive analytics</p>
                      </div>
                    </div>
                    <span className="admin-cap-pct">30%</span>
                  </div>

                  <div className="admin-cap-row">
                    <div className="admin-cap-info">
                      <span className="admin-dot purple" />
                      <div>
                        <strong>FinTech &amp; High-Concurrency Web</strong>
                        <p>Payment switches, real estate portals</p>
                      </div>
                    </div>
                    <span className="admin-cap-pct">25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Inquiries Preview */}
            <div className="admin-card" style={{ marginTop: 24 }}>
              <div className="admin-card-header">
                <div>
                  <h3>Recent Inquiries</h3>
                  <p className="admin-card-desc">Latest submissions from potential clients and partners</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("inquiries")}
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Subject / Scope</th>
                      <th>Received</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.slice(0, 4).map((inq) => (
                      <tr key={inq.id}>
                        <td>
                          <strong>{inq.name}</strong>
                          <div className="admin-subtext">{inq.email}</div>
                        </td>
                        <td>{inq.subject}</td>
                        <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`admin-pill ${inq.status}`}>{inq.status}</span>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedInquiry(inq);
                              setInquiryNotesEdit(inq.notes || "");
                            }}
                            className="admin-btn admin-btn-ghost admin-btn-xs"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CLIENT INQUIRIES (INBOX)                           */}
        {/* ========================================================= */}
        {activeTab === "inquiries" && (
          <div className="admin-tab-panel">
            {/* Controls Bar */}
            <div className="admin-panel-controls">
              <div className="admin-search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search inquiries by client, email, or message..."
                  className="admin-search-input"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                />
              </div>

              <div className="admin-filter-tabs">
                {(["all", "new", "in-review", "contacted", "converted", "archived"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`admin-filter-btn ${inquiryFilter === st ? "active" : ""}`}
                    onClick={() => setInquiryFilter(st)}
                  >
                    {st === "all" ? "All" : st.replace("-", " ")}
                    <span className="count">
                      {st === "all" ? inquiries.length : inquiries.filter((i) => i.status === st).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="admin-card">
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Subject &amp; Scope</th>
                      <th>Date Received</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="admin-empty-cell">
                          No inquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id} className={inq.status === "new" ? "admin-tr-highlight" : ""}>
                          <td>
                            <strong>{inq.name}</strong>
                            <div className="admin-subtext">{inq.email}</div>
                          </td>
                          <td>
                            <div className="admin-td-subject">{inq.subject}</div>
                            <div className="admin-td-snippet">{inq.message.slice(0, 90)}...</div>
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {new Date(inq.createdAt).toLocaleDateString([], {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td>
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                              className={`admin-select-pill ${inq.status}`}
                            >
                              <option value="new">New</option>
                              <option value="in-review">In Review</option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td>
                            <div className="admin-row-actions">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedInquiry(inq);
                                  setInquiryNotesEdit(inq.notes || "");
                                }}
                                className="admin-btn admin-btn-ghost admin-btn-xs"
                              >
                                Review
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="admin-btn admin-btn-danger admin-btn-xs"
                                title="Delete"
                              >
                                &times;
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PORTFOLIO & CASE STUDIES                           */}
        {/* ========================================================= */}
        {activeTab === "projects" && (
          <div className="admin-tab-panel">
            {/* Controls Bar */}
            <div className="admin-panel-controls">
              <div className="admin-search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search case studies by title, client, or tech..."
                  className="admin-search-input"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
              </div>

              <div className="admin-filter-tabs">
                {["all", "Enterprise ERP", "AI & ML", "Web Development"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`admin-filter-btn ${projectCategory === cat ? "active" : ""}`}
                    onClick={() => setProjectCategory(cat)}
                  >
                    {cat === "all" ? "All Categories" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="admin-projects-grid">
              {filteredProjects.map((p) => (
                <div key={p.id} className="admin-card admin-project-card">
                  <div className="admin-proj-top">
                    <span className="admin-chip-category">{p.category}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleProjectStatus(p.id)}
                      className={`admin-pill-toggle ${p.status}`}
                      title="Click to toggle visibility"
                    >
                      {p.status === "published" ? "● Published" : "○ Draft"}
                    </button>
                  </div>

                  <h3 className="admin-proj-title">{p.title}</h3>
                  <p className="admin-proj-client">{p.client} &bull; {p.year}</p>

                  <p className="admin-proj-summary">{p.summary}</p>

                  <div className="admin-proj-metric">
                    <span className="val">{p.metricValue}</span>
                    <span className="lbl">{p.metricLabel}</span>
                  </div>

                  <div className="admin-proj-stack">
                    {p.stack.map((tag) => (
                      <span key={tag} className="admin-stack-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="admin-proj-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(p);
                        setIsEditingProject(true);
                      }}
                      className="admin-btn admin-btn-ghost admin-btn-sm"
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(p.id)}
                      className="admin-btn admin-btn-danger admin-btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* INQUIRY DETAIL MODAL / DRAWER                             */}
      {/* ========================================================= */}
      {selectedInquiry && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedInquiry(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <div>
                <span className={`admin-pill ${selectedInquiry.status}`}>{selectedInquiry.status}</span>
                <h2>Inquiry from {selectedInquiry.name}</h2>
              </div>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedInquiry(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-meta">
                <div>
                  <span className="label">Email Address</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="admin-link">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="label">Date Received</span>
                  <span>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="label">Source</span>
                  <span>{selectedInquiry.source || "Website Contact Form"}</span>
                </div>
              </div>

              <div className="admin-detail-box">
                <span className="label">Subject</span>
                <p className="admin-detail-subject">{selectedInquiry.subject}</p>

                <span className="label" style={{ marginTop: 14 }}>
                  Message Content
                </span>
                <p className="admin-detail-message">{selectedInquiry.message}</p>
              </div>

              <div className="admin-notes-section">
                <label className="label" htmlFor="inq-notes">
                  Internal Team Notes &amp; Follow-up Log
                </label>
                <textarea
                  id="inq-notes"
                  rows={3}
                  className="admin-textarea"
                  placeholder="Record call notes, architecture specs discussed, or next steps..."
                  value={inquiryNotesEdit}
                  onChange={(e) => setInquiryNotesEdit(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSaveInquiryNotes}
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                  style={{ marginTop: 8 }}
                >
                  Save Internal Notes
                </button>
              </div>
            </div>

            <div className="admin-modal-foot">
              <div className="admin-status-dropdown-wrap">
                <span>Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleUpdateInquiryStatus(selectedInquiry.id, e.target.value as InquiryStatus)}
                  className={`admin-select-pill ${selectedInquiry.status}`}
                >
                  <option value="new">New</option>
                  <option value="in-review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="admin-modal-actions">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Re: ${selectedInquiry.subject} - Akiba Technologies`
                  )}`}
                  className="admin-btn admin-btn-primary admin-btn-sm"
                >
                  Reply via Email &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ADD / EDIT PROJECT MODAL                                  */}
      {/* ========================================================= */}
      {isEditingProject && editingProject && (
        <div className="admin-modal-backdrop" onClick={() => setIsEditingProject(false)}>
          <div className="admin-modal-card admin-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h2>{editingProject.id ? "Edit Case Study" : "Add New Case Study"}</h2>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setIsEditingProject(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div className="admin-modal-body">
                <div className="admin-grid-2">
                  <div className="admin-fgroup">
                    <label>Project Title *</label>
                    <input
                      type="text"
                      required
                      className="admin-input"
                      placeholder="e.g. Awash Logistics Fleet OS"
                      value={editingProject.title || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label>Client Name *</label>
                    <input
                      type="text"
                      required
                      className="admin-input"
                      placeholder="e.g. Awash Cargo &amp; Transit PLC"
                      value={editingProject.client || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-grid-3">
                  <div className="admin-fgroup">
                    <label>Category</label>
                    <select
                      className="admin-input"
                      value={editingProject.category || "Enterprise ERP"}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          category: e.target.value as AdminProject["category"],
                        })
                      }
                    >
                      <option value="Enterprise ERP">Enterprise ERP</option>
                      <option value="AI & ML">AI &amp; ML</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="IoT">IoT</option>
                    </select>
                  </div>

                  <div className="admin-fgroup">
                    <label>Year</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editingProject.year || "2025"}
                      onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label>Status</label>
                    <select
                      className="admin-input"
                      value={editingProject.status || "published"}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          status: e.target.value as "published" | "draft",
                        })
                      }
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-fgroup">
                    <label>Highlight Metric Value</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 100% or 3.8x or 4,200"
                      value={editingProject.metricValue || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, metricValue: e.target.value })}
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label>Highlight Metric Description</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. lease audit accuracy &amp; zero data loss"
                      value={editingProject.metricLabel || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, metricLabel: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-fgroup">
                  <label>Summary / Problem Solved</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    placeholder="Describe how Akiba's engineering team delivered this platform..."
                    value={editingProject.summary || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Tech Stack (Comma-separated)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="TypeScript, Next.js, PostgreSQL, Docker"
                    value={
                      Array.isArray(editingProject.stack)
                        ? editingProject.stack.join(", ")
                        : editingProject.stack || ""
                    }
                    onChange={(e) => setEditingProject({ ...editingProject, stack: e.target.value as unknown as string[] })}
                  />
                </div>
              </div>

              <div className="admin-modal-foot">
                <button
                  type="button"
                  onClick={() => setIsEditingProject(false)}
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary admin-btn-sm">
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
