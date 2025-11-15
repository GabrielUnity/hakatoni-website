import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- CONFIG ---
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- DOM ELEMENTS ---
const messagesContainer = document.getElementById("messages");
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");

// --- LOAD EXISTING MESSAGES ---
async function loadMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  messagesContainer.innerHTML = "";
  data.forEach(msg => {
    const div = document.createElement("div");
    div.className = "msg";
    div.textContent = msg.content;
    messagesContainer.appendChild(div);
  });
}

loadMessages();

// --- INSERT NEW MESSAGE ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const { error } = await supabase
    .from("messages")
    .insert({ content: text });

  if (error) {
    console.error(error);
  } else {
    input.value = "";
    loadMessages();
  }
});
