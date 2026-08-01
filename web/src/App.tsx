import { useMemo, useState } from "react";

import {
  getQuestionById,
  getQuestionsForTopic,
  getVehicleById,
  knowledgeTopics,
  questions,
  sampleVehicles,
  searchSettings,
  type IconName,
  type Question,
  type Vehicle,
  type VehicleSetting
} from "./data/vehicleData";
import "./styles.css";

type View = "garage" | "vehicle" | "knowledge" | "question" | "settings";

interface IconProps {
  name: IconName;
}

const iconPaths: Record<IconName, React.ReactNode> = {
  garage: <path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9Z M7 21v-7h10v7 M8.5 10h7" />,
  vehicle: <path d="m5 11 1.8-4.2A3 3 0 0 1 9.6 5h4.8a3 3 0 0 1 2.8 1.8L19 11 M4 11h16a1 1 0 0 1 1 1v5H3v-5a1 1 0 0 1 1-1Z M5 17v2 M19 17v2 M7 14h.01 M17 14h.01" />,
  knowledge: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z" />,
  settings: <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3.05 14H3v-4h.08a1.7 1.7 0 0 0 1.56-1.03 1.7 1.7 0 0 0-.34-1.88l-.06-.06L7.07 4.2l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3h4v.08A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9 1.7 1.7 0 0 0 20.95 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" />,
  display: <path d="M4 5h16v11H4z M8 20h8 M12 16v4 M8 10h2l1.5 2 2.5-4 2 3h1" />,
  comfort: <path d="M12 3v18 M5.6 6.7l12.8 10.6 M18.4 6.7 5.6 17.3 M8.5 4.5 12 7l3.5-2.5 M8.5 19.5 12 17l3.5 2.5" />,
  profile: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4.5 21a7.5 7.5 0 0 1 15 0 M18 5h3 M19.5 3.5v3" />,
  homelink: <path d="M3 11.5 12 4l9 7.5 M5 10v10h14V10 M9 20v-6h6v6 M8 9.5c1-1 2.4-1.5 4-1.5s3 .5 4 1.5 M10 11.5c.5-.5 1.2-.8 2-.8s1.5.3 2 .8" />,
  accessory: <path d="M6 3h12l3 5-9 13L3 8l3-5Z M3 8h18 M8 3l4 5 4-5" />,
  software: <path d="M8 3h8v4H8z M6 7h12a2 2 0 0 1 2 2v10H4V9a2 2 0 0 1 2-2Z M9 12h6 M12 9v6" />,
  safety: <path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.9 7.5 9.5 4.3-1.6 7.5-4.9 7.5-9.5V6L12 3Z M9 12l2 2 4-5" />,
  maintenance: <path d="M14.8 6.2a4 4 0 0 0-5 5L4 17l3 3 5.8-5.8a4 4 0 0 0 5-5L16 11l-3-3 1.8-1.8Z" />
};

function Icon({ name }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {iconPaths[name]}
    </svg>
  );
}

function StatusPill() {
  return (
    <span className="status-pill">
      <span className="status-dot" />
      Research backlog
    </span>
  );
}

function VehiclePhoto({ vehicle }: { vehicle: Vehicle }) {
  const presentation = vehicle.imageSrc.endsWith(".jpg") ? "scene" : "cutout";
  return (
    <div className={`vehicle-photo vehicle-photo-${presentation}`}>
      <img alt={vehicle.imageAlt} src={vehicle.imageSrc} />
    </div>
  );
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-lede">{description}</p>
    </header>
  );
}

interface GaragePageProps {
  onOpenVehicle: (vehicleId: string) => void;
}

function GaragePage({ onOpenVehicle }: GaragePageProps) {
  return (
    <section className="page page-enter">
      <PageHeader
        eyebrow={`${sampleVehicles.length} vehicles · local prototype`}
        title="Your garage"
        description="Choose the vehicle you are standing beside. Every guide, setting, and source check stays tied to that exact profile."
      />

      <div className="garage-grid">
        {sampleVehicles.map((vehicle, index) => (
          <button
            aria-label={`Open ${vehicle.nickname}`}
            className={`vehicle-card ${index === 0 ? "vehicle-card-featured" : ""}`}
            key={vehicle.id}
            onClick={() => onOpenVehicle(vehicle.id)}
            type="button"
          >
            <div className="vehicle-card-topline">
              <span className="sequence">Vehicle {String(index + 1).padStart(2, "0")}</span>
              <StatusPill />
            </div>
            <VehiclePhoto vehicle={vehicle} />
            <div className="vehicle-card-copy">
              <div>
                <p className="vehicle-year">{vehicle.year} {vehicle.make}</p>
                <h2>{vehicle.nickname}</h2>
                <p>{vehicle.model} · {vehicle.trim}</p>
              </div>
              <span className="open-mark" aria-hidden="true">↗</span>
            </div>
            <div className="vehicle-card-meta">
              <span>{vehicle.exteriorColor}</span>
              <span className="mono">{vehicle.displayVin}</span>
            </div>
          </button>
        ))}
      </div>

      <aside className="prototype-note">
        <span className="note-index">01</span>
        <div>
          <strong>Built for validation</strong>
          <p>All vehicle content is local sample data. Guidance remains visibly marked until an applicable Mazda source is attached and reviewed.</p>
        </div>
      </aside>
    </section>
  );
}

