const API = "/api/items"; // same origin (served by express) -> avoids CORS

async function load() {
  const res = await fetch(API);
  const items = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = items
    .map(
      (i) => `
    <li data-id="${i._id}">
      <b>${escapeHtml(i.title)}</b> - ${escapeHtml(i.detail || "")}
      <button onclick="onEdit('${i._id}')">Edit</button>
      <button onclick="onDelete('${i._id}')">Delete</button>
    </li>
  `
    )
    .join("");
}

async function onAdd() {
  const title = document.getElementById("title").value.trim();
  const detail = document.getElementById("detail").value.trim();
  if (!title) {
    alert("Title required");
    return;
  }
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, detail }),
  });
  document.getElementById("title").value = "";
  document.getElementById("detail").value = "";
  load();
}

async function onDelete(id) {
  if (!confirm("Delete item?")) return;
  await fetch(`${API}/${id}`, { method: "DELETE" });
  load();
}

async function onEdit(id) {
  const newTitle = prompt("New title:");
  if (newTitle === null) return; // canceled
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle }),
  });
  load();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.getElementById("addBtn").addEventListener("click", onAdd);
load();
