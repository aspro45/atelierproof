import { CONFIG } from "./config.js";

const $ = (id) => document.getElementById(id);

const pieces = [
  {
    id: "AP-001",
    name: "Nocturne utility coat",
    house: "Maison Relay",
    season: "AW26",
    status: "CERTIFIED",
    verdict: "authentic",
    color: "#233c8f",
    claim: "Deadstock wool shell, plant-dyed cotton lining, repairable nickel-free hardware.",
    confidence: 92,
    trace: 88,
    labor: 18,
    proofs: [
      ["Wool lot", "Milan deadstock invoice", 92],
      ["Dye lab", "Madder and indigo batch sheet", 84],
      ["Hardware", "Replaceable snap supplier memo", 79],
    ],
    ledger: [
      ["register_piece", "Pattern room opened the coat record with the primary sourcing page."],
      ["add_material_proof", "Three supplier notes attached and normalized."],
      ["review_piece_with_genlayer", "GenLayer review accepted the material claim with low labor risk."],
      ["seal_piece", "Piece sealed for public capsule release."],
    ],
  },
  {
    id: "AP-014",
    name: "Saffron field dress",
    house: "Atelier Vale",
    season: "SS27",
    status: "SOURCED",
    verdict: "mixed",
    color: "#c89b2d",
    claim: "Regenerative linen, saffron pigment overdye, hand-finished seams.",
    confidence: 71,
    trace: 76,
    labor: 31,
    proofs: [
      ["Linen farm", "Grower certificate pending renewal", 68],
      ["Pigment", "Dye bath log cross-check", 81],
      ["Finish", "Workshop note, no third-party audit", 52],
    ],
    ledger: [
      ["register_piece", "Capsule record staged with farm and dye claims."],
      ["add_process_step", "Cutting and finish station notes attached."],
      ["open_review", "Review queue opened, awaiting one stronger labor source."],
    ],
  },
  {
    id: "AP-027",
    name: "Harbor repair vest",
    house: "North Loom",
    season: "Core",
    status: "OBJECTED",
    verdict: "unverified",
    color: "#157a62",
    claim: "Recovered sailcloth panels with repair history and circular trim inventory.",
    confidence: 58,
    trace: 62,
    labor: 42,
    proofs: [
      ["Sailcloth", "Recovery note lacks full chain of custody", 58],
      ["Trim", "Inventory list attached", 75],
      ["Repair", "Tailor log references internal ID only", 48],
    ],
    ledger: [
      ["register_piece", "Vest record opened from recovery lot."],
      ["file_objection", "Objection filed against missing chain-of-custody step."],
      ["resolve_objection_with_genlayer", "Resolver requested stronger origin evidence before seal."],
    ],
  },
  {
    id: "AP-041",
    name: "Cobalt ribbon trouser",
    house: "Studio Needle",
    season: "Edition 2",
    status: "SEALED",
    verdict: "authentic",
    color: "#b73845",
    claim: "Certified organic twill, surplus ribbon trim, transparent small-batch assembly.",
    confidence: 95,
    trace: 91,
    labor: 14,
    proofs: [
      ["Twill", "Organic certificate and invoice match", 96],
      ["Ribbon", "Surplus purchase ledger attached", 89],
      ["Assembly", "Batch roster signed by workshop", 93],
    ],
    ledger: [
      ["register_piece", "Trouser record created with three source families."],
      ["review_piece_with_genlayer", "Review matched certificate, purchase ledger and assembly roster."],
      ["seal_piece", "Final seal published for the edition."],
    ],
  },
];

let selected = 0;
const state = {
  t: 0,
};

function short(addr) {
  if (!addr || /^0x0{40}$/i.test(addr)) return "not deployed";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 3200);
}

