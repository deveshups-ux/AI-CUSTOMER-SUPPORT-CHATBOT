"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const COLOR_PRESETS = [
  { name: "Black", value: "#000000" },
  { name: "Blue", value: "#2563eb" },
  { name: "Green", value: "#16a34a" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Rose", value: "#e11d48" },
];

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // --- Customization state (client-side only) ---
  const [color, setColor] = useState(COLOR_PRESETS[0].value);
  const [position, setPosition] = useState<"left" | "right">("right");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "hi! how can I help you?",
  );

  const embedCode = `<script
      src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
      data-owner-id="${ownerId}"
      data-color="${color}"
      data-position="${position}"
      data-welcome-message="${welcomeMessage}">
</script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold cursor-pointer">
            Support<span className="text-zinc-400">AI</span>
          </div>
          <button
            className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      <div className="flex justify-center px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10"
        >
          <h1 className="text-2xl font-semibold mb-2">Embed ChatBot</h1>
          <p className="text-zinc-600 mb-6">
            Copy and paste this code before <code>&lt;/body&gt;</code>
          </p>

          <div className="relative bg-zinc-900 text-zinc-100 rounded-xl p-5 text-sm font-mono mb-10 overflow-x-auto">
            <pre className="overflow-x-auto">{embedCode}</pre>

            <button
              className="absolute top-3 right-3 bg-white text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition"
              onClick={copyCode}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>

          <ol className="space-y-3 text-sm text-zinc-600 list-decimal pl-5">
            <li className="pl-1">Copy the embed script</li>
            <li className="pl-1">Paste it before the closing body tag</li>
            <li className="pl-1">Reload your website</li>
          </ol>

          {/* --- Customization Panel --- */}
          <div className="mt-14">
            <h1 className="text-lg font-medium mb-2">Customize</h1>
            <p className="text-sm text-zinc-500 mb-6">
              Changes here update the embed code and preview instantly
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Color picker */}
              <div>
                <label className="text-sm font-medium text-zinc-700 mb-2 block">
                  Bubble Color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setColor(preset.value)}
                      title={preset.name}
                      className={`w-8 h-8 rounded-full border-2 transition ${
                        color === preset.value
                          ? "border-zinc-900 scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: preset.value }}
                    />
                  ))}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded-full border border-zinc-300 cursor-pointer bg-transparent"
                    title="Custom color"
                  />
                </div>
              </div>

              {/* Position toggle */}
              <div>
                <label className="text-sm font-medium text-zinc-700 mb-2 block">
                  Bubble Position
                </label>
                <div className="inline-flex rounded-lg border border-zinc-300 overflow-hidden">
                  <button
                    onClick={() => setPosition("left")}
                    className={`px-4 py-2 text-sm transition ${
                      position === "left"
                        ? "bg-zinc-900 text-white"
                        : "bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    Left
                  </button>
                  <button
                    onClick={() => setPosition("right")}
                    className={`px-4 py-2 text-sm transition ${
                      position === "right"
                        ? "bg-zinc-900 text-white"
                        : "bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    Right
                  </button>
                </div>
              </div>

              {/* Welcome message */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-700 mb-2 block">
                  Welcome Message
                </label>
                <input
                  type="text"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  maxLength={80}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  placeholder="hi! how can I help you?"
                />
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h1 className="text-lg font-medium mb-2">Live Preview</h1>
            <p className="text-sm text-zinc-500 mb-6">
              This is how the chatbot will appear on your website
            </p>

            <div className="rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden">
              <div className="flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-4 text-xs text-zinc-500">
                  Your-website.com
                </span>
              </div>

              <div className="relative h-64 sm:h-72 p-6 text-zinc-400 text-sm">
                Your website goes here
                <div
                  className={`absolute bottom-24 w-64 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden ${
                    position === "right" ? "right-6" : "left-6"
                  }`}
                >
                  <div
                    className="text-white text-xs px-3 py-2 flex justify-between items-center"
                    style={{ backgroundColor: color }}
                  >
                    <span>Customer Support</span>
                    <span>X</span>
                  </div>

                  <div className="p-3 space-y-2 bg-zinc-50">
                    <div className="bg-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-lg w-fit">
                      {welcomeMessage || "hi! how can I help you?"}
                    </div>
                    <div
                      className="text-white text-xs px-3 py-2 rounded-lg ml-auto w-fit"
                      style={{ backgroundColor: color }}
                    >
                      what is the return policy
                    </div>
                  </div>

                  <div className="p-3 bg-white border-t border-zinc-100 flex items-center gap-2">
                    <div className="w-full bg-zinc-100 text-zinc-400 text-xs px-3 py-2 rounded-lg">
                      Type a message...
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className={`absolute bottom-6 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-2xl cursor-pointer ${
                    position === "right" ? "right-6" : "left-6"
                  }`}
                  style={{ backgroundColor: color }}
                >
                  💬
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmbedClient;
