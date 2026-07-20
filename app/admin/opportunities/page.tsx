"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function AdminOpportunitiesPage() {

  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    requiredSkills: "",
    hiveReward: "",
    reputationReward: "",
    contributorsNeeded: "",
    applicationDeadline: "",
    completionDeadline: "",
    referenceLinks: "",
  });

  const load = async () => {

    const res = await fetch(
      `${API}/api/opportunities`
    );

    const data = await res.json();

    setOpportunities(data);

  };

  useEffect(() => {
    load();
  }, []);

  const createOpportunity = async () => {

    try {

      setLoading(true);

      await fetch(
        `${API}/api/opportunities`,
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({

            title: form.title,

            description: form.description,

            category: form.category,

            difficulty: form.difficulty,

            requiredSkills:
              form.requiredSkills
                .split(",")
                .map(s => s.trim())
                .filter(Boolean),

            hiveReward:
              Number(form.hiveReward),

            reputationReward:
              Number(form.reputationReward),

            contributorsNeeded:
              Number(form.contributorsNeeded),

            applicationDeadline:
              form.applicationDeadline,

            completionDeadline:
              form.completionDeadline,

            referenceLinks:
              form.referenceLinks
                .split(",")
                .map(s=>s.trim())
                .filter(Boolean),

          }),
        }
      );

      alert("Opportunity created.");

      setForm({
        title:"",
        description:"",
        category:"",
        difficulty:"Beginner",
        requiredSkills:"",
        hiveReward:"",
        reputationReward:"",
        contributorsNeeded:"",
        applicationDeadline:"",
        completionDeadline:"",
        referenceLinks:"",
      });

      load();

    } catch(err){

      console.error(err);

    } finally{

      setLoading(false);

    }

  };

  const deleteOpportunity = async(id:string)=>{

    if(!confirm("Delete this opportunity?"))
      return;

    await fetch(
      `${API}/api/opportunities/${id}`,
      {
        method:"DELETE",
      }
    );

    load();

  };

  return (

    <main className="min-h-screen section max-w-7xl mx-auto">

      <h1 className="text-5xl font-bold mb-10">
        Opportunity Management
      </h1>

      <div className="glass-card p-8 mb-12 space-y-5">

        <input
          placeholder="Opportunity Title"
          value={form.title}
          onChange={(e)=>setForm({...form,title:e.target.value})}
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <textarea
          rows={5}
          placeholder="Description"
          value={form.description}
          onChange={(e)=>setForm({...form,description:e.target.value})}
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <div className="grid md:grid-cols-2 gap-5">

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
            className="bg-black border border-gray-700 rounded px-4 py-3"
          />

          <select
            value={form.difficulty}
            onChange={(e)=>setForm({...form,difficulty:e.target.value})}
            className="bg-black border border-gray-700 rounded px-4 py-3"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>

        </div>

        <input
          placeholder="Required Skills (comma separated)"
          value={form.requiredSkills}
          onChange={(e)=>setForm({...form,requiredSkills:e.target.value})}
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="number"
            placeholder="HIVE Reward"
            value={form.hiveReward}
            onChange={(e)=>setForm({...form,hiveReward:e.target.value})}
            className="bg-black border border-gray-700 rounded px-4 py-3"
          />

          <input
            type="number"
            placeholder="Reputation Reward"
            value={form.reputationReward}
            onChange={(e)=>setForm({...form,reputationReward:e.target.value})}
            className="bg-black border border-gray-700 rounded px-4 py-3"
          />

          <input
            type="number"
            placeholder="Contributors Needed"
            value={form.contributorsNeeded}
            onChange={(e)=>setForm({...form,contributorsNeeded:e.target.value})}
            className="bg-black border border-gray-700 rounded px-4 py-3"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="date"
            value={form.applicationDeadline}
            onChange={(e)=>setForm({...form,applicationDeadline:e.target.value})}
            className="bg-black border border-gray-700 rounded px-4 py-3"
          />

          <input
            type="date"
            value={form.completionDeadline}
            onChange={(e)=>setForm({...form,completionDeadline:e.target.value})}
            className="bg-black border border-gray-700 rounded px-4 py-3"
          />

        </div>

        <input
          placeholder="Reference Links (comma separated)"
          value={form.referenceLinks}
          onChange={(e)=>setForm({...form,referenceLinks:e.target.value})}
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <button
          onClick={createOpportunity}
          disabled={loading}
          className="btn-primary"
        >
          {loading
            ? "Creating..."
            : "Create Opportunity"}
        </button>

      </div>

      <h2 className="text-3xl font-bold mb-8">
        Existing Opportunities
      </h2>

      <div className="space-y-6">

        {opportunities.map((item)=>(

          <div
            key={item._id}
            className="glass-card p-6 flex justify-between items-center"
          >

            <div>

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="text-gray-400">
                {item.category}
              </p>

              <p className="text-green-400">
                HIVE: {item.hiveReward}
              </p>

            </div>

            <button
              onClick={()=>deleteOpportunity(item._id)}
              className="px-5 py-2 rounded bg-red-600 hover:bg-red-500"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </main>

  );

}