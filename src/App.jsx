import { useState, useEffect, useCallback } from "react";

/* ═══════════ CONFIG ═══════════ */
const SPREADSHEET_ID = "1uYgfcInCdh2qKAvxVlyFa9P1kzv2vWHPkdvRU5Shh4E";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzhkMYrMVuQhsNr5MmT8Ak7ibFqWeyXqCc80oaPl5t4ecJDX85O9LcgjXfhohePM5nO4g/exec";

const PHOTOS = [
  { id: 7, title: "함께라서 가능했던 도전", description: "서사협 동아리 지원으로 사자모가 2016년 8월 서울~해남 땅끝마을 라이딩 중 목적지인 땅끝마을 표지석 앞에서의 단체사진", image: "/photos/사진7.png" },
  { id: 11, title: "뜨거웠던 그날", description: "2004년 서울복지재단 낙하산 인사 규탄대회", image: "/photos/사진11.png" },
  { id: 13, title: "고된 순례의 여정에서도 더불어 살아가는", description: "서울시사회복지사협회 2023년 힐링캠프 사업의 지원을 받아 다녀온 '산티아고 순례길'의 여정 중, 우연히 마주친 필리핀 순례자에게 스틱 올바르게 사용하는 법을 영어, 한국말(?), 바디랭귀지를 섞어가며 열심히 설명하고 있는 손상현 사회복지사의 모습을 필름카메라로 담아보았습니다. 정말 고된 여정에서도 더불어 살아감을 잊지 않는 당시 그의 모습이 생생하게 기억납니다.", image: "/photos/사진13.png" },
  { id: 27, title: "2025년 제주도 단체연수 기간 단체 사진", description: "촬영배경 : 제주도 단체연수 기간 중 자연 속 힐링 프로그램의 일환으로 해안가에서 촬영함. 바쁜 업무에서 벗어나 구성원 간 유대감 형성과 정서적 회복을 도모하는 과정에서 진행된 단체 기념사진임.\n촬영장소 : 제주 해안가(현무암 지형과 자연 수반이 형성된 해변 일대)\n촬영의미 : 단체연수를 통해 종사자 간 신뢰와 화합을 다지는 상징적인 장면\n자연 속에서 심리적 안정과 재충전을 경험하는 힐링의 순간 기록\n기관 구성원들이 함께 같은 방향을 바라보며 나아가는 공동체 의식 표현\n장애인복지 현장에서 노력하는 종사자들의 긍정적인 에너지와 사기 진작을 나타냄", image: "/photos/사진27.png" },
  { id: 30, title: "함께라서 나아갈 수 있었던 2025 홍당모캠프", description: "2025년 여름, 홍당모 캠프에서 만난 2조의 포스터 입니다. 서로 모인 손이 만나 꽃(손 모양)이 피고, 열매(당근)을 맺은 모습입니다. \n20대~50대 사회복지사가 만나 홍보, 자원봉사, 후원 등 서로의 방향성, 고충을 나누며, '함께'라는 꽃이 피었고 '네트워크'라는 열매가 생겼습니다. \n캠프 이후, 서로의 기관에 후원물품 연계, 홍보활동 등을 통해 사후 만남도 진행했던 네트워크! 홍당모 캠프 덕분이라고 생각합니다~", image: "/photos/사진30.png" },
  { id: 31, title: "변신은 무죄, 열정은 유죄! 코스튬에 진심인 '한국여성의집', 올해도 무대를 찢으러 왔다!", description: "박쥐에서 가오나시로, 아보카도에서 크리스마스트리로! 사진 속 의상은 달라졌지만, 사회복지사로서의 열정만은 변함없습니다. 서울시 사회복지사들의 축제에 진심을 다해 참여하며 쌓아온 '한국여성의집'만의 유쾌한 기록들을 한 장에 담았습니다. \n서사협의 역사와 함께 자라온 저희의 열정을 예쁘게 봐주세요!", image: "/photos/사진31.png" },
  { id: 32, title: "보편적 복지서비스를 전면 시행하라 ~", description: "보편적복지서비스 전면 시행을 촉구하는 기자회견을 2012년 3월 30일 광화문 광장에서 진행 ~", image: "/photos/사진32.png" },
  { id: 33, title: "그날.....난장(사회복지사 스트레스 해소를 위한 할로윈파티)", description: "서울시사회복지사협회 교육실및 사무실\n(너무 오래전이라 초상권 동의가 어렵습니다.개인 사진이 아니라 행사사진)", image: "/photos/사진33.png" },
];

