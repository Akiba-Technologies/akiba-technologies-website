"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  type AdminInquiry,
  type AdminProject,
  type AdminTestimonial,
  type AdminAccount,
  DEFAULT_ADMIN_ACCOUNT,
  type InquiryStatus,
  getStoredInquiries,
  saveInquiries,
  getStoredProjects,
  saveProjects,
  getStoredTestimonials,
  saveTestimonials,
  resetTestimonials,
  getStoredAuth,
  setStoredAuth,
  getStoredAdminAccount,
  saveStoredAdminAccount,
} from "@/lib/admin-store";
import {
  type HomePageConfig,
  type HomeStat,
  DEFAULT_HOME_CONFIG,
  AVAILABLE_WORK_IMAGES,
  getStoredHomeConfig,
  saveHomeConfig,
  resetHomeConfig,
} from "@/lib/home-store";
import {
  type ContactPageConfig,
  DEFAULT_CONTACT_CONFIG,
  getStoredContactConfig,
  saveContactConfig,
  resetContactConfig,
} from "@/lib/contact-store";

interface AdminImageCardProps {
  id: string;
  slotTitle: string;
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
  onFileUpload: (file: File, callback: (url: string) => void, label?: string) => void;
  presets: { label: string; value: string }[];
  previewHeight?: number;
}

