"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

const COUNTIES = [
  "Los Angeles, CA", "Cook, IL", "Harris, TX", "Maricopa, AZ", 
  "San Diego, CA", "Orange, CA", "Miami-Dade, FL", "Kings, NY", 
  "Dallas, TX", "Queens, NY", "Riverside, CA", "San Bernardino, CA", 
  "Clark, NV", "Tarrant, TX", "Broward, FL", "Bexar, TX", 
  "King, WA", "Wayne, MI", "Santa Clara, CA", "Bronx, NY"
];

// Placeholder waitlist status data (1=open, 0=closed)
const WAITLIST_STATUS = COUNTIES.reduce((acc, county) => {
  acc[county] = { status: "closed", lastUpdated: "2026-03-08" };
  return acc;
}, {} as Record<string, {status: string, lastUpdated: string}>);

export default function Home() {
  const [email, setEmail] = useState("");
  const [county, setCounty] = useState(COUNTIES[0]);
  const [statusMsg, setStatusMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    if (!email) return;

    // Simulate Supabase insert
    try {
      // In production, insert to a "housing_alerts" table
      // await supabase.from('housing_alerts').insert([{ email, county }]);
      
      setStatusMsg({ type: 'success', text: `Alert set for ${county}. We'll email ${email} when the waitlist opens.` });
      setEmail("");
    } catch (err) {
      setStatusMsg({ type: 'error', text: "Failed to subscribe. Please try again later." });
    }
  };

  return (
    <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-6 py-12">
      <div className="flex-1">
        <div className="mb-12">
          <p className="text-sm text-neutral-500 uppercase tracking-widest mb-4">HousingAlert</p>
          <h1 className="text-4xl font-semibold text-white mb-4 leading-tight">
            Stop checking daily.<br />We&apos;ll email you.
          </h1>
          <p className="text-neutral-400 text-lg max-w-lg leading-relaxed mb-6">
            Get an email alert the moment Section 8 or affordable housing lotteries open in your county. Free community service for the top 20 US counties.
          </p>

          <div className="p-4 rounded border border-yellow-900 bg-yellow-950/20 text-xs text-yellow-500/80 leading-relaxed mb-10">
            <strong>Disclaimer:</strong> Housing waitlist status is updated manually and may not reflect real-time changes. Always verify directly with your local housing authority before taking action. This is a community notification service, not an official government resource.
          </div>
        </div>
        
        <form onSubmit={subscribe} className="bg-neutral-950 border border-neutral-800 p-6 rounded-lg mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Target County</label>
              <select 
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded text-white focus:outline-none focus:border-neutral-500"
              >
                {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Email Address</label>
              <input 
                type="email" required placeholder="you@example.com"
                className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded text-white focus:outline-none focus:border-neutral-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded hover:bg-neutral-200 transition">
            Set Alert
          </button>
          
          {statusMsg && (
            <p className={`mt-4 text-sm ${statusMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
              {statusMsg.text}
            </p>
          )}
        </form>

        <h2 className="text-xl font-medium mb-6">Current Waitlist Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-neutral-900 rounded-lg p-6 bg-neutral-950">
          {Object.entries(WAITLIST_STATUS).map(([c, info]) => (
            <div key={c} className="flex justify-between items-center text-sm border-b border-neutral-900 pb-2 last:border-0 last:pb-0">
              <span className="text-neutral-300">{c}</span>
              <span className={`uppercase tracking-widest text-[10px] px-2 py-1 rounded ${info.status === 'open' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-neutral-900 text-neutral-500 border border-neutral-800'}`}>
                {info.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-16 border-t border-neutral-900 py-6 text-center text-xs text-neutral-600">
        Built by <a href="https://infinite-machines-production.up.railway.app" className="text-neutral-500 hover:text-white transition">Infinite Machines</a>
      </footer>
    </main>
  );
}