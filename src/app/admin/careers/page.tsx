import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Job = {
  id: string;
  title: string;
  brand: string;
  location: string | null;
  is_open: boolean;
};

type Application = {
  id: string;
  full_name: string;
  email: string;
  stage: string;
  created_at: string;
};

const stageLabels: Record<string, string> = {
  received: "Application Received",
  review: "Under Review",
  interview: "Interview",
  decision: "Decision",
};

export default async function AdminCareersPage() {
  await requireAdmin();

  let jobs: Job[] = [];
  let applications: Application[] = [];
  let dbError = false;
  try {
    const supabase = await createClient();
    const [jobsRes, appsRes] = await Promise.all([
      supabase
        .from("job_postings")
        .select("id, title, brand, location, is_open")
        .order("created_at", { ascending: false }),
      supabase
        .from("job_applications")
        .select("id, full_name, email, stage, created_at")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);
    if (jobsRes.error || appsRes.error) throw jobsRes.error ?? appsRes.error;
    jobs = (jobsRes.data as Job[]) ?? [];
    applications = (appsRes.data as Application[]) ?? [];
  } catch {
    dbError = true;
  }

  return (
    <div>
      <p className="eyebrow">Group Admin</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-navy-900">
        Careers
      </h1>
      <p className="mt-2 text-navy-600">
        Open roles across all brands and the applications received.
      </p>

      {dbError ? (
        <div className="mt-8 rounded-xl border border-gold-200 bg-sand-100 p-6 text-sm text-navy-700">
          Connect Supabase to manage careers. See <code>README.md</code>.
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="font-serif text-xl font-semibold text-navy-900">
              Job postings
            </h2>
            {jobs.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-navy-200 bg-white p-8 text-center text-sm text-navy-500">
                No job postings yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {jobs.map((j) => (
                  <li
                    key={j.id}
                    className="rounded-xl border border-navy-100 bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                        {j.brand}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          j.is_open
                            ? "bg-green-50 text-green-700"
                            : "bg-navy-50 text-navy-500"
                        }`}
                      >
                        {j.is_open ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="mt-2 font-medium text-navy-900">{j.title}</p>
                    {j.location && (
                      <p className="text-sm text-navy-500">{j.location}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy-900">
              Recent applications
            </h2>
            {applications.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-navy-200 bg-white p-8 text-center text-sm text-navy-500">
                No applications yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {applications.map((a) => (
                  <li
                    key={a.id}
                    className="rounded-xl border border-navy-100 bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-navy-900">{a.full_name}</p>
                      <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-medium text-gold-700">
                        {stageLabels[a.stage] ?? a.stage}
                      </span>
                    </div>
                    <a
                      href={`mailto:${a.email}`}
                      className="text-sm text-gold-600 hover:text-gold-700"
                    >
                      {a.email}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
