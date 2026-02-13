const response = await fetch("http://localhost:3000/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: userMessage,
  }),
});

if (!response.ok) {
  throw new Error("Server error");
}

const data = await response.json();
console.log(data);

// Use this to show reply in UI
setMessages((prev) => [
  ...prev,
  { role: "assistant", content: data.reply },
]);