// 실제 사진 URL을 넣으려면 위 PHOTOS 배열에 image 필드를 추가하세요:
// { id: 1, title: "...", description: "...", image: "/photos/01.jpg" }
// public/photos/ 폴더에 이미지를 넣으면 됩니다.

const ADMIN_PASSWORD = "admin2026";

/* ═══════════ THEME ═══════════ */
const t = {
  bg: "#1a2332", bgDeep: "#151d2a", bgCard: "#1e2a3a", bgCardHover: "#243344",
  bgInput: "#1e2a3a", mint: "#6ecfbd", mintLight: "#8eddd0", mintDark: "#4db8a4",
  mintGlow: "rgba(110,207,189,0.15)", mintGlow2: "rgba(110,207,189,0.08)",
  text: "#e0e4e8", textSub: "#8a9bae", textMuted: "#566a80",
  border: "#2a3a4e", danger: "#f87171",
};

/* ═══════════ UI COMPONENTS ═══════════ */
function Mint({ children }) {
  return <span style={{ color: t.mint, fontWeight: 700 }}>{children}</span>;
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 24px" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${t.border}, transparent)` }} />
      <div style={{ width: 5, height: 5, background: t.mint, borderRadius: 1, transform: "rotate(45deg)", opacity: 0.6 }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${t.border}, transparent)` }} />
    </div>
  );
}

function Badge({ children }) {
  return (
    <div style={{
      display: "inline-block", padding: "8px 28px", border: `1px solid ${t.border}`,
      borderRadius: 28, fontSize: 12, color: t.textSub, letterSpacing: 3, background: t.bgDeep,
    }}>{children}</div>
  );
}

function BigNumber({ value }) {
  return (
    <div style={{
      fontFamily: "'Playfair Display', serif", fontSize: "clamp(72px, 18vw, 110px)",
      fontWeight: 700, color: t.mint, opacity: 0.12, lineHeight: 0.9, userSelect: "none", marginTop: 16,
    }}>{value}</div>
  );
}

function Input({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, color: t.textSub, marginBottom: 8, letterSpacing: 2 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "14px 16px", background: t.bgInput,
          border: `1px solid ${t.border}`, borderRadius: 8, color: t.text,
          fontSize: 15, outline: "none", boxSizing: "border-box",
          transition: "border-color .25s", fontFamily: "'Noto Sans KR', sans-serif",
        }}
        onFocus={e => (e.target.style.borderColor = t.mint)}
        onBlur={e => (e.target.style.borderColor = t.border)}
      />
    </div>
  );
}

function MintButton({ children, onClick, disabled, style: sx }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: "100%", padding: "16px 20px",
        background: disabled ? t.textMuted
          : h ? `linear-gradient(135deg, ${t.mintLight}, ${t.mint})`
          : `linear-gradient(135deg, ${t.mint}, ${t.mintDark})`,
        border: "none", borderRadius: 10, color: disabled ? t.textSub : t.bgDeep,
        fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
        letterSpacing: 3, transition: "all .3s",
        transform: h && !disabled ? "translateY(-2px)" : "none",
        boxShadow: h && !disabled ? `0 8px 28px ${t.mintGlow}` : "none",
        fontFamily: "'Noto Sans KR', sans-serif", ...sx,
      }}>{children}</button>
  );
}

/* ─── Photo Image or Emoji ─── */
function PhotoVisual({ photo, size = 50 }) {
  if (photo.image) {
    return (
      <img src={photo.image} alt={photo.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
    );
  }
  return <span style={{ fontSize: size, position: "relative", zIndex: 1 }}>{photo.emoji}</span>;
}

/* ─── Lightbox ─── */
function Lightbox({ photo, onClose }) {
  if (!photo) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 20, cursor: "pointer", animation: "lbFadeIn .25s ease",
    }}>
      <style>{`
        @keyframes lbFadeIn{from{opacity:0}to{opacity:1}}
        @keyframes lbScaleIn{from{transform:scale(0.92);opacity:0}to{transform:scale(1);opacity:1}}
      `}</style>
      <div style={{
        position: "absolute", top: 16, right: 20,
        width: 36, height: 36, borderRadius: "50%",
        background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 18, fontWeight: 300, cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.15)",
      }}>✕</div>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(90vw, 600px)", aspectRatio: "4/3",
        background: `linear-gradient(135deg, ${t.bgCard}, ${t.mint}08)`,
        borderRadius: 14, overflow: "hidden", position: "relative",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)", animation: "lbScaleIn .3s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 40%, ${t.mint}15, transparent 70%)` }} />
        <PhotoVisual photo={photo} size={100} />
        <div style={{
          position: "absolute", bottom: 12, left: 16,
          background: "rgba(0,0,0,0.5)", padding: "3px 12px", borderRadius: 4,
          fontSize: 12, color: t.textMuted, backdropFilter: "blur(4px)",
        }}>#{String(photo.id).padStart(2, "0")}</div>
      </div>
      <div onClick={e => e.stopPropagation()} style={{ width: "min(90vw, 600px)", padding: "18px 4px 0", textAlign: "center" }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Noto Sans KR', sans-serif" }}>
          {photo.title}
        </h3>
        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontFamily: "'Noto Sans KR', sans-serif" }}>
          {photo.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Photo Card (4:3) ─── */
function PhotoCard({ photo, selected, onSelect, onZoom }) {
  const [h, setH] = useState(false);
  const active = selected || h;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: active ? t.bgCardHover : t.bgCard,
        border: `2px solid ${selected ? t.mint : h ? t.mint + "50" : t.border}`,
        borderRadius: 14, cursor: "pointer", transition: "all .3s ease",
        transform: active ? "translateY(-4px)" : "none",
        boxShadow: selected ? `0 8px 32px ${t.mintGlow}, inset 0 0 0 1px ${t.mint}30` : h ? "0 4px 20px rgba(0,0,0,.25)" : "none",
        overflow: "hidden", position: "relative",
      }}>
      {selected && (
        <div style={{
          position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: "50%",
          background: t.mint, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: t.bgDeep, zIndex: 3, boxShadow: `0 2px 10px ${t.mintGlow}`,
        }}>✓</div>
      )}
      <div onClick={onSelect} style={{
        width: "100%", aspectRatio: "4/3",
        background: `linear-gradient(135deg, ${t.mint}12, ${t.mint}05)`,
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 50%, ${t.mint}10, transparent 70%)` }} />
        <PhotoVisual photo={photo} size={50} />
        <div style={{
          position: "absolute", bottom: 8, left: 10,
          background: "rgba(0,0,0,.45)", padding: "2px 10px", borderRadius: 4,
          fontSize: 11, color: t.textMuted, backdropFilter: "blur(4px)",
        }}>#{String(photo.id).padStart(2, "0")}</div>
        <div onClick={e => { e.stopPropagation(); onZoom(); }}
          style={{
            position: "absolute", top: 8, left: 8, width: 28, height: 28, borderRadius: 6,
            background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,.7)", fontSize: 14, backdropFilter: "blur(4px)",
            opacity: h ? 1 : 0, transition: "opacity .2s", cursor: "pointer",
            border: "1px solid rgba(255,255,255,.1)",
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
      <div onClick={onSelect} style={{ padding: "12px 14px 14px" }}>
        <h3 style={{
          margin: "0 0 3px", fontSize: 14, fontWeight: 700,
          color: selected ? t.mint : t.text, transition: "color .3s",
          fontFamily: "'Noto Sans KR', sans-serif",
        }}>{photo.title}</h3>
        <p style={{
          margin: 0, fontSize: 11, color: t.textSub, lineHeight: 1.5,
          fontFamily: "'Noto Sans KR', sans-serif",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{photo.description}</p>
      </div>
    </div>
  );
}

/* ─── Admin Components ─── */
function BarChart({ data }) {
  const mx = Math.max(...data.map(d => d.votes), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.map(item => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 76, fontSize: 12, color: t.textSub, textAlign: "right", flexShrink: 0,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            fontFamily: "'Noto Sans KR', sans-serif",
          }}>{item.title}</div>
          <div style={{
            flex: 1, height: 30, background: t.bgDeep, borderRadius: 6, overflow: "hidden", position: "relative",
          }}>
            <div style={{
              height: "100%", width: `${(item.votes / mx) * 100}%`,
              background: `linear-gradient(90deg, ${t.mintDark}, ${t.mint})`,
              borderRadius: 6, transition: "width .8s ease", minWidth: item.votes > 0 ? "4px" : "0",
            }} />
            <span style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              fontSize: 12, fontWeight: 700, color: t.text,
            }}>{item.votes}표</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function VoterTable({ voters }) {
  if (!voters.length) return (
    <p style={{ color: t.textMuted, fontSize: 13, textAlign: "center", padding: "20px 0" }}>
      아직 투표 기록이 없습니다.
    </p>
  );
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'Noto Sans KR', sans-serif" }}>
        <thead>
          <tr>
            {["#", "이름", "연락처", "선택 작품", "시간"].map(c => (
              <th key={c} style={{
                padding: "9px 10px", textAlign: "left", color: t.mint, fontWeight: 600,
                fontSize: 11, letterSpacing: 1, borderBottom: `1px solid ${t.border}`, whiteSpace: "nowrap",
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {voters.map((v, i) => (
            <tr key={i}>
              <td style={{ padding: "9px 10px", color: t.textMuted }}>{i + 1}</td>
              <td style={{ padding: "9px 10px", color: t.text }}>{v.name}</td>
              <td style={{ padding: "9px 10px", color: t.textSub }}>{v.phone}</td>
              <td style={{ padding: "9px 10px", color: t.mint }}>{v.photoTitle}</td>
              <td style={{ padding: "9px 10px", color: t.textSub, whiteSpace: "nowrap" }}>{v.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════ MAIN APP ═══════════ */
export default function App() {
  const [screen, setScreen] = useState("intro");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [adminPw, setAdminPw] = useState("");
  const [adminErr, setAdminErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [voteResults, setVoteResults] = useState(PHOTOS.map(p => ({ id: p.id, title: p.title, votes: 0 })));
  const [voters, setVoters] = useState([]);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [dupVoter, setDupVoter] = useState(null);

  // localStorage로 데이터 유지
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("sasw-vote-data-final"));
      if (s) { setVoteResults(s.results || []); setVoters(s.voters || []); }
    } catch {}
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightboxPhoto(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const save = useCallback((r, v) => {
    localStorage.setItem("sasw-vote-data-final", JSON.stringify({ results: r, voters: v }));
  }, []);

  const now = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  };

  const submitVote = async () => {
    if (!selectedPhoto) return;
    setSubmitting(true);
    const photo = PHOTOS.find(p => p.id === selectedPhoto);
    const ts = now();
    const nr = voteResults.map(r => r.id === selectedPhoto ? { ...r, votes: r.votes + 1 } : r);
    const nv = [...voters, { name: name.trim(), phone: phone.trim(), photoId: selectedPhoto, photoTitle: photo.title, time: ts }];
    setVoteResults(nr); setVoters(nv); save(nr, nv);

    if (APPS_SCRIPT_URL) {
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), phone: phone.trim(), photoId: selectedPhoto, photoTitle: photo.title, time: ts }),
        });
      } catch {}
    }
    setTimeout(() => { setSubmitting(false); setScreen("complete"); }, 700);
  };

  const checkDuplicate = (n, p) => {
    return voters.find(
      v => v.name.trim() === n.trim() && v.phone.replace(/[-\s]/g, "") === p.replace(/[-\s]/g, "")
    );
  };

  const totalVotes = voteResults.reduce((s, r) => s + r.votes, 0);
  const sorted = [...voteResults].sort((a, b) => b.votes - a.votes);

  const wrap = (children, wide) => (
    <div style={{
      minHeight: "100vh", background: `linear-gradient(170deg, ${t.bg} 0%, ${t.bgDeep} 50%, #111b27 100%)`,
      fontFamily: "'Noto Sans KR', sans-serif", display: "flex", justifyContent: "center",
    }}>
      <div style={{ width: "100%", maxWidth: wide ? 640 : 480 }}>{children}</div>
      <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
    </div>
  );

  /* ─── INTRO ─── */
  if (screen === "intro") return wrap(
    <>
      <div style={{ textAlign: "center", padding: "48px 24px 0" }}>
        <Badge>서울특별시사회복지사협회 창립 40주년</Badge>
        <BigNumber value="40th" />
        <h1 style={{ fontWeight: 800, fontSize: "clamp(24px, 5.5vw, 34px)", color: t.text, margin: "-8px 0 4px", lineHeight: 1.3 }}>
          사진 투표
        </h1>
        <h2 style={{ fontWeight: 700, fontSize: "clamp(18px, 4vw, 24px)", color: t.mint, margin: "8px 0 20px" }}>
          40년의 순간 포착
        </h2>
        <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.7 }}>
          총 <Mint>8장</Mint>의 사진 중 가장 마음에 드는<br /><Mint>1장</Mint>을 선택해 주세요.
        </p>
      </div>
      <Divider />
      <div style={{ padding: "0 24px 36px" }}>
        <Input label="성 함" placeholder="성함을 입력하세요" value={name} onChange={setName} />
        <Input label="연락처" placeholder="010-0000-0000" value={phone} onChange={setPhone} type="tel" />
        <div style={{ marginTop: 8 }}>
          <MintButton onClick={() => {
            if (!name.trim() || !phone.trim()) return;
            const dup = checkDuplicate(name, phone);
            if (dup) { setDupVoter(dup); setScreen("duplicate"); }
            else setScreen("vote");
          }} disabled={!name.trim() || !phone.trim()}>
            투표 시작하기
          </MintButton>
        </div>
      </div>
      <div style={{ textAlign: "center", paddingBottom: 28 }}>
        <span onClick={() => setScreen("admin-login")}
          style={{ color: t.textMuted, fontSize: 11, cursor: "pointer", borderBottom: `1px dotted ${t.textMuted}` }}>
          관리자 모드
        </span>
      </div>
    </>
  );

  /* ─── DUPLICATE ─── */
  if (screen === "duplicate") return wrap(
    <div style={{ textAlign: "center", padding: "64px 24px" }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: `linear-gradient(135deg, #f87171, #ef4444)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px", fontSize: 30, boxShadow: "0 8px 32px rgba(248,113,113,0.35)",
      }}>✕</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 10 }}>이미 투표하셨습니다</h2>
      <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.8 }}>
        <span style={{ color: t.text, fontWeight: 700 }}>{name}</span>님은<br />
        이미 투표에 참여하셨습니다.
      </p>
      <Divider />
      <div style={{
        background: t.bgCard, borderRadius: 12, padding: 20,
        border: `1px solid ${t.border}`, maxWidth: 300, margin: "0 auto 32px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: t.textMuted }}>선택 작품</span>
          <span style={{ fontSize: 14, color: t.mint, fontWeight: 700 }}>{dupVoter?.photoTitle}</span>
        </div>
        <div style={{ height: 1, background: t.border, marginBottom: 12 }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: t.textMuted }}>투표 시간</span>
          <span style={{ fontSize: 13, color: t.textSub }}>{dupVoter?.time}</span>
        </div>
      </div>
      <MintButton onClick={() => { setScreen("intro"); setName(""); setPhone(""); setDupVoter(null); }} style={{ maxWidth: 240, margin: "0 auto" }}>
        확인
      </MintButton>
    </div>
  );

  /* ─── VOTE ─── */
  if (screen === "vote") return wrap(
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 8px" }}>
        <div>
          <div style={{ fontSize: 11, color: t.mint, letterSpacing: 3, marginBottom: 2 }}>PHOTO VOTE</div>
          <div style={{ fontSize: 13, color: t.textSub }}>투표자: <span style={{ color: t.text }}>{name}</span></div>
        </div>
        <div style={{
          padding: "6px 14px", background: selectedPhoto ? t.mintGlow2 : t.bgCard,
          border: `1px solid ${selectedPhoto ? t.mint : t.border}`, borderRadius: 20,
          fontSize: 12, color: selectedPhoto ? t.mint : t.textMuted, fontWeight: 600, transition: "all .3s",
        }}>{selectedPhoto ? "1장 선택됨 ✓" : "선택해 주세요"}</div>
      </div>
      <Divider />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, padding: "0 20px 20px" }}>
        {PHOTOS.map(p => (
          <PhotoCard key={p.id} photo={p} selected={selectedPhoto === p.id}
            onSelect={() => setSelectedPhoto(selectedPhoto === p.id ? null : p.id)}
            onZoom={() => setLightboxPhoto(p)} />
        ))}
      </div>
      <div style={{ padding: "0 24px 32px" }}>
        <MintButton onClick={submitVote} disabled={!selectedPhoto || submitting}>
          {submitting ? "제출 중..." : "투표 제출하기"}
        </MintButton>
        <p style={{ textAlign: "center", fontSize: 12, color: t.textMuted, marginTop: 10 }}>제출 후 수정이 불가합니다</p>
      </div>
    </>
  );

  /* ─── COMPLETE ─── */
  if (screen === "complete") {
    const photo = PHOTOS.find(p => p.id === selectedPhoto);
    return wrap(
      <div style={{ textAlign: "center", padding: "64px 24px" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: `linear-gradient(135deg, ${t.mint}, ${t.mintDark})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px", fontSize: 30, color: t.bgDeep, boxShadow: `0 8px 32px ${t.mintGlow}`,
        }}>✓</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: t.text, marginBottom: 10 }}>투표 완료</h2>
        <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.7 }}>소중한 한 표가 정상적으로<br />접수되었습니다.</p>
        <Divider />
        <div style={{
          background: t.bgCard, borderRadius: 12, padding: 20, border: `1px solid ${t.border}`,
          textAlign: "left", maxWidth: 300, margin: "0 auto",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: t.textMuted }}>투표자</span>
            <span style={{ fontSize: 14, color: t.text }}>{name}</span>
          </div>
          <div style={{ height: 1, background: t.border, marginBottom: 12 }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: t.textMuted }}>선택 작품</span>
            <span style={{ fontSize: 14, color: t.mint, fontWeight: 700 }}>#{photo.id} {photo.title}</span>
          </div>
        </div>
        <p style={{ marginTop: 36, fontSize: 11, color: t.textMuted, letterSpacing: 2 }}>서울특별시사회복지사협회</p>
      </div>
    );
  }

  /* ─── ADMIN LOGIN ─── */
  if (screen === "admin-login") return wrap(
    <>
      <div style={{ textAlign: "center", padding: "48px 24px 0" }}>
        <Badge>ADMIN</Badge>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginTop: 20 }}>관리자 인증</h2>
        <p style={{ color: t.textSub, fontSize: 13, marginTop: 6 }}>관리자 비밀번호를 입력해 주세요.</p>
      </div>
      <Divider />
      <div style={{ padding: "0 24px 30px" }}>
        <Input label="비밀번호" placeholder="비밀번호 입력" value={adminPw}
          onChange={v => { setAdminPw(v); setAdminErr(""); }} type="password" />
        {adminErr && <p style={{ color: t.danger, fontSize: 13, marginTop: -8, marginBottom: 12 }}>{adminErr}</p>}
        <MintButton onClick={() => {
          if (adminPw === ADMIN_PASSWORD) { setAdminErr(""); setScreen("admin"); }
          else setAdminErr("비밀번호가 틀렸습니다.");
        }}>로그인</MintButton>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span onClick={() => { setScreen("intro"); setAdminPw(""); setAdminErr(""); }}
            style={{ color: t.textSub, fontSize: 13, cursor: "pointer", borderBottom: `1px solid ${t.textSub}` }}>
            ← 투표 화면으로 돌아가기
          </span>
        </div>
      </div>
    </>
  );

  /* ─── ADMIN DASHBOARD ─── */
  if (screen === "admin") return wrap(
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 0" }}>
        <div>
          <div style={{ fontSize: 11, color: t.mint, letterSpacing: 3 }}>ADMIN</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: "4px 0 0" }}>투표 현황</h2>
        </div>
        <span onClick={() => { setScreen("intro"); setAdminPw(""); }}
          style={{ color: t.textSub, fontSize: 12, cursor: "pointer", padding: "6px 14px", border: `1px solid ${t.border}`, borderRadius: 6 }}>
          나가기
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, padding: 20 }}>
        {[
          { l: "총 투표수", v: totalVotes, u: "표" },
          { l: "1위", v: sorted[0]?.votes > 0 ? sorted[0]?.title : "—", u: sorted[0]?.votes > 0 ? `${sorted[0]?.votes}표` : "" },
          { l: "작품 수", v: 8, u: "장" },
        ].map((c, i) => (
          <div key={i} style={{
            background: t.bgCard, borderRadius: 10, padding: "16px 12px",
            border: `1px solid ${t.border}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 6, letterSpacing: 1 }}>{c.l}</div>
            <div style={{
              fontSize: typeof c.v === "number" ? 26 : 15, fontWeight: 700, color: t.mint,
              fontFamily: typeof c.v === "number" ? "'Playfair Display', serif" : "'Noto Sans KR', sans-serif",
            }}>{c.v}</div>
            {c.u && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{c.u}</div>}
          </div>
        ))}
      </div>
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ background: t.bgCard, borderRadius: 12, padding: 20, border: `1px solid ${t.border}` }}>
          <h3 style={{ fontSize: 12, color: t.mint, letterSpacing: 2, marginBottom: 14, fontWeight: 600 }}>작품별 투표 현황</h3>
          <BarChart data={sorted} />
        </div>
      </div>
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ background: t.bgCard, borderRadius: 12, padding: 20, border: `1px solid ${t.border}` }}>
          <h3 style={{ fontSize: 12, color: t.mint, letterSpacing: 2, marginBottom: 14, fontWeight: 600 }}>투표자 목록</h3>
          <VoterTable voters={voters} />
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "0 20px 32px" }}>
        <a href={`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`}
          target="_blank" rel="noopener noreferrer"
          style={{ color: t.textSub, fontSize: 12, borderBottom: `1px dashed ${t.textMuted}`, textDecoration: "none" }}>
          📊 Google 스프레드시트에서 전체 데이터 보기
        </a>
      </div>
    </>,
    true
  );

  return null;
}
