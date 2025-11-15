// Import Supabase v2 as an ES module
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.34.0/dist/supabase.min.js";

// --- Supabase setup ---
const SUPABASE_URL = "https://dehvcgzyfbolxqpnvcoy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlaHZjZ3p5ZmJvbHhxcG52Y295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxODQ3MTAsImV4cCI6MjA3ODc2MDcxMH0.ukqrBPMPEKq0yC3whe1urR9fT8m1tJW9KUtpBZ8wWSg";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- DOM elements ---
const messagesContainer = document.getElementById("messages");
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");

// --- Load existing messages ---
async function loadMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading messages:", error);
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

// --- Insert new message ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const { error } = await supabase
    .from("messages")
    .insert({ content: text });

  if (error) {
    console.error("Error inserting message:", error);
  } else {
    input.value = "";
    loadMessages();
  }
});
