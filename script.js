const CONFIG = {
  casinoUrl: "https://1wrrzr.com/v3/5768/tower-rush?p=h9mr", // <- твоя реф-ссылка
  promoCode: "tower12",                               // <- твой промокод
  countdown: "end_of_month",

  pillLeft: "이번 달 출금 진행 중",
  promoTitle: "첫 입금 최대 500% 보너스",
};

function appendUTM(url) {
  const current = new URL(window.location.href);
  const out = new URL(url);
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid"].forEach(k => {
    const v = current.searchParams.get(k);
    if (v && !out.searchParams.get(k)) out.searchParams.set(k, v);
  });
  return out.toString();
}

function getEndDate() {
  if (CONFIG.countdown !== "end_of_month") {
    const d = new Date(CONFIG.countdown);
    if (!isNaN(d.getTime())) return d;
  }
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

function formatHHMMSS(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/* init */
document.getElementById("pillLeft").textContent = CONFIG.pillLeft;
document.getElementById("promoTitle").textContent = CONFIG.promoTitle;

document.getElementById("promoCode").textContent = CONFIG.promoCode;
document.getElementById("stepCode").textContent = CONFIG.promoCode;
document.getElementById("howCode").textContent = CONFIG.promoCode;

/* countdown */
const endDate = getEndDate();
const cdEl = document.getElementById("countdown");
function tick() {
  cdEl.textContent = formatHHMMSS(endDate.getTime() - Date.now());
}
tick();
setInterval(tick, 1000);

/* go */
function goToCasino() {
  window.location.href = appendUTM(CONFIG.casinoUrl);
}
document.getElementById("ctaInCard").addEventListener("click", goToCasino);
document.getElementById("ctaSticky").addEventListener("click", goToCasino);

/* copy */
async function doCopy() {
  const ok = await copyText(CONFIG.promoCode);
  const b1 = document.getElementById("copyBtn");
  const b2 = document.getElementById("copySticky");
  if (ok) {
    b1.textContent = "복사 완료";
    b2.textContent = "완료";
    setTimeout(() => {
      b1.textContent = "코드 복사";
      b2.textContent = "코드";
    }, 900);
  }
}
document.getElementById("copyBtn").addEventListener("click", doCopy);
document.getElementById("copySticky").addEventListener("click", doCopy);

/* modal */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModal = () => modal.setAttribute("aria-hidden","true");

document.querySelectorAll(".shot img").forEach(img => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.setAttribute("aria-hidden","false");
  });
});
document.getElementById("modalBg").addEventListener("click", closeModal);
document.getElementById("modalClose").addEventListener("click", closeModal);