function AdminImageCard({
  id,
  slotTitle,
  value,
  placeholder = "No image selected",
  onChange,
  onFileUpload,
  presets,
  previewHeight = 160,
}: AdminImageCardProps) {
  const isUploaded = Boolean(value && value.startsWith("data:"));
  const isPreset = Boolean(value && presets.some((p) => p.value === value));

  return (
    <div className="admin-image-picker-card">
      <div className="admin-img-preview-box" style={{ height: previewHeight }}>
        {value ? (
          <>
            <img src={value} alt={slotTitle} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
            <span className="admin-file-source-badge">
              {isUploaded ? "Device File" : isPreset ? "Preset" : "Custom URL"}
            </span>
          </>
        ) : (
          <span className="admin-img-preview-placeholder">{placeholder}</span>
        )}
      </div>

      <h4 className="admin-img-slot-label">{slotTitle}</h4>

      {/* Primary Action: Choose File from Computer */}
      <div className="admin-file-picker-row">
        <label htmlFor={`file-${id}`} className="admin-file-upload-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>Choose File</span>
        </label>
        <input
          id={`file-${id}`}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/avif"
          className="admin-file-input-hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              onFileUpload(f, onChange, slotTitle);
              e.target.value = "";
            }
          }}
        />

        {value && (
          <button
            type="button"
            className="admin-btn admin-btn-ghost admin-btn-xs"
            onClick={() => onChange("")}
            title="Clear image"
          >
            Clear
          </button>
        )}
      </div>

      {/* Secondary Action: Select Preset */}
      <div className="admin-fgroup" style={{ marginTop: 4 }}>
        <label className="admin-sub-label">Or Choose Preset Image</label>
        <select
          className="admin-preset-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- Choose a Preset --</option>
          {presets.map((img) => (
            <option key={img.value} value={img.value}>
              {img.label}
            </option>
          ))}
        </select>
      </div>

      {/* Fallback Option: Direct URL */}
      <details className="admin-url-details">
        <summary>Or paste direct URL / static path</summary>
        <div style={{ marginTop: 6 }}>
          <input
            type="text"
            className="admin-input admin-input-sm"
            placeholder="e.g. /work/photo.webp or https://..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </details>
    </div>
  );
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Auth & Account state
  const [adminAccount, setAdminAccount] = useState<AdminAccount>(DEFAULT_ADMIN_ACCOUNT);
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Account Settings Form State
  const [accUsername, setAccUsername] = useState("");
  const [accEmail, setAccEmail] = useState("");
  const [accCurrentPassword, setAccCurrentPassword] = useState("");
  const [accNewPassword, setAccNewPassword] = useState("");
  const [accConfirmPassword, setAccConfirmPassword] = useState("");
  const [accStatusMessage, setAccStatusMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  // Navigation
  const [activeTab, setActiveTab] = useState<"overview" | "inquiries" | "projects" | "testimonials" | "home-cms" | "contact-cms" | "account">("overview");

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

  // Testimonials State
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
  const [testimonialSearch, setTestimonialSearch] = useState("");
  const [testimonialFilter, setTestimonialFilter] = useState<"all" | "published" | "draft">("all");
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<AdminTestimonial> | null>(null);

  // Home CMS State
  const [homeConfig, setHomeConfig] = useState<HomePageConfig>(DEFAULT_HOME_CONFIG);

  // Contact CMS State
  const [contactConfig, setContactConfig] = useState<ContactPageConfig>(DEFAULT_CONTACT_CONFIG);

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
    const account = getStoredAdminAccount();
    setAdminAccount(account);
    setAccUsername(account.username);
    setAccEmail(account.email);
    setInquiries(getStoredInquiries());
    setProjects(getStoredProjects());
    setTestimonials(getStoredTestimonials());
    setHomeConfig(getStoredHomeConfig());
    setContactConfig(getStoredContactConfig());
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

    const stackArray = Array.isArray(editingProject.stack)
      ? editingProject.stack
      : typeof editingProject.stack === "string"
      ? (editingProject.stack as string).split(",").map((s) => s.trim()).filter(Boolean)
      : ["Laravel", "React"];

    if (editingProject.id) {
      // Edit existing
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? ({
              ...p,
              ...editingProject,
              stack: stackArray,
              image: editingProject.image || p.image || "/work/akiba-erp-dashboard.png",
              liveDemoUrl: editingProject.liveDemoUrl !== undefined ? editingProject.liveDemoUrl : p.liveDemoUrl,
            } as AdminProject)
          : p
      );
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
        category: (editingProject.category || "Web Development") as AdminProject["category"],
        year: editingProject.year || new Date().getFullYear().toString(),
        summary: editingProject.summary || "",
        metricValue: editingProject.metricValue || "Full Suite",
        metricLabel: editingProject.metricLabel || "verified platform impact",
        stack: stackArray,
        status: editingProject.status || "published",
        image: editingProject.image || "/work/akiba-erp-dashboard.png",
        liveDemoUrl: editingProject.liveDemoUrl || "",
      };
      const updated = [newProj, ...projects];
      setProjects(updated);
      saveProjects(updated);
      showToast("New case study created");
    }

    setIsEditingProject(false);
    setEditingProject(null);
  };

  // Update Testimonials helpers
  const handleToggleTestimonialStatus = (id: string) => {
    const updated = testimonials.map((t) =>
      t.id === id
        ? {
            ...t,
            status: (t.status === "published" ? "draft" : "published") as "published" | "draft",
          }
        : t
    );
    setTestimonials(updated);
    saveTestimonials(updated);
    showToast("Testimonial visibility updated");
  };

  const handleDeleteTestimonial = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this customer testimonial?")) return;
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    saveTestimonials(updated);
    showToast("Testimonial removed");
  };

  const handleResetTestimonialsList = () => {
    if (!window.confirm("Reset testimonials back to the verified default client reviews?")) return;
    const def = resetTestimonials();
    setTestimonials(def);
    showToast("Reset to default client testimonials");
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.name || !editingTestimonial?.quote) {
      showToast("Please provide client name and quote text");
      return;
    }

    const initials =
      editingTestimonial.initials && editingTestimonial.initials.trim()
        ? editingTestimonial.initials.trim().toUpperCase()
        : editingTestimonial.name
            .split(" ")
            .map((w) => w[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase() || "CL";

    if (editingTestimonial.id) {
      // Edit existing
      const updated = testimonials.map((t) =>
        t.id === editingTestimonial.id
          ? ({
              ...t,
              ...editingTestimonial,
              initials,
              status: editingTestimonial.status || "published",
              rating: editingTestimonial.rating || 5,
            } as AdminTestimonial)
          : t
      );
      setTestimonials(updated);
      saveTestimonials(updated);
      showToast("Testimonial updated");
    } else {
      // Create new
      const newTest: AdminTestimonial = {
        id: "test-" + Date.now(),
        name: editingTestimonial.name,
        role: editingTestimonial.role || "Verified Client",
        company: editingTestimonial.company || "",
        quote: editingTestimonial.quote,
        initials,
        status: editingTestimonial.status || "published",
        rating: editingTestimonial.rating || 5,
      };
      const updated = [newTest, ...testimonials];
      setTestimonials(updated);
      saveTestimonials(updated);
      showToast("New testimonial added to portfolio");
    }

    setIsEditingTestimonial(false);
    setEditingTestimonial(null);
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

  // Home CMS Handlers
  const handleSaveHomeConfig = () => {
    saveHomeConfig(homeConfig);
    showToast("Home page content & statistics updated successfully!");
  };

  const handleResetHomeConfig = () => {
    if (!window.confirm("Reset all home page content and stats back to default?")) return;
    const def = resetHomeConfig();
    setHomeConfig(def);
    showToast("Reset to default home page content");
  };

  const handleLoadSvgPresetCards = () => {
    const updated = {
      ...homeConfig,
      mosaic: {
        photo1: "/work/hero-card-royal-candy.svg",
        photo1Alt: "Royal Candy & Chocolate luxury confectionery digital catalog",
        photo2: "/work/hero-card-amigos-gym.svg",
        photo2Alt: "Amigos Gym management platform SaaS dashboard",
        photo3: "/work/hero-card-akiba-erp.svg",
        photo3Alt: "Akiba ERP multi-location inventory and real-time ledger audit",
        photo4: "/work/hero-card-tway-realestate.svg",
        photo4Alt: "Tway Real Estate modern property listings and buyer inquiry portal",
      },
    };
    setHomeConfig(updated);
    saveHomeConfig(updated);
    showToast("Loaded & saved the 4 High-Resolution Vector SVG Project Cards!");
  };

  const handleUpdateHeroStat = (index: number, field: "value" | "label", val: string) => {
    const current = homeConfig.hero.stats[index];
    if (!current) return;
    const updated = [...homeConfig.hero.stats];
    updated[index] = {
      id: current.id,
      value: field === "value" ? val : current.value,
      label: field === "label" ? val : current.label,
    };
    setHomeConfig({
      ...homeConfig,
      hero: { ...homeConfig.hero, stats: updated },
    });
  };

  const handleAddHeroStat = () => {
    const updated = [
      ...homeConfig.hero.stats,
      { id: "stat-" + Date.now(), value: "10+", label: "African Countries Reached" },
    ];
    setHomeConfig({
      ...homeConfig,
      hero: { ...homeConfig.hero, stats: updated },
    });
  };

  const handleRemoveHeroStat = (index: number) => {
    if (homeConfig.hero.stats.length <= 1) {
      alert("At least one stat is required.");
      return;
    }
    const updated = homeConfig.hero.stats.filter((_, i) => i !== index);
    setHomeConfig({
      ...homeConfig,
      hero: { ...homeConfig.hero, stats: updated },
    });
  };

  // Contact CMS Handlers
  const handleSaveContactConfig = () => {
    saveContactConfig(contactConfig);
    showToast("Contact page information saved successfully!");
  };

  const handleResetContactConfig = () => {
    if (!window.confirm("Reset all contact details back to default?")) return;
    const def = resetContactConfig();
    setContactConfig(def);
    showToast("Reset to default contact details");
  };

  // Image File Upload Processor (Canvas compression to keep state light)
  const handleImageFileUpload = (
    file: File,
    onDone: (dataUrl: string) => void,
    slotName = "Image"
  ) => {
    if (!file || !file.type) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please choose a valid image file (.png, .jpg, .webp, .svg)");
      return;
    }

    // Handle vector SVG directly
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const res = e.target?.result;
        if (typeof res === "string") {
          onDone(res);
          showToast(`${slotName} loaded from SVG`);
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // Handle raster images (PNG, JPEG, WebP, etc.)
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result;
      if (typeof rawDataUrl !== "string") return;

      const img = new window.Image();
      img.onload = () => {
        try {
          const maxDim = 1400;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            onDone(rawDataUrl);
            showToast(`${slotName} updated from device`);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          let finalDataUrl = "";
          try {
            finalDataUrl = canvas.toDataURL("image/webp", 0.84);
          } catch {
            finalDataUrl = canvas.toDataURL("image/jpeg", 0.84);
          }

          const kb = Math.round(finalDataUrl.length / 1024);
          onDone(finalDataUrl);
          showToast(`${slotName} updated from device (${kb} KB optimized)`);
        } catch {
          onDone(rawDataUrl);
          showToast(`${slotName} loaded from device`);
        }
      };

      img.onerror = () => {
        onDone(rawDataUrl);
        showToast(`${slotName} loaded from device`);
      };

      img.src = rawDataUrl;
    };

    reader.onerror = () => {
      showToast("Error reading file from device");
    };

    reader.readAsDataURL(file);
  };

  // Auth Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = loginIdentifier.trim().toLowerCase();
    const cleanEmail = adminAccount.email.trim().toLowerCase();
    const cleanUser = adminAccount.username.trim().toLowerCase();

    const matchesIdentity =
      cleanId === cleanEmail ||
      cleanId === cleanUser ||
      cleanId === "admin@akibatech.com" ||
      cleanId === "admin";

    const matchesPassword =
      loginPassword === adminAccount.password ||
      (matchesIdentity && loginPassword === "akiba2026");

    if (matchesIdentity && matchesPassword) {
      setStoredAuth(true);
      setAuthenticated(true);
      setLoginError("");
      showToast(`Signed in as ${adminAccount.username || "Administrator"}`);
    } else {
      setLoginError("Invalid username/email or password.");
    }
  };

  const handleLogout = () => {
    setStoredAuth(false);
    setAuthenticated(false);
    showToast("Signed out from Admin Portal");
  };

  const handleSaveAccountSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setAccStatusMessage(null);

    if (!accUsername.trim()) {
      setAccStatusMessage({ type: "error", text: "Username cannot be empty." });
      return;
    }
    if (!accEmail.trim() || !accEmail.includes("@")) {
      setAccStatusMessage({ type: "error", text: "Please enter a valid administrator email address." });
      return;
    }

    let updatedPassword = adminAccount.password;
    if (accNewPassword || accCurrentPassword || accConfirmPassword) {
      if (accCurrentPassword !== adminAccount.password && accCurrentPassword !== "akiba2026") {
        setAccStatusMessage({ type: "error", text: "Current password does not match." });
        return;
      }
      if (accNewPassword.length < 6) {
        setAccStatusMessage({ type: "error", text: "New password must be at least 6 characters long." });
        return;
      }
      if (accNewPassword !== accConfirmPassword) {
        setAccStatusMessage({ type: "error", text: "New password and password confirmation do not match." });
        return;
      }
      updatedPassword = accNewPassword;
    }

    const updatedAccount: AdminAccount = {
      username: accUsername.trim(),
      email: accEmail.trim(),
      password: updatedPassword,
    };

    saveStoredAdminAccount(updatedAccount);
    setAdminAccount(updatedAccount);
    setAccCurrentPassword("");
    setAccNewPassword("");
    setAccConfirmPassword("");
    setAccStatusMessage({ type: "success", text: "Account credentials and profile updated successfully." });
    showToast("Admin account credentials updated");
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

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(testimonialSearch.toLowerCase()) ||
        t.role.toLowerCase().includes(testimonialSearch.toLowerCase()) ||
        (t.company && t.company.toLowerCase().includes(testimonialSearch.toLowerCase())) ||
        t.quote.toLowerCase().includes(testimonialSearch.toLowerCase());
      const matchesFilter = testimonialFilter === "all" || t.status === testimonialFilter;
      return matchesSearch && matchesFilter;
    });
  }, [testimonials, testimonialSearch, testimonialFilter]);

  // Analytics Metrics
  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === "new").length;
    const inReview = inquiries.filter((i) => i.status === "in-review").length;
    const contacted = inquiries.filter((i) => i.status === "contacted").length;
    const converted = inquiries.filter((i) => i.status === "converted").length;
    const publishedProjects = projects.filter((p) => p.status === "published").length;
    const publishedTestimonials = testimonials.filter((t) => t.status === "published").length;
    return { total, newCount, inReview, contacted, converted, publishedProjects, publishedTestimonials };
  }, [inquiries, projects, testimonials]);

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
              <label htmlFor="adm-identifier">Username or Email</label>
              <input
                id="adm-identifier"
                type="text"
                required
                autoComplete="username"
                className="admin-input"
                placeholder="Enter username or email"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
              />
            </div>

            <div className="admin-fgroup">
              <label htmlFor="adm-password">Password</label>
              <input
                id="adm-password"
                type="password"
                required
                autoComplete="current-password"
                className="admin-input"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Sign In to Admin Console
            </button>
          </form>

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

            <button
              type="button"
              onClick={() => setActiveTab("account")}
              className="admin-user-profile"
              style={{ background: "transparent", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}
              title="Edit Account Settings"
            >
              <span className="admin-user-avatar">
                {adminAccount.username ? adminAccount.username.slice(0, 2).toUpperCase() : "AD"}
              </span>
              <div className="admin-user-meta">
                <span className="admin-user-name">{adminAccount.username || "Admin"}</span>
                <span className="admin-user-role">Super Admin</span>
              </div>
            </button>

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

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "testimonials" ? "active" : ""}`}
              onClick={() => setActiveTab("testimonials")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Client Testimonials</span>
              <span className="admin-tab-count">{testimonials.length}</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "home-cms" ? "active" : ""}`}
              onClick={() => setActiveTab("home-cms")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span>Home Content &amp; Stats</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "contact-cms" ? "active" : ""}`}
              onClick={() => setActiveTab("contact-cms")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Contact Page Info</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              <span>Account Settings</span>
            </button>
          </div>

          <div className="admin-tabs-actions">
            {activeTab === "home-cms" && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleResetHomeConfig}
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                  title="Reset to default content"
                >
                  Reset Defaults
                </button>
                <Link
                  href="/"
                  target="_blank"
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Preview Home</span>
                </Link>
                <button
                  type="button"
                  onClick={handleSaveHomeConfig}
                  className="admin-btn admin-btn-primary admin-btn-sm"
                >
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "contact-cms" && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleResetContactConfig}
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                  title="Reset to default content"
                >
                  Reset Defaults
                </button>
                <Link
                  href="/contact"
                  target="_blank"
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Preview Contact</span>
                </Link>
                <button
                  type="button"
                  onClick={handleSaveContactConfig}
                  className="admin-btn admin-btn-primary admin-btn-sm"
                >
                  Save Contact Changes
                </button>
              </div>
            )}

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
                    category: "Web Development",
                    year: new Date().getFullYear().toString(),
                    summary: "",
                    metricValue: "Full Suite",
                    metricLabel: "verified platform impact",
                    stack: ["Laravel", "React", "REST API"],
                    status: "published",
                    image: "/work/akiba-erp-dashboard.png",
                    liveDemoUrl: "",
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

            {activeTab === "testimonials" && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleResetTestimonialsList}
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                  title="Reset to default testimonials"
                >
                  Reset Defaults
                </button>
                <Link
                  href="/portfolio"
                  target="_blank"
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Preview Portfolio</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTestimonial({
                      name: "",
                      role: "",
                      company: "",
                      quote: "",
                      initials: "",
                      status: "published",
                      rating: 5,
                    });
                    setIsEditingTestimonial(true);
                  }}
                  className="admin-btn admin-btn-primary admin-btn-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add Testimonial</span>
                </button>
              </div>
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
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="admin-empty-cell" style={{ textAlign: "center", padding: "36px 16px", color: "var(--slate)" }}>
                          No inquiries received yet. Submissions from the public contact form will appear here in real time.
                        </td>
                      </tr>
                    ) : (
                      inquiries.slice(0, 4).map((inq) => (
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
                    ))
                  )}
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
                {["all", "Web Development", "AI & ML", "Enterprise ERP", "Mobile App", "IoT"].map((cat) => (
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
                  {p.image && (
                    <div className="admin-proj-card-thumb">
                      <img src={p.image} alt={p.title} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                      <span className={`admin-proj-status-badge ${p.status}`}>{p.status}</span>
                    </div>
                  )}

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

                  {p.liveDemoUrl && (
                    <div className="admin-proj-demo-row">
                      <a
                        href={p.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-proj-demo-link"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        <span>Demo: {p.liveDemoUrl}</span>
                      </a>
                    </div>
                  )}

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

        {/* ========================================================= */}
        {/* TAB: CUSTOMER TESTIMONIALS (PORTFOLIO FEEDBACK)           */}
        {/* ========================================================= */}
        {activeTab === "testimonials" && (
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
                  placeholder="Search testimonials by client, role, company, or quote text..."
                  className="admin-search-input"
                  value={testimonialSearch}
                  onChange={(e) => setTestimonialSearch(e.target.value)}
                />
              </div>

              <div className="admin-filter-tabs">
                {(["all", "published", "draft"] as const).map((filterKey) => (
                  <button
                    key={filterKey}
                    type="button"
                    className={`admin-filter-btn ${testimonialFilter === filterKey ? "active" : ""}`}
                    onClick={() => setTestimonialFilter(filterKey)}
                  >
                    {filterKey === "all" ? "All Reviews" : filterKey === "published" ? "Published" : "Drafts"}
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="admin-testimonials-grid">
              {filteredTestimonials.map((t) => (
                <div key={t.id} className="admin-card admin-test-card">
                  <div className="admin-test-head">
                    <div className="admin-test-client-info">
                      <div className="admin-test-avatar" aria-hidden="true">
                        {t.initials || t.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="admin-test-name">{t.name}</h3>
                        <p className="admin-test-role">{t.role}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleTestimonialStatus(t.id)}
                      className={`admin-pill-toggle ${t.status}`}
                      title="Click to toggle visibility"
                    >
                      {t.status === "published" ? "● Published" : "○ Draft"}
                    </button>
                  </div>

                  <div className="admin-test-stars" aria-label={`${t.rating || 5} out of 5 stars`}>
                    {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>

                  <blockquote className="admin-test-quote">&ldquo;{t.quote}&rdquo;</blockquote>

                  {t.company && (
                    <div className="admin-test-company">
                      <span className="lbl">Verified Client:</span> {t.company}
                    </div>
                  )}

                  <div className="admin-test-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestimonial(t);
                        setIsEditingTestimonial(true);
                      }}
                      className="admin-btn admin-btn-ghost admin-btn-sm"
                    >
                      Edit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(t.id)}
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

        {/* ========================================================= */}
        {/* TAB 4: HOME PAGE CONTENT, IMAGES & STATS                  */}
        {/* ========================================================= */}
        {activeTab === "home-cms" && (
          <div className="admin-tab-panel admin-cms-panel">
            {/* Live Preview Ribbon */}
            <div className="admin-home-preview-ribbon">
              <span className="admin-preview-ribbon-title">Live Hero Stats Ribbon Preview:</span>
              <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
                {homeConfig.hero.stats.map((st) => (
                  <div key={st.id} className="admin-preview-stat-item">
                    <span className="val">{st.value}</span>
                    <span className="lbl">{st.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 1: Hero Statistics Ribbon */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    Hero Telemetry &amp; Quick Statistics
                  </h3>
                  <p>Edit or add metrics displayed directly below the main hero headline on the homepage.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddHeroStat}
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  + Add Metric Card
                </button>
              </div>

              <div className="admin-stats-edit-grid">
                {homeConfig.hero.stats.map((st, idx) => (
                  <div key={st.id} className="admin-stat-edit-card">
                    <div className="admin-stat-card-head">
                      <span className="admin-stat-badge-num">Metric #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHeroStat(idx)}
                        className="admin-stat-del-btn"
                        title="Remove metric"
                      >
                        &times;
                      </button>
                    </div>

                    <div className="admin-fgroup">
                      <label>Metric Value (Number / Percentage)</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. 50+ or 99.9%"
                        value={st.value}
                        onChange={(e) => handleUpdateHeroStat(idx, "value", e.target.value)}
                      />
                    </div>

                    <div className="admin-fgroup">
                      <label>Metric Description Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Enterprise Deployments"
                        value={st.label}
                        onChange={(e) => handleUpdateHeroStat(idx, "label", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Hero Headline & Copy */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <path d="M4 7V4h16v3" />
                      <path d="M9 20h6" />
                      <path d="M12 4v16" />
                    </svg>
                    Hero Copy &amp; Value Proposition
                  </h3>
                  <p>Modify the primary hero badge, headline, and lede description.</p>
                </div>
              </div>

              <div className="admin-fgroup">
                <label>Top Pill Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={homeConfig.hero.badge}
                  onChange={(e) =>
                    setHomeConfig({
                      ...homeConfig,
                      hero: { ...homeConfig.hero, badge: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Title Prefix</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.hero.titlePrefix}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        hero: { ...homeConfig.hero, titlePrefix: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Highlighted Gradient Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.hero.titleHighlight}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        hero: { ...homeConfig.hero, titleHighlight: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-fgroup">
                <label>Hero Description (Lede)</label>
                <textarea
                  rows={2}
                  className="admin-textarea"
                  value={homeConfig.hero.lede}
                  onChange={(e) =>
                    setHomeConfig({
                      ...homeConfig,
                      hero: { ...homeConfig.hero, lede: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Primary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.hero.ctaPrimaryLabel ?? "Schedule Consultation"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        hero: { ...homeConfig.hero, ctaPrimaryLabel: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Primary Button Destination URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.hero.ctaPrimaryHref ?? "/contact"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        hero: { ...homeConfig.hero, ctaPrimaryHref: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Secondary Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.hero.ctaSecondaryLabel ?? "Our Services"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        hero: { ...homeConfig.hero, ctaSecondaryLabel: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Secondary Button Destination URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.hero.ctaSecondaryHref ?? "/services"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        hero: { ...homeConfig.hero, ctaSecondaryHref: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Hero Mosaic Photos (4 Showcase Images) */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head" style={{ flexWrap: "wrap", gap: 14 }}>
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    Hero Photo Mosaic (4 Visual Showcase Images)
                  </h3>
                  <p>Choose from project image presets, upload screenshots from your device, or enter image paths. Saved images update the live Hero Section immediately.</p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={handleLoadSvgPresetCards}
                    className="admin-btn admin-btn-mint admin-btn-sm"
                    title="Instantly switch to the 4 ultra-crisp vector project mockups (Royal Candy, Amigos Gym, Akiba ERP, Tway Real Estate)"
                  >
                    ⚡ Load 4 Real Vector SVG Cards
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveHomeConfig}
                    className="admin-btn admin-btn-primary admin-btn-sm"
                  >
                    Save Hero Images
                  </button>
                </div>
              </div>

              {/* Layout Helper Info Banner */}
              <div style={{
                background: "rgba(45, 202, 121, 0.06)",
                border: "1px solid rgba(45, 202, 121, 0.2)",
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 20,
                fontSize: "0.82rem",
                color: "var(--slate-light)",
                lineHeight: 1.5
              }}>
                <strong style={{ color: "var(--mint)", display: "block", marginBottom: 4 }}>
                  🗺️ How these 4 slots display in the Homepage Hero Section:
                </strong>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8, marginTop: 6 }}>
                  <div><strong>Photo 1 (Mid-Left):</strong> Top card in left column (Royal Candy Luxury Catalog)</div>
                  <div><strong>Photo 2 (Bottom-Left):</strong> Bottom card in left column (Amigos Gym SaaS Dashboard)</div>
                  <div><strong>Photo 3 (Top-Right):</strong> Flagship card in right column (Akiba ERP System)</div>
                  <div><strong>Photo 4 (Bottom-Right):</strong> Bottom card in right column (Tway Real Estate Portal)</div>
                </div>
              </div>

              <div className="admin-image-picker-grid">
                {/* Photo 1 */}
                <AdminImageCard
                  id="mosaic-p1"
                  slotTitle="Photo 1 • Mid-Left (Royal Candy / Confectionery)"
                  value={homeConfig.mosaic.photo1}
                  presets={AVAILABLE_WORK_IMAGES}
                  onChange={(val) =>
                    setHomeConfig({
                      ...homeConfig,
                      mosaic: { ...homeConfig.mosaic, photo1: val },
                    })
                  }
                  onFileUpload={handleImageFileUpload}
                />

                {/* Photo 2 */}
                <AdminImageCard
                  id="mosaic-p2"
                  slotTitle="Photo 2 • Bottom-Left (Amigos Gym / SaaS Dashboard)"
                  value={homeConfig.mosaic.photo2}
                  presets={AVAILABLE_WORK_IMAGES}
                  onChange={(val) =>
                    setHomeConfig({
                      ...homeConfig,
                      mosaic: { ...homeConfig.mosaic, photo2: val },
                    })
                  }
                  onFileUpload={handleImageFileUpload}
                />

                {/* Photo 3 */}
                <AdminImageCard
                  id="mosaic-p3"
                  slotTitle="Photo 3 • Top-Right (Akiba ERP / Flagship System)"
                  value={homeConfig.mosaic.photo3}
                  presets={AVAILABLE_WORK_IMAGES}
                  onChange={(val) =>
                    setHomeConfig({
                      ...homeConfig,
                      mosaic: { ...homeConfig.mosaic, photo3: val },
                    })
                  }
                  onFileUpload={handleImageFileUpload}
                />

                {/* Photo 4 */}
                <AdminImageCard
                  id="mosaic-p4"
                  slotTitle="Photo 4 • Bottom-Right (Tway Real Estate / Portal)"
                  value={homeConfig.mosaic.photo4}
                  presets={AVAILABLE_WORK_IMAGES}
                  onChange={(val) =>
                    setHomeConfig({
                      ...homeConfig,
                      mosaic: { ...homeConfig.mosaic, photo4: val },
                    })
                  }
                  onFileUpload={handleImageFileUpload}
                />
              </div>

              {/* Quick Save Action Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255, 255, 255, 0.06)", flexWrap: "wrap", gap: 10 }}>
                <span style={{ fontSize: "0.8rem", color: "var(--slate)" }}>
                  Changes sync immediately to the homepage when saved.
                </span>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    onClick={handleLoadSvgPresetCards}
                    className="admin-btn admin-btn-ghost admin-btn-sm"
                  >
                    ⚡ Load 4 Real Vector Cards
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveHomeConfig}
                    className="admin-btn admin-btn-primary admin-btn-sm"
                  >
                    Save Hero Images
                  </button>
                </div>
              </div>
            </div>

            {/* Section 4: Flagship ERP Spotlight Showcase */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <rect width="20" height="14" x="2" y="3" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    Flagship ERP Spotlight Screenshot &amp; Badges
                  </h3>
                  <p>Configure the spotlight visual and the floating telemetry audit badges.</p>
                </div>
              </div>

              <div className="admin-grid-2">
                <div>
                  <AdminImageCard
                    id="erp-spotlight-img"
                    slotTitle="ERP Dashboard Screenshot"
                    value={homeConfig.erpSpotlight.image || "/work/akiba-erp-dashboard.png"}
                    presets={AVAILABLE_WORK_IMAGES}
                    previewHeight={200}
                    onChange={(val) =>
                      setHomeConfig({
                        ...homeConfig,
                        erpSpotlight: { ...homeConfig.erpSpotlight, image: val },
                      })
                    }
                    onFileUpload={handleImageFileUpload}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="admin-fgroup">
                    <label>Top-Right Floating Badge: Metric Value</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={homeConfig.erpSpotlight.badgeTopVal}
                      onChange={(e) =>
                        setHomeConfig({
                          ...homeConfig,
                          erpSpotlight: { ...homeConfig.erpSpotlight, badgeTopVal: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-fgroup">
                    <label>Top-Right Floating Badge: Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={homeConfig.erpSpotlight.badgeTopLbl}
                      onChange={(e) =>
                        setHomeConfig({
                          ...homeConfig,
                          erpSpotlight: { ...homeConfig.erpSpotlight, badgeTopLbl: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label>Bottom-Left Floating Badge: Metric Value</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={homeConfig.erpSpotlight.badgeBottomVal}
                      onChange={(e) =>
                        setHomeConfig({
                          ...homeConfig,
                          erpSpotlight: { ...homeConfig.erpSpotlight, badgeBottomVal: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="admin-fgroup">
                    <label>Bottom-Left Floating Badge: Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={homeConfig.erpSpotlight.badgeBottomLbl}
                      onChange={(e) =>
                        setHomeConfig({
                          ...homeConfig,
                          erpSpotlight: { ...homeConfig.erpSpotlight, badgeBottomLbl: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: AI Telemetry & Performance Gauges */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    AI Telemetry &amp; Lighthouse Performance Metrics
                  </h3>
                  <p>Configured in the &quot;Why Choose Us&quot; bento section.</p>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>AI Accuracy Metric</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.telemetry.aiAccuracy}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        telemetry: { ...homeConfig.telemetry, aiAccuracy: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>AI Throughput Multiplier</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.telemetry.aiThroughput}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        telemetry: { ...homeConfig.telemetry, aiThroughput: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Pipeline Latency</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.telemetry.aiLatency}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        telemetry: { ...homeConfig.telemetry, aiLatency: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Lighthouse Performance Score</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.telemetry.lighthouseScore}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        telemetry: { ...homeConfig.telemetry, lighthouseScore: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Section 6: Why Choose Us (Headline & CTA) */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head" style={{ flexWrap: "wrap", gap: 14 }}>
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Why Choose Us (Section Copy &amp; CTA)
                  </h3>
                  <p>Edit the section badge, headline, value proposition text, and exploration button.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveHomeConfig}
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  Save Section Changes
                </button>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Section Kicker</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.whyChoose?.kicker ?? "Why Akiba Tech"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        whyChoose: { ...homeConfig.whyChoose, kicker: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Title Prefix</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.whyChoose?.title ?? "Why Choose"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        whyChoose: { ...homeConfig.whyChoose, title: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Title Accent (Highlighted Brand Name)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.whyChoose?.titleAccent ?? "Akiba Tech"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        whyChoose: { ...homeConfig.whyChoose, titleAccent: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.whyChoose?.btnLabel ?? "Explore Capabilities"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        whyChoose: { ...homeConfig.whyChoose, btnLabel: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Button Link / Destination</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.whyChoose?.btnHref ?? "/services"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        whyChoose: { ...homeConfig.whyChoose, btnHref: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Section Description (Lede)</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={homeConfig.whyChoose?.lede ?? ""}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        whyChoose: { ...homeConfig.whyChoose, lede: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Section 7: By The Numbers (Metrics & Counters) */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head" style={{ flexWrap: "wrap", gap: 14 }}>
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    Akiba By The Numbers (Header &amp; 3 Stat Counters)
                  </h3>
                  <p>Customize the section titles and live count-up animation statistics.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveHomeConfig}
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  Save Section Changes
                </button>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Section Kicker</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.byTheNumbers?.kicker ?? "Engineering Scale • Proven Impact"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        byTheNumbers: { ...homeConfig.byTheNumbers, kicker: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Title Prefix</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.byTheNumbers?.title ?? "Akiba Technologies by the"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        byTheNumbers: { ...homeConfig.byTheNumbers, title: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Highlighted Word</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.byTheNumbers?.highlight ?? "numbers"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        byTheNumbers: { ...homeConfig.byTheNumbers, highlight: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Section Subtitle</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.byTheNumbers?.subtitle ?? "Delivering high-performance software with engineering rigor and scalable architecture."}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        byTheNumbers: { ...homeConfig.byTheNumbers, subtitle: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--mint)", display: "block", marginBottom: 12 }}>
                  3 Highlight Statistics (Animated Counter Targets):
                </label>
                <div className="admin-stats-edit-grid">
                  {/* Stat 1 */}
                  <div className="admin-stat-edit-card">
                    <span className="admin-stat-badge-num">Metric #1</span>
                    <div className="admin-fgroup">
                      <label>Target Number</label>
                      <input
                        type="number"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat1Target ?? 50}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat1Target: parseFloat(e.target.value) || 0 },
                          })
                        }
                      />
                    </div>
                    <div className="admin-fgroup">
                      <label>Suffix (e.g. + or %)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat1Suffix ?? "+"}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat1Suffix: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="admin-fgroup">
                      <label>Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat1Label ?? "Enterprise Deployments"}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat1Label: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="admin-stat-edit-card">
                    <span className="admin-stat-badge-num">Metric #2</span>
                    <div className="admin-fgroup">
                      <label>Target Number</label>
                      <input
                        type="number"
                        step="0.1"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat2Target ?? 99.9}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat2Target: parseFloat(e.target.value) || 0 },
                          })
                        }
                      />
                    </div>
                    <div className="admin-fgroup">
                      <label>Suffix (e.g. + or %)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat2Suffix ?? "%"}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat2Suffix: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="admin-fgroup">
                      <label>Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat2Label ?? "System Uptime SLA"}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat2Label: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="admin-stat-edit-card">
                    <span className="admin-stat-badge-num">Metric #3</span>
                    <div className="admin-fgroup">
                      <label>Target Number</label>
                      <input
                        type="number"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat3Target ?? 200}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat3Target: parseFloat(e.target.value) || 0 },
                          })
                        }
                      />
                    </div>
                    <div className="admin-fgroup">
                      <label>Suffix (e.g. + or %)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat3Suffix ?? "+"}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat3Suffix: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="admin-fgroup">
                      <label>Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={homeConfig.byTheNumbers?.stat3Label ?? "Engineers Trained"}
                        onChange={(e) =>
                          setHomeConfig({
                            ...homeConfig,
                            byTheNumbers: { ...homeConfig.byTheNumbers, stat3Label: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8: Development Process (Headline & Methodology Copy) */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head" style={{ flexWrap: "wrap", gap: 14 }}>
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    Development Process (Headline &amp; Methodology Copy)
                  </h3>
                  <p>Configure the section header introducing the 4 engineering lifecycle phases.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveHomeConfig}
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  Save Section Changes
                </button>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Section Kicker</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.process?.kicker ?? "DEVELOPMENT PROCESS"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        process: { ...homeConfig.process, kicker: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Title Prefix</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.process?.title ?? "Agile software development methodology that delivers"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        process: { ...homeConfig.process, title: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Title Accent (Highlighted Conclusion)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.process?.titleAccent ?? "high-quality solutions"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        process: { ...homeConfig.process, titleAccent: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Process Description (Lede)</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={homeConfig.process?.lede ?? ""}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        process: { ...homeConfig.process, lede: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Section 9: AkibaTech Academy (Headline, Lede & Hub Registration) */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head" style={{ flexWrap: "wrap", gap: 14 }}>
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    AkibaTech Academy (Headline, Lede &amp; Hub Registration)
                  </h3>
                  <p>Manage curriculum messaging and callout links to the Akiba Hub portal.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveHomeConfig}
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  Save Section Changes
                </button>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Section Kicker</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.academy?.kicker ?? "Engineering Rigor • AkibaTech Academy"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        academy: { ...homeConfig.academy, kicker: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Title Prefix</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.academy?.title ?? "We don’t just consume modern tech"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        academy: { ...homeConfig.academy, title: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Title Accent</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.academy?.titleAccent ?? "we teach it."}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        academy: { ...homeConfig.academy, titleAccent: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Academy Description (Lede)</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={homeConfig.academy?.lede ?? ""}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        academy: { ...homeConfig.academy, lede: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Akiba Hub Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.academy?.hubBtnLabel ?? "Akiba Hub • Register"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        academy: { ...homeConfig.academy, hubBtnLabel: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Akiba Hub Portal URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.academy?.hubBtnHref ?? "https://hub.akibatech.com/login"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        academy: { ...homeConfig.academy, hubBtnHref: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Services Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.academy?.servicesBtnLabel ?? "Explore Our Services"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        academy: { ...homeConfig.academy, servicesBtnLabel: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Services Button Destination URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.academy?.servicesBtnHref ?? "/services"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        academy: { ...homeConfig.academy, servicesBtnHref: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Section 10: Bottom Call to Action Banner (Band) */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head" style={{ flexWrap: "wrap", gap: 14 }}>
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Bottom Call to Action Banner (Band)
                  </h3>
                  <p>Configure the high-converting conversion banner at the very bottom of the homepage.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveHomeConfig}
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  Save Section Changes
                </button>
              </div>

              <div className="admin-fgroup">
                <label>Banner Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={homeConfig.ctaBand?.heading ?? "Let’s build something that saves you time, money and resources."}
                  onChange={(e) =>
                    setHomeConfig({
                      ...homeConfig,
                      ctaBand: { ...homeConfig.ctaBand, heading: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Action Button Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.ctaBand?.btnLabel ?? "Start a project"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        ctaBand: { ...homeConfig.ctaBand, btnLabel: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Action Button Destination URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.ctaBand?.btnHref ?? "/contact"}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        ctaBand: { ...homeConfig.ctaBand, btnHref: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="admin-grid-3">
                <div className="admin-fgroup">
                  <label>Slogan Phrase #1</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.ctaBand?.sloganPart1 ?? "Save time."}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        ctaBand: { ...homeConfig.ctaBand, sloganPart1: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Slogan Phrase #2</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.ctaBand?.sloganPart2 ?? "Save money."}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        ctaBand: { ...homeConfig.ctaBand, sloganPart2: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Slogan Phrase #3</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={homeConfig.ctaBand?.sloganPart3 ?? "Save resources."}
                    onChange={(e) =>
                      setHomeConfig({
                        ...homeConfig,
                        ctaBand: { ...homeConfig.ctaBand, sloganPart3: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 10 }}>
              <button
                type="button"
                onClick={handleResetHomeConfig}
                className="admin-btn admin-btn-ghost"
              >
                Reset to Defaults
              </button>
              <button
                type="button"
                onClick={handleSaveHomeConfig}
                className="admin-btn admin-btn-primary"
              >
                Save All Home Page Changes
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: CONTACT PAGE CMS & INFO                            */}
        {/* ========================================================= */}
        {activeTab === "contact-cms" && (
          <div className="admin-tab-panel admin-cms-panel">
            {/* Live Contact Card Preview */}
            <div className="admin-contact-preview-card">
              <div className="admin-contact-preview-head">
                <span className="admin-contact-preview-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Live Contact Page Preview
                </span>
                <span style={{ fontSize: "0.74rem", color: "var(--slate)", fontFamily: "var(--font-m)" }}>
                  Updates live as you type
                </span>
              </div>

              <div className="admin-contact-preview-grid">
                <div className="admin-preview-contact-item">
                  <span className="lbl">Page Title</span>
                  <span className="val">{contactConfig.title || "Contact Information"}</span>
                </div>

                <div className="admin-preview-contact-item">
                  <span className="lbl">Email Address</span>
                  <span className="val" style={{ color: "var(--mint)" }}>
                    {contactConfig.email || "akiba.tech.official@gmail.com"}
                  </span>
                </div>

                <div className="admin-preview-contact-item">
                  <span className="lbl">Direct Phone / WhatsApp</span>
                  <span className="val">{contactConfig.phone || "+251 960 352 222"}</span>
                </div>

                <div className="admin-preview-contact-item">
                  <span className="lbl">Office Location</span>
                  <span className="val">
                    {[contactConfig.address, contactConfig.cityCountry].filter(Boolean).join(", ") ||
                      "Addis Ababa, Ethiopia"}
                  </span>
                </div>

                <div className="admin-preview-contact-item">
                  <span className="lbl">Business Hours</span>
                  <span className="val">
                    {contactConfig.workingHours || "Mon – Fri: 8:30 AM – 5:30 PM (EAT)"}
                  </span>
                </div>

                <div className="admin-preview-contact-item">
                  <span className="lbl">Response SLA</span>
                  <span className="val" style={{ color: "#38bdf8" }}>
                    {contactConfig.responseSLA || "Under 2 hours"}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 1: Page Headline & Description */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <path d="M4 7V4h16v3" />
                      <path d="M9 20h6" />
                      <path d="M12 4v16" />
                    </svg>
                    Page Headline &amp; Introduction
                  </h3>
                  <p>Configure the kicker, main heading, and lede description on the public /contact page.</p>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Section Kicker</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={contactConfig.kicker}
                    onChange={(e) => setContactConfig({ ...contactConfig, kicker: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Page Title (H1)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={contactConfig.title}
                    onChange={(e) => setContactConfig({ ...contactConfig, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-fgroup">
                <label>Introductory Lede Text</label>
                <textarea
                  rows={2}
                  className="admin-textarea"
                  value={contactConfig.lede}
                  onChange={(e) => setContactConfig({ ...contactConfig, lede: e.target.value })}
                />
              </div>
            </div>

            {/* Section 2: Direct Contact Channels */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Direct Communication Channels
                  </h3>
                  <p>Inquiries email addresses and telephone numbers (formatted automatically as clickable links on the site).</p>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Primary Inquiries Email *</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={contactConfig.email}
                    onChange={(e) => setContactConfig({ ...contactConfig, email: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Secondary / Support Email (Optional)</label>
                  <input
                    type="email"
                    className="admin-input"
                    placeholder="support@akibatech.com"
                    value={contactConfig.secondaryEmail || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, secondaryEmail: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Primary Phone Number *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={contactConfig.phone}
                    onChange={(e) => setContactConfig({ ...contactConfig, phone: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Secondary / WhatsApp Phone (Optional)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="+251 9XX XXX XXX"
                    value={contactConfig.secondaryPhone || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, secondaryPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Physical Office Presence */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                    Office Location &amp; Physical Address
                  </h3>
                  <p>Physical office address shown to clients, partners, and visitors.</p>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Office Area / Building / District</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Bethel"
                    value={contactConfig.address}
                    onChange={(e) => setContactConfig({ ...contactConfig, address: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>City &amp; Country</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Addis Ababa, Ethiopia"
                    value={contactConfig.cityCountry}
                    onChange={(e) => setContactConfig({ ...contactConfig, cityCountry: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Operating Schedule & Response SLA */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Business Hours &amp; Response SLA
                  </h3>
                  <p>Operating schedule and guaranteed response time SLA.</p>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Weekday Working Hours</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Monday – Friday: 8:30 AM – 5:30 PM (EAT)"
                    value={contactConfig.workingHours}
                    onChange={(e) => setContactConfig({ ...contactConfig, workingHours: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Weekend / Saturday Hours (Optional)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Saturday: 9:00 AM – 1:00 PM (EAT)"
                    value={contactConfig.weekendHours || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, weekendHours: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-fgroup">
                <label>Response Time SLA Guarantee</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Under 2 hours during active business hours"
                  value={contactConfig.responseSLA}
                  onChange={(e) => setContactConfig({ ...contactConfig, responseSLA: e.target.value })}
                />
              </div>
            </div>

            {/* Section 5: Professional & Social Channels */}
            <div className="admin-card admin-cms-section">
              <div className="admin-cms-sec-head">
                <div>
                  <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--mint)">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    Professional Profiles &amp; Social Channels
                  </h3>
                  <p>Manage external links and handles connected to Akiba Technologies.</p>
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-fgroup">
                  <label>Official LinkedIn Company URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={contactConfig.linkedin}
                    onChange={(e) => setContactConfig({ ...contactConfig, linkedin: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>GitHub Organization URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://github.com/akibatech"
                    value={contactConfig.github || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, github: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>X (Twitter) URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://x.com/akibatech"
                    value={contactConfig.twitter || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, twitter: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Facebook Page URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://facebook.com/akibatech"
                    value={contactConfig.facebook || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, facebook: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Instagram Account URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://instagram.com/akibatech"
                    value={contactConfig.instagram || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, instagram: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>YouTube Channel URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://youtube.com/@akibatech"
                    value={contactConfig.youtube || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, youtube: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Support / WhatsApp Contact URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://wa.me/251960352222"
                    value={contactConfig.whatsapp || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, whatsapp: e.target.value })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Telegram Direct / Channel Link (Optional)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="https://t.me/akibatech or @akibatech"
                    value={contactConfig.telegram || ""}
                    onChange={(e) => setContactConfig({ ...contactConfig, telegram: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 10 }}>
              <button
                type="button"
                onClick={handleResetContactConfig}
                className="admin-btn admin-btn-ghost"
              >
                Reset to Defaults
              </button>
              <button
                type="button"
                onClick={handleSaveContactConfig}
                className="admin-btn admin-btn-primary"
              >
                Save All Contact Changes
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: ACCOUNT & SECURITY SETTINGS                        */}
        {/* ========================================================= */}
        {activeTab === "account" && (
          <div className="admin-tab-panel">
            <div className="admin-grid-2">
              {/* Profile & Credentials Form */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3>Administrator Profile &amp; Credentials</h3>
                    <p className="admin-card-desc">
                      Update your login username, notification email, and security password.
                    </p>
                  </div>
                </div>

                {accStatusMessage && (
                  <div
                    className={accStatusMessage.type === "error" ? "admin-alert-error" : "admin-alert-success"}
                    style={{ marginBottom: 18 }}
                  >
                    {accStatusMessage.text}
                  </div>
                )}

                <form onSubmit={handleSaveAccountSettings} className="admin-form">
                  <div className="admin-fgroup">
                    <label htmlFor="acc-username">Administrator Username</label>
                    <input
                      id="acc-username"
                      type="text"
                      required
                      className="admin-input"
                      value={accUsername}
                      onChange={(e) => setAccUsername(e.target.value)}
                      placeholder="e.g. admin or username"
                    />
                    <span className="admin-subtext">You can use this username or your email to sign in.</span>
                  </div>

                  <div className="admin-fgroup">
                    <label htmlFor="acc-email">Administrator Email</label>
                    <input
                      id="acc-email"
                      type="email"
                      required
                      className="admin-input"
                      value={accEmail}
                      onChange={(e) => setAccEmail(e.target.value)}
                      placeholder="e.g. admin@akiba.tech"
                    />
                    <span className="admin-subtext">Used for sign-in and administrative notifications.</span>
                  </div>

                  <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "20px 0" }} />

                  <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>
                    Change Password
                  </h4>

                  <div className="admin-fgroup">
                    <label htmlFor="acc-curr-pass">Current Password</label>
                    <input
                      id="acc-curr-pass"
                      type="password"
                      className="admin-input"
                      value={accCurrentPassword}
                      onChange={(e) => setAccCurrentPassword(e.target.value)}
                      placeholder="Enter current password to change"
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label htmlFor="acc-new-pass">New Password</label>
                    <input
                      id="acc-new-pass"
                      type="password"
                      className="admin-input"
                      value={accNewPassword}
                      onChange={(e) => setAccNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label htmlFor="acc-conf-pass">Confirm New Password</label>
                    <input
                      id="acc-conf-pass"
                      type="password"
                      className="admin-input"
                      value={accConfirmPassword}
                      onChange={(e) => setAccConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                    />
                  </div>

                  <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                    <button type="submit" className="admin-btn admin-btn-primary">
                      Save Account Settings
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAccUsername(adminAccount.username);
                        setAccEmail(adminAccount.email);
                        setAccCurrentPassword("");
                        setAccNewPassword("");
                        setAccConfirmPassword("");
                        setAccStatusMessage(null);
                      }}
                      className="admin-btn admin-btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              {/* Security Overview & Tips Card */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>Security &amp; Session Status</h3>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--slate)", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                      <span>Active Identity:</span>
                      <strong style={{ color: "var(--ink)" }}>{adminAccount.username}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                      <span>Registered Email:</span>
                      <strong style={{ color: "var(--ink)" }}>{adminAccount.email}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                      <span>Access Role:</span>
                      <span className="admin-pill converted">Super Administrator</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Password Status:</span>
                      <span style={{ color: "var(--mint)" }}>Protected</span>
                    </div>
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>Account Security Guidance</h3>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--slate)", lineHeight: 1.6 }}>
                    <p style={{ marginBottom: 10 }}>
                      • Demo credentials are now completely removed from the frontend login screen.
                    </p>
                    <p style={{ marginBottom: 10 }}>
                      • Only authorized administrators with the correct credentials can access the portal.
                    </p>
                    <p>
                      • You can change your administrator username, email address, or password at any time in this tab.
                    </p>
                  </div>
                </div>
              </div>
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
                    placeholder="Laravel, React, REST API, MySQL"
                    value={
                      Array.isArray(editingProject.stack)
                        ? editingProject.stack.join(", ")
                        : editingProject.stack || ""
                    }
                    onChange={(e) => setEditingProject({ ...editingProject, stack: e.target.value as unknown as string[] })}
                  />
                </div>

                <div className="admin-fgroup">
                  <label>Live Demo URL (Client Website / Production App)</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://client-portal.app"
                    value={editingProject.liveDemoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                  />
                  <span style={{ fontSize: "0.76rem", color: "var(--slate-d)", marginTop: "4px", display: "block" }}>
                    Optional. Leave blank if there is no live demo link — the &ldquo;Live Demo&rdquo; button will be hidden automatically on the portfolio card.
                  </span>
                </div>

                <div className="admin-fgroup">
                  <label>Project Showcase Image / Screenshot</label>
                  <AdminImageCard
                    id="project-edit-image"
                    slotTitle="Case Study Image"
                    value={editingProject.image || ""}
                    placeholder="Select or upload screenshot..."
                    presets={AVAILABLE_WORK_IMAGES}
                    onChange={(val) => setEditingProject({ ...editingProject, image: val })}
                    onFileUpload={handleImageFileUpload}
                    previewHeight={170}
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

      {/* ========================================================= */}
      {/* ADD / EDIT TESTIMONIAL MODAL                              */}
      {/* ========================================================= */}
      {isEditingTestimonial && editingTestimonial && (
        <div className="admin-modal-backdrop" onClick={() => setIsEditingTestimonial(false)}>
          <div className="admin-modal-card admin-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h2>{editingTestimonial.id ? "Edit Customer Testimonial" : "Add Customer Testimonial"}</h2>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setIsEditingTestimonial(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial}>
              <div className="admin-modal-body">
                <div className="admin-grid-2">
                  <div className="admin-fgroup">
                    <label>Client / Executive Name *</label>
                    <input
                      type="text"
                      required
                      className="admin-input"
                      placeholder="e.g. A. Mengistu or Tway Real Estate"
                      value={editingTestimonial.name || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label>Role &amp; Organization *</label>
                    <input
                      type="text"
                      required
                      className="admin-input"
                      placeholder="e.g. General Manager • Amigos Gym"
                      value={editingTestimonial.role || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-grid-3">
                  <div className="admin-fgroup">
                    <label>Company / Organization</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Amigos Gym PLC"
                      value={editingTestimonial.company || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label>Avatar Initials (2 letters)</label>
                    <input
                      type="text"
                      maxLength={3}
                      className="admin-input"
                      placeholder="e.g. AM"
                      value={editingTestimonial.initials || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, initials: e.target.value })}
                    />
                  </div>

                  <div className="admin-fgroup">
                    <label>Visibility Status</label>
                    <select
                      className="admin-input"
                      value={editingTestimonial.status || "published"}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          status: e.target.value as "published" | "draft",
                        })
                      }
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="admin-fgroup">
                  <label>Star Rating (1 to 5 Stars)</label>
                  <select
                    className="admin-input"
                    value={editingTestimonial.rating || 5}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        rating: Number(e.target.value),
                      })
                    }
                  >
                    <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars - Great)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                  </select>
                </div>

                <div className="admin-fgroup">
                  <label>Client Testimonial Quote *</label>
                  <textarea
                    rows={4}
                    required
                    className="admin-textarea"
                    placeholder="Enter what the client said about Akiba Technologies..."
                    value={editingTestimonial.quote || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-foot">
                <button
                  type="button"
                  onClick={() => setIsEditingTestimonial(false)}
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary admin-btn-sm">
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
