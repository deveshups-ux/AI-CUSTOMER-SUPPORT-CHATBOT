"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useRouter();

  const handleSettings = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/settings", {
        ownerId,
        supportEmail,
        knowledge,
        businessName,
      });
      setLoading(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
      console.log(result.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const handleGetDetails = async () => {
      try {
        const result = await axios.post("/api/settings/get", {
          ownerId,
        });
        setBusinessName(result.data.businessName);
        setSupportEmail(result.data.supportEmail);
        setKnowledge(result.data.knowledge);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetDetails();
  }, [ownerId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => navigate.push("/")}
            className="text-lg font-semibold tracking-tight"
          >
            Support <span className="text-zinc-400">AI</span>
          </div>
          <button
            onClick={() => navigate.push("/embed")}
            className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition"
          >
            Embed ChatBot
          </button>
        </div>
      </motion.div>
      <div className="flex justify-center px-4 py-14 mt-20">
        <motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">ChatBot Settings</h1>
            <p className="text-zinc-500 mt-1">
              Manage your AI chatbot knowledge and business details
            </p>
          </div>
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Business Details</h1>
            <div className="space-y-4">
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                type="text"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Business Name"
              />
              <input
                onChange={(e) => setSupportEmail(e.target.value)}
                value={supportEmail}
                type="text"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Support Email"
              />
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Knowledge Base</h1>
            <p className="text-sm text-zinc-500 mb-4">
              Add FAQs, policies, delivery info, refunds, etc.
            </p>
            <div className="space-y-4">
              <textarea
                onChange={(e) => setKnowledge(e.target.value)}
                value={knowledge}
                className="w-full h-54 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3-5 working days
• Cash on Delivery available
• Support hours`}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <motion.button
              disabled={loading}
              onClick={handleSettings}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-emerald-600"
              >
                {" "}
                Setting Saved ✅
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardClient;
