import React, { useState } from 'react';

const TEETH_UPPER = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const TEETH_LOWER = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

const TOOTH_CONDITIONS = [
  { code: "H", label: "Здоров", color: "#22c55e" },
  { code: "K", label: "Кариес", color: "#f59e0b" },
  { code: "P", label: "Пульпит", color: "#f97316" },
  { code: "Pt", label: "Периодонтит", color: "#ef4444" },
  { code: "R", label: "Корень", color: "#8b5cf6" },
  { code: "O", label: "Отсутствует", color: "#94a3b8" },
  { code: "I", label: "Имплант", color: "#06b6d4" },
  { code: "K/C", label: "Коронка", color: "#3b82f6" },
  { code: "П", label: "Пломба", color: "#10b981" },
];

const DRUGS = [
  {
    category: "Анестетики", icon: "💉",
    items: [
      { name: "Артикаин (Ультракаин)", dose: "1.7–3.4 мл (1–2 карп.)", note: "Мax 7 мг/кг. С эпинефрином 1:100 000 или 1:200 000" },
      { name: "Лидокаин 2%", dose: "2–5 мл", note: "Мax 4.4 мг/кг, не более 300 мг" },
      { name: "Мепивакаин 3%", dose: "1.7–3.4 мл", note: "Без вазоконстриктора. Мax 6.6 мг/кг" },
    ]
  },
  {
    category: "Антибиотики", icon: "💊",
    items: [
      { name: "Амоксициллин", dose: "500 мг × 3 р/сут", note: "Курс 5–7 дней. При аллергии — азитромицин" },
      { name: "Линкомицин", dose: "500 мг × 3 р/сут", note: "При непереносимости пенициллинов" },
      { name: "Метронидазол", dose: "500 мг × 3 р/сут", note: "Часто в комбинации с амоксициллином" },
      { name: "Клиндамицин", dose: "300 мг × 4 р/сут", note: "Резервный, при тяжёлых инфекциях" },
    ]
  },
  {
    category: "НПВС / Анальгетики", icon: "🩹",
    items: [
      { name: "Ибупрофен", dose: "400–600 мг × 3 р/сут", note: "После еды. Мax 2400 мг/сут" },
      { name: "Кеторолак", dose: "10 мг × 3–4 р/сут", note: "Не более 5 дней. Мощный анальгетик" },
      { name: "Нимесулид", dose: "100 мг × 2 р/сут", note: "После еды. Мax 200 мг/сут" },
      { name: "Парацетамол", dose: "500–1000 мг × 4 р/сут", note: "Мax 4 г/сут. Безопасен при язве" },
    ]
  },
  {
    category: "Антисептики", icon: "🧪",
    items: [
      { name: "Хлоргексидин 0.05–0.2%", dose: "Полоскание 1 мин × 2 р/сут", note: "Курс до 14 дней" },
      { name: "Мирамистин 0.01%", dose: "Орошение / полоскание", note: "Широкий спектр, включая вирусы" },
      { name: "Перекись водорода 3%", dose: "Промывание раны", note: "Разводить 1:1 с водой для полоскания" },
    ]
  },
  {
    category: "Гемостатики", icon: "🔴",
    items: [
      { name: "Капрофер", dose: "Местно на тампон", note: "Химическая коагуляция" },
      { name: "Адреналин 0.1%", dose: "Местно на тампон (1–2 кап)", note: "Вазоконстрикция, кратковременно" },
      { name: "Альвожил / Альвостаз", dose: "Заполнить лунку", note: "При альвеолите" },
    ]
  },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [toothStates, setToothStates] = useState({});
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(TOOTH_CONDITIONS[0]);
  const [drugSearch, setDrugSearch] = useState("");
  const [expandedDrug, setExpandedDrug] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState("Анестетики");

  const applyCondition = () => {
    if (!selectedTooth) return;
    setToothStates(prev => ({ ...prev, [selectedTooth]: selectedCondition }));
    setSelectedTooth(null);
  };

  const getToothColor = (num) => {
    const state = toothStates[num];
    return state ? state.color : "#e2e8f0";
  };

  const filteredDrugs = DRUGS.map(cat => ({
    ...cat,
    items: cat.items.filter(d =>
      d.name.toLowerCase().includes(drugSearch.toLowerCase()) ||
      d.dose.toLowerCase().includes(drugSearch.toLowerCase())
    )
  })).filter(cat => drugSearch === "" || cat.items.length > 0);

  const s = {
    app: { fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", background: "#0f172a", minHeight: "100vh", color: "#f1f5f9", maxWidth: 430, margin: "0 auto", position: "relative" },
    card: { background: "#1e293b", borderRadius: 16, padding: 14, border: "1px solid #334155" },
    backBtn: { background: "#1e293b", border: "1px solid #334155", borderRadius: 10, width: 36, height: 36, color: "#94a3b8", cursor: "pointer", fontSize: 18 },
    page: { padding: "16px 16px 100px" },
  };

  return (
    <div style={s.app}>
      <div style={{ height: 44, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6 }}><span>●●●</span><span>WiFi</span><span>🔋</span></div>
      </div>

      {/* HOME */}
      {screen === "home" && (
        <div style={{ padding: "20px 20px 100px" }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>Добро пожаловать</p>
            <h1 style={{ margin: "4px 0 0", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>DentAssist <span style={{ color: "#38bdf8" }}>Pro</span></h1>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Зубов отмечено", value: Object.keys(toothStates).length, icon: "🦷" },
              { label: "Препаратов в базе", value: DRUGS.reduce((a, c) => a + c.items.length, 0), icon: "💊" },
            ].map(stat => (
              <div key={stat.label} style={{ ...s.card }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{stat.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#38bdf8" }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { id: "odonto", icon: "🦷", title: "Одонтограмма", desc: "Интерактивная формула зубов", color: "#0ea5e9" },
              { id: "drugs", icon: "💊", title: "Справочник препаратов", desc: "Дозировки и показания", color: "#8b5cf6" },
            ].map(item => (
              <button key={item.id} onClick={() => setScreen(item.id)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 18, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, border: `1px solid ${item.color}44` }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: "#f1f5f9" }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{item.desc}</div>
                </div>
                <div style={{ marginLeft: "auto", color: "#334155", fontSize: 20 }}>›</div>
              </button>
            ))}
          </div>
          <div style={{ ...s.card, marginTop: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>Условные обозначения</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TOOTH_CONDITIONS.map(c => (
                <div key={c.code} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                  <span style={{ color: "#94a3b8" }}>{c.code} — {c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ODONTOGRAM */}
      {screen === "odonto" && (
        <div style={s.page}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <button onClick={() => setScreen("home")} style={s.backBtn}>‹</button>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Одонтограмма</h2>
          </div>
          <div style={{ ...s.card, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Выберите состояние</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TOOTH_CONDITIONS.map(c => (
                <button key={c.code} onClick={() => setSelectedCondition(c)} style={{ padding: "5px 10px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", background: selectedCondition.code === c.code ? c.color : "#0f172a", color: selectedCondition.code === c.code ? "#fff" : "#94a3b8", border: `1px solid ${selectedCondition.code === c.code ? c.color : "#334155"}` }}>
                  {c.code} {c.label}
                </button>
              ))}
            </div>
          </div>
          {[{ label: "Верхняя челюсть", teeth: TEETH_UPPER }, { label: "Нижняя челюсть", teeth: TEETH_LOWER }].map(jaw => (
            <div key={jaw.label} style={{ ...s.card, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{jaw.label}</div>
              <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 4 }}>
                {jaw.teeth.map(num => {
                  const cond = toothStates[num];
                  const isSelected = selectedTooth === num;
                  return (
                    <div key={num} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flexShrink: 0 }}>
                      <div style={{ fontSize: 9, color: "#475569" }}>{num}</div>
                      <div onClick={() => setSelectedTooth(num)} style={{ width: 34, height: 38, borderRadius: 8, background: isSelected ? selectedCondition.color : getToothColor(num), cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: (cond || isSelected) ? "#fff" : "#64748b", border: isSelected ? "2px solid white" : "2px solid transparent", boxShadow: isSelected ? `0 0 12px ${selectedCondition.color}` : "none" }}>
                        {cond ? cond.code : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {selectedTooth && (
            <div style={{ position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)", width: 390, padding: "0 16px", zIndex: 50 }}>
              <button onClick={applyCondition} style={{ width: "100%", padding: 14, borderRadius: 14, background: selectedCondition.color, color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: `0 4px 20px ${selectedCondition.color}66` }}>
                Зуб {selectedTooth}: отметить как «{selectedCondition.label}»
              </button>
            </div>
          )}
          {Object.keys(toothStates).length > 0 && (
            <div style={s.card}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Отмеченные зубы</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Object.entries(toothStates).map(([num, cond]) => (
                  <div key={num} style={{ padding: "4px 10px", borderRadius: 8, fontSize: 12, background: `${cond.color}22`, color: cond.color, border: `1px solid ${cond.color}44` }}>
                    {num}: {cond.label}
                  </div>
                ))}
              </div>
              <button onClick={() => setToothStates({})} style={{ marginTop: 12, padding: "8px 14px", borderRadius: 8, fontSize: 12, background: "#0f172a", color: "#ef4444", border: "1px solid #ef444433", cursor: "pointer" }}>
                Сбросить всё
              </button>
            </div>
          )}
        </div>
      )}

      {/* DRUGS */}
      {screen === "drugs" && (
        <div style={s.page}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <button onClick={() => setScreen("home")} style={s.backBtn}>‹</button>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Справочник препаратов</h2>
          </div>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: 16 }}>🔍</span>
            <input value={drugSearch} onChange={e => setDrugSearch(e.target.value)} placeholder="Поиск препарата..." style={{ width: "100%", padding: "12px 14px 12px 40px", background: "#1e293b", border: "1px solid #334155", borderRadius: 12, color: "#f1f5f9", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
          </div>
          {drugSearch === "" && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 2 }}>
              {DRUGS.map(cat => (
                <button key={cat.category} onClick={() => setExpandedCategory(cat.category)} style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", background: expandedCategory === cat.category ? "#0ea5e9" : "#1e293b", color: expandedCategory === cat.category ? "#fff" : "#64748b", border: expandedCategory === cat.category ? "1px solid #0ea5e9" : "1px solid #334155" }}>
                  {cat.icon} {cat.category}
                </button>
              ))}
            </div>
          )}
          {filteredDrugs.map(cat => {
            const isOpen = drugSearch !== "" || expandedCategory === cat.category;
            return (
              <div key={cat.category} style={{ marginBottom: 12 }}>
                {drugSearch !== "" && <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{cat.icon} {cat.category}</div>}
                {isOpen && cat.items.map((drug, i) => {
                  const key = `${cat.category}-${i}`;
                  return (
                    <div key={i} onClick={() => setExpandedDrug(expandedDrug === key ? null : key)} style={{ background: "#1e293b", borderRadius: 14, padding: "14px 16px", marginBottom: 8, border: "1px solid #334155", cursor: "pointer" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 15, color: "#f1f5f9" }}>{drug.name}</div>
                          <div style={{ fontSize: 13, color: "#38bdf8", marginTop: 3, fontWeight: 500 }}>{drug.dose}</div>
                        </div>
                        <span style={{ color: "#475569", fontSize: 16 }}>{expandedDrug === key ? "▲" : "▼"}</span>
                      </div>
                      {expandedDrug === key && (
                        <div style={{ marginTop: 10, padding: "10px 12px", background: "#0f172a", borderRadius: 10, fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
                          📝 {drug.note}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 430, background: "#1e293b", borderTop: "1px solid #334155", display: "flex", padding: "10px 0 20px", zIndex: 100 }}>
        {[
          { id: "home", icon: "🏠", label: "Главная" },
          { id: "odonto", icon: "🦷", label: "Зубы" },
          { id: "drugs", icon: "💊", label: "Препараты" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setScreen(tab.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", color: screen === tab.id ? "#38bdf8" : "#475569" }}>
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600 }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
