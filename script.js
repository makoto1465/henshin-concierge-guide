const copyButtons = document.querySelectorAll("[data-copy-target]");
const statusLabel = document.querySelector(".copy-status");

async function copyText(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const text = target.value || target.textContent || "";

  try {
    await navigator.clipboard.writeText(text);
    showStatus("コピーしました");
  } catch {
    target.focus();
    target.select();
    document.execCommand("copy");
    showStatus("コピーしました");
  }
}

function showStatus(message) {
  if (!statusLabel) return;
  statusLabel.textContent = message;
  window.clearTimeout(showStatus.timer);
  showStatus.timer = window.setTimeout(() => {
    statusLabel.textContent = "";
  }, 2400);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copyTarget));
});
