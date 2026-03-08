"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const COUNTIES = [
  { id: "06037", name: "Los Angeles, CA", status: "closed" },
  { id: "17031", name: "Cook, IL", status: "open" },
  { id: "48201", name: "Harris, TX", status: "closed" },
  { id: "04013", name: "Maricopa, AZ", status: "closed" },
  { id: "06073", name: "San Diego, CA", status: "closed" },
  { id: "06059", name: "Orange, CA", status: "open" },
  { id: "12086", name: "Miami-Dade, FL", status: "closed" },
  { id: "36047", name: "Kings, NY", status: "closed" },
  { id: "48113", name: "Dallas, TX", status: "closed" },
  { id: "36081", name: "Queens, NY", status: "closed" },
  { id: "06065", name: "Riverside, CA", status: "closed" },
  { id: "06071", name: "San Bernardino, CA", status: "closed" },
  { id: "32003", name: "Clark, NV", status: "open" },
  { id: "48439", name: "Tarrant, TX", status: "closed" },
  { id: "12011", name: "Broward, FL", status: "closed" },
  { id: "48029", name: "Bexar, TX", status: "closed" },
  { id: "53033", name: "King, WA", status: "closed" },
  { id: "26163", name: "Wayne, MI", status: "closed" },
  { id: "06085", name: "Santa Clara, CA", status: "closed" },
  { id: "36005", name: "Bronx, NY", status: "closed" }
];

export default function Home() {
  const [formData, setFormData] = useState({ email: "", countyId: "06037" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .schema("housing")
        .from("users")
        .insert([
          { email: formData.email, county_fips: formData.countyId, alert_prefs: { email: true } }
        ]);

      if (error) {
        console.error("Supabase Error:", error);
        setMessage("Error subscribing. The database might have strict RLS or requires an authenticated session.");
      } else {
        setMessage("Subscribed successfully! You will be alerted when the waitlist status changes.");
        setFormData({ ...formData, email: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to subscribe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col w-full max-w-xl mx-auto px-6 py-12">
      <div className="flex-1">
        
        <div className="mb-8 p-4 bg-neutral-900/50 border border-neutral-800 rounded text-xs text-neutral-400 leading-relaxed">
          <strong>Disclaimer:</strong> Housing waitlist status is updated manually and may not reflect real-time changes. Always verify directly with your local housing authority before taking action. This is a community notification service, not an official government resource.
        </div>

        <h1 className="text-3xl font-medium tracking-tight mb-2">HousingAlert</h1>
        <p className="text-neutral-500 mb-10 leading-relaxed">
          Affordable housing waitlists open rarely and close quickly. Select your county to receive an email alert the moment its status changes from closed to open.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mb-12 bg-neutral-950 border border-neutral-900 rounded-lg p-6">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Select County</label>
            <select
              required
              className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded text-white focus:outline-none focus:border-neutral-500"
              value={formData.countyId}
              onChange={(e) => setFormData({ ...formData, countyId: e.target.value })}
            >
              {COUNTIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.status === "open" ? "Currently Open" : "Closed"})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Email Address</label>
            <input
              type="email" required
              placeholder="you@example.com"
              className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded text-white focus:outline-none focus:border-neutral-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-medium py-3 rounded hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Get Email Alerts"}
          </button>

          {message && (
            <p className={`text-sm mt-4 text-center ${message.includes("Error") || message.includes("Failed") ? "text-red-400" : "text-emerald-400"}`}>
              {message}
            </p>
          )}
        </form>

      </div>

      <footer className="mt-12 py-6 text-center text-xs text-neutral-600 border-t border-neutral-900">
        Built by <a href="https://infinite-machines-production.up.railway.app" className="text-neutral-400 hover:text-white transition">Infinite Machines</a>
      </footer>
    </main>
  );
}