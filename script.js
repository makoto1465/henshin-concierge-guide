const copyButtons = document.querySelectorAll("[data-copy-target]");
const toast = document.querySelector(".toast");

async function copyText(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const text = target.value || target.textContent || "";

  try {
    await navigator.clipboard.writeText(text);
    showToast("プロンプトをコピーしました");
  } catch {
    target.focus();
    target.select();
    document.execCommand("copy");
    showToast("プロンプトをコピーしました");
  }
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copyTarget));
});