interface VehiclePageProps {
  vehicle: Vehicle;
  onBrowseKnowledge: () => void;
  onExploreSettings: () => void;
  onOpenQuestion: (questionId: string) => void;
}

function VehiclePage({
  vehicle,
  onBrowseKnowledge,
  onExploreSettings,
  onOpenQuestion
}: VehiclePageProps) {
  const recentQuestions = vehicle.recentQuestionIds
    .map(getQuestionById)
    .filter((question): question is Question => Boolean(question));

  return (
    <section className="page page-enter">
      <PageHeader
        eyebrow={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        title={vehicle.nickname}
        description="A vehicle-specific home for the questions, settings, and evidence that apply to this CX-5."
      />

      <div className="dossier-card">
        <div className="dossier-copy">
          <StatusPill />
          <p className="dossier-label">Vehicle dossier</p>
          <h2>{vehicle.trim}</h2>
          <dl className="vehicle-facts">
            <div><dt>Owner</dt><dd>{vehicle.ownerName}</dd></div>
            <div><dt>Exterior</dt><dd>{vehicle.exteriorColor}</dd></div>
            <div><dt>VIN</dt><dd className="mono">{vehicle.displayVin}</dd></div>
            <div><dt>Market</dt><dd>U.S. sample</dd></div>
          </dl>
        </div>
        <div className="dossier-visual">
          <VehiclePhoto vehicle={vehicle} />
          <div className="content-meter">
            <span className="meter-value">{vehicle.contentProgress}%</span>
            <span>research mapped</span>
          </div>
        </div>
      </div>

      <div className="action-pair">
        <button className="action-panel action-panel-dark" onClick={onBrowseKnowledge} type="button">
          <Icon name="knowledge" />
          <span><strong>Browse knowledge</strong><small>Start with a real owner question</small></span>
          <span aria-hidden="true">→</span>
        </button>
        <button className="action-panel" onClick={onExploreSettings} type="button">
          <Icon name="settings" />
          <span><strong>Explore settings</strong><small>Find controls in plain language</small></span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Continue exploring</p><h2>Recent questions</h2></div>
          <span className="mono">{String(recentQuestions.length).padStart(2, "0")}</span>
        </div>
        <div className="question-stack">
          {recentQuestions.map((question) => (
            <button className="question-row" key={question.id} onClick={() => onOpenQuestion(question.id)} type="button">
              <span><small>{question.eyebrow}</small><strong>{question.title}</strong></span>
              <span className="row-state">Researching</span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

interface KnowledgePageProps {
  onOpenQuestion: (questionId: string) => void;
  vehicle: Vehicle;
}

function KnowledgePage({ onOpenQuestion, vehicle }: KnowledgePageProps) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase();
  const visibleQuestions = questions.filter((question) =>
    [question.title, question.eyebrow].join(" ").toLocaleLowerCase().includes(normalized)
  );

  if (vehicle.year !== 2026) {
    return (
      <section className="page page-enter">
        <PageHeader
          eyebrow={`${vehicle.year} ${vehicle.make} ${vehicle.model} · ${vehicle.trim}`}
          title="2024 research track"
          description="The official 2024 owner, Mazda Connect, navigation, and connected-services manuals are cataloged separately for this vehicle."
        />
        <ResearchTrackNotice vehicle={vehicle} />
      </section>
    );
  }

  return (
    <section className="page page-enter">
      <PageHeader
        eyebrow="Question-led guidance"
        title="Knowledge topics"
        description="Browse by the thing you are trying to understand—not by the chapter structure of a conventional manual."
      />

      <label className="search-field">
        <span className="sr-only">Search questions</span>
        <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
        <input onChange={(event) => setQuery(event.target.value)} placeholder="Search questions, controls, or features" type="search" value={query} />
        <kbd>⌘ K</kbd>
      </label>

      {!normalized && (
        <div className="topic-grid">
          {knowledgeTopics.map((topic) => {
            const topicQuestions = getQuestionsForTopic(topic.id);
            return (
              <article className="topic-card" key={topic.id}>
                <div className="topic-icon"><Icon name={topic.icon} /></div>
                <h2>{topic.title}</h2>
                <p>{topic.description}</p>
                <span className="topic-count">{topicQuestions.length} {topicQuestions.length === 1 ? "question" : "questions"}</span>
              </article>
            );
          })}
        </div>
      )}

      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Research queue</p><h2>{normalized ? "Search results" : "Owner questions"}</h2></div>
          <span className="mono">{String(visibleQuestions.length).padStart(2, "0")}</span>
        </div>
        <div className="question-stack">
          {visibleQuestions.map((question) => (
            <button
              aria-label={question.title}
              className="question-row"
              key={question.id}
              onClick={() => onOpenQuestion(question.id)}
              type="button"
            >
              <span><small>{question.eyebrow}</small><strong>{question.title}</strong></span>
              <span className="row-state">Needs source</span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

interface QuestionPageProps {
  question: Question;
  onBack: () => void;
  onOpenQuestion: (questionId: string) => void;
}

function QuestionPage({ question, onBack, onOpenQuestion }: QuestionPageProps) {
  const related = question.relatedQuestionIds
    .map(getQuestionById)
    .filter((item): item is Question => Boolean(item));

  return (
    <article className="page question-page page-enter">
      <button className="text-button" onClick={onBack} type="button">← Back to knowledge</button>
      <header className="question-header">
        <p className="eyebrow">{question.eyebrow}</p>
        <h1>{question.title}</h1>
        <p className="applicability">{question.applicability}</p>
      </header>

      <div className="verification-band">
        <div className="verification-icon"><Icon name="safety" /></div>
        <div>
          <strong>Needs source verification</strong>
          <p>This prototype does not present unverified vehicle instructions as fact.</p>
        </div>
      </div>

      <div className="answer-layout">
        <section className="answer-card">
          <p className="eyebrow">Prototype answer</p>
          <h2>What we can say now</h2>
          <p className="answer-copy">{question.shortAnswer}</p>
          <div className="research-next">
            <span className="note-index">02</span>
            <div><strong>Next research step</strong><p>{question.nextResearchStep}</p></div>
          </div>
        </section>
        <aside className="source-card">
          <p className="eyebrow">Evidence</p>
          <h2>Source record</h2>
          <dl>
            <div><dt>Status</dt><dd>Not attached</dd></div>
            <div><dt>Model year</dt><dd>2026</dd></div>
            <div><dt>Market</dt><dd>U.S.</dd></div>
            <div><dt>Last reviewed</dt><dd>Not reviewed</dd></div>
          </dl>
          <p className="source-rule">Publication requires a title, version or date, section, and applicability review.</p>
        </aside>
      </div>

      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2>Related questions</h2></div></div>
        <div className="question-stack">
          {related.map((item) => (
            <button className="question-row" key={item.id} onClick={() => onOpenQuestion(item.id)} type="button">
              <span><small>{item.eyebrow}</small><strong>{item.title}</strong></span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}

interface SettingsPageProps {
  vehicle: Vehicle;
}

function SettingsPage({ vehicle }: SettingsPageProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSettings(query), [query]);
  const [selectedId, setSelectedId] = useState("driver-personalization-setting");
  const selected = results.find((setting) => setting.id === selectedId) ?? results[0];

  if (vehicle.year !== 2026) {
    return (
      <section className="page page-enter">
        <PageHeader
          eyebrow={`${vehicle.year} ${vehicle.make} ${vehicle.model} · ${vehicle.trim}`}
          title="2024 settings research"
          description="Settings for this model year will be mapped only from the 2024 manuals and verified vehicle behavior."
        />
        <ResearchTrackNotice vehicle={vehicle} />
      </section>
    );
  }

  return (
    <section className="page page-enter">
      <PageHeader
        eyebrow={`${vehicle.nickname} · ${vehicle.trim}`}
        title="Settings explorer"
        description="Search in your own words, then see where a verified setting lives and what else it affects."
      />

      <label className="search-field search-field-strong">
        <span className="sr-only">Search vehicle settings</span>
        <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
        <input onChange={(event) => setQuery(event.target.value)} placeholder="Try “profile,” “doors,” or “software”" type="search" value={query} />
        <span className="result-count">{results.length}</span>
      </label>

      <div className="settings-layout">
        <div className="settings-results" data-testid="settings-results">
          <div className="list-caption"><span>Matching settings</span><span className="mono">{String(results.length).padStart(2, "0")}</span></div>
          {results.map((setting) => (
            <button
              aria-label={`Open ${setting.name} setting`}
              className={`setting-row ${selected?.id === setting.id ? "setting-row-active" : ""}`}
              key={setting.id}
              onClick={() => setSelectedId(setting.id)}
              type="button"
            >
              <span className="setting-system">{setting.system}</span>
              <strong>{setting.name}</strong>
              <p>{setting.description}</p>
              <span className="setting-arrow" aria-hidden="true">→</span>
            </button>
          ))}
          {results.length === 0 && (
            <div className="empty-state"><strong>No matching settings</strong><p>Try a control, system, or behavior such as “doors.”</p></div>
          )}
        </div>

        <SettingDetail setting={selected} />
      </div>
    </section>
  );
}

function ResearchTrackNotice({ vehicle }: { vehicle: Vehicle }) {
  return (
    <aside className="research-track-card">
      <span className="note-index">24</span>
      <div>
        <p className="eyebrow">Source track ready</p>
        <h2>{vehicle.nickname}</h2>
        <p>
          This vehicle stays isolated from the 2026 knowledge and settings
          backlog. The next step is turning the cataloged 2024 sources into
          verified, Select-specific guidance.
        </p>
      </div>
    </aside>
  );
}

function SettingDetail({ setting }: { setting?: VehicleSetting }) {
  if (!setting) {
    return <aside className="setting-detail setting-detail-empty">Choose a result to inspect its path and verification state.</aside>;
  }

  return (
    <aside className="setting-detail">
      <div className="setting-detail-topline"><span>{setting.system}</span><StatusPill /></div>
      <div className="setting-detail-icon"><Icon name="settings" /></div>
      <h2>{setting.name}</h2>
      <p>{setting.description}</p>
      <div className="path-block"><span className="eyebrow">Expected location</span><strong>{setting.menuPath}</strong></div>
      <div className="setting-caution"><Icon name="safety" /><p>The menu path is placeholder content until verified on the 2026 vehicle and against an official source.</p></div>
    </aside>
  );
}

export default function App() {
  const [view, setView] = useState<View>("garage");
  const [selectedVehicleId, setSelectedVehicleId] = useState(sampleVehicles[0].id);
  const [selectedQuestionId, setSelectedQuestionId] = useState(questions[0].id);
  const vehicle = getVehicleById(selectedVehicleId) ?? sampleVehicles[0];
  const question = getQuestionById(selectedQuestionId) ?? questions[0];

  const openVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setView("vehicle");
  };

  const openQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setView("question");
  };

  const navItems: Array<{ label: string; icon: IconName; view: View }> = [
    { label: "Garage", icon: "garage", view: "garage" },
    { label: "Knowledge", icon: "knowledge", view: "knowledge" },
    { label: "Settings", icon: "settings", view: "settings" }
  ];

  const navView = view === "vehicle" ? "garage" : view === "question" ? "knowledge" : view;

  return (
    <div className="app-shell">
      <aside className="app-nav">
        <button className="brand" onClick={() => setView("garage")} type="button">
          <span className="brand-mark" aria-hidden="true">V</span>
          <span><strong>Vehicle</strong><small>Owner companion</small></span>
        </button>

        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              aria-current={navView === item.view ? "page" : undefined}
              className="nav-item"
              key={item.view}
              onClick={() => setView(item.view)}
              type="button"
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-vehicle">
          <span className="vehicle-swatch" />
          <span><small>Active vehicle</small><strong>{vehicle.ownerName}'s CX-5</strong></span>
        </div>
      </aside>

      <main className="app-main">
        <div className="utility-bar">
          <span className="utility-context">{vehicle.year} {vehicle.model} · {vehicle.trim}</span>
          <span className="local-badge">Local prototype</span>
        </div>

        {view === "garage" && <GaragePage onOpenVehicle={openVehicle} />}
        {view === "vehicle" && (
          <VehiclePage
            onBrowseKnowledge={() => setView("knowledge")}
            onExploreSettings={() => setView("settings")}
            onOpenQuestion={openQuestion}
            vehicle={vehicle}
          />
        )}
        {view === "knowledge" && <KnowledgePage onOpenQuestion={openQuestion} vehicle={vehicle} />}
        {view === "question" && (
          <QuestionPage onBack={() => setView("knowledge")} onOpenQuestion={openQuestion} question={question} />
        )}
        {view === "settings" && <SettingsPage vehicle={vehicle} />}
      </main>
    </div>
  );
}