function pct(n) {
  return `${Math.max(0, Math.min(100, Math.round(n)))}%`;
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function current() {
  return pieces[selected];
}

function renderList() {
  $("pieceList").innerHTML = pieces.map((piece, index) => `
    <button class="pieceTab ${index === selected ? "active" : ""}" type="button" data-index="${index}">
      <span class="swatch" style="background:${piece.color}"></span>
      <span>
        <strong>${esc(piece.name)}</strong>
        <small>${esc(piece.id)} / ${esc(piece.status)} / ${esc(piece.house)}</small>
      </span>
    </button>
  `).join("");
  document.querySelectorAll(".pieceTab").forEach((button) => {
    button.addEventListener("click", () => {
      selected = Number(button.dataset.index);
      render();
    });
  });
}

function renderBoard() {
  const piece = current();
  $("ledgerScore").textContent = pct(piece.confidence);
  $("pieceBoard").style.setProperty("--piece-color", piece.color);
  $("pieceBoard").innerHTML = `
    <div class="patternSheet" style="--piece-color:${piece.color}">
      <div class="patternShape shapeA" style="--rot:-7deg"></div>
      <div class="patternShape shapeB" style="--rot:9deg"></div>
      <div class="patternShape shapeC" style="--rot:-2deg"></div>
      <div class="measurement">
        <span>${esc(piece.id)}</span>
        <span>${esc(piece.season)}</span>
        <span>${esc(piece.status)}</span>
      </div>
    </div>
    <div class="pieceMeta">
      <span class="stamp">${esc(piece.verdict)}</span>
      <h1>${esc(piece.name)}</h1>
      <p>${esc(piece.claim)}</p>
      <div class="scoreGrid">
        <div class="scoreCell"><b>${pct(piece.confidence)}</b><span>confidence</span></div>
        <div class="scoreCell"><b>${pct(piece.trace)}</b><span>traceability</span></div>
        <div class="scoreCell"><b>${pct(piece.labor)}</b><span>labor risk</span></div>
      </div>
      <div class="proofLanes">
        ${piece.proofs.map(([label, note, value]) => `
          <div class="lane" style="--piece-color:${piece.color}; --pct:${value}%">
            <div class="laneTop"><span>${esc(label)}</span><span>${pct(value)}</span></div>
            <div class="threadBar"></div>
            <small>${esc(note)}</small>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderLedger() {
  const piece = current();
  $("ledgerBody").style.setProperty("--piece-color", piece.color);
  $("ledgerBody").innerHTML = piece.ledger.map(([method, note]) => `
    <div class="ledgerRow" style="--piece-color:${piece.color}">
      <b>${esc(method)}</b>
      <p>${esc(note)}</p>
    </div>
  `).join("");
}

function renderContractLink() {
  const link = $("contractLink");
  if (/^0x0{40}$/i.test(CONFIG.contractAddress)) {
    link.href = "#";
    link.textContent = "Contract pending";
    link.onclick = (event) => {
      event.preventDefault();
      toast("AtelierProof contract source is ready; deploy to activate explorer link.");
    };
    return;
  }
  link.href = `${CONFIG.explorerBase}/contracts/${CONFIG.contractAddress}`;
  link.textContent = short(CONFIG.contractAddress);
  link.onclick = null;
}

function render() {
  renderList();
  renderBoard();
  renderLedger();
  renderContractLink();
}

function addLocalPiece(event) {
  event.preventDefault();
  const name = $("pieceName").value.trim() || "Untitled atelier piece";
  const claim = $("pieceClaim").value.trim() || "Material claim pending source review";
  pieces.unshift({
    id: `AP-${String(50 + pieces.length).padStart(3, "0")}`,
    name,
    house: "Local Studio",
    season: "Draft",
    status: "DRAFT",
    verdict: "pending",
    color: "#5c3b86",
    claim,
    confidence: 46,
    trace: 40,
    labor: 50,
    proofs: [
      ["Origin", "Primary source waiting for contract write", 42],
      ["Material", "Local draft, not sealed", 38],
      ["Workshop", "Process steps not attached yet", 36],
    ],
    ledger: [
      ["register_piece", "Local preview sample staged in browser memory."],
      ["add_material_proof", "Deploy and connect contract to publish this proof on Studionet."],
    ],
  });
  selected = 0;
  render();
  toast("Local sample staged. Contract write path is ready after deployment.");
}

function setupCanvas() {
  const canvas = $("loomCanvas");
  const ctx = canvas.getContext("2d");
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  window.addEventListener("resize", resize);
  resize();

  const draw = () => {
    state.t += 0.006;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    const palette = ["rgba(35,60,143,.18)", "rgba(183,56,69,.16)", "rgba(21,122,98,.16)", "rgba(200,155,45,.18)"];
    for (let i = 0; i < 38; i += 1) {
      ctx.beginPath();
      ctx.strokeStyle = palette[i % palette.length];
      ctx.lineWidth = i % 3 === 0 ? 2 : 1;
      const y = (i * 31 + Math.sin(state.t + i) * 9) % (h + 80) - 40;
      ctx.moveTo(-40, y);
      for (let x = 0; x <= w + 80; x += 80) {
        ctx.lineTo(x, y + Math.sin(state.t * 2 + x * 0.01 + i) * 13);
      }
      ctx.stroke();
    }
    for (let x = -20; x < w; x += 66) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(23,21,21,.08)";
      ctx.lineWidth = 1;
      ctx.moveTo(x + Math.sin(state.t + x) * 4, 0);
      ctx.lineTo(x + Math.cos(state.t + x) * 4, h);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  };
  draw();
}

$("cycleBtn").addEventListener("click", () => {
  selected = (selected + 1) % pieces.length;
  render();
});
$("sampleForm").addEventListener("submit", addLocalPiece);

setupCanvas();
render();
