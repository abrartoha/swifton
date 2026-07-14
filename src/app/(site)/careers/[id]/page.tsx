import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { ApplyForm } from "./ApplyForm";

export const dynamic = "force-dynamic";

type Job = {
  id: string;
  title: string;
  brand: string;
  location: string | null;
  employment_type: string | null;
  description: string | null;
  is_open: boolean;
};

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let job: Job | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("job_postings")
      .select("*")
      .eq("id", id)
      .eq("is_open", true)
      .single();
    job = (data as Job) ?? null;
  } catch {
    job = null;
  }

  if (!job) notFound();

  return (
    <>
      <PageHeader
        eyebrow={job.brand}
        title={job.title}
        intro={[job.location, job.employment_type].filter(Boolean).join(" · ")}
      />

      <section className="container-page py-16">
        <Link
          href="/careers"
          className="text-sm text-gold-600 hover:text-gold-700"
        >
          ← All openings
        </Link>

        <div className="mt-8 grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <div className="prose max-w-none">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              About the role
            </h2>
            <div className="gold-rule mt-4" />
            <p className="mt-6 whitespace-pre-line leading-relaxed text-navy-700">
              {job.description || "Full details will be shared at interview."}
            </p>
          </div>

          <aside className="h-fit rounded-2xl border border-navy-100 bg-white p-8 shadow-elegant">
            <h2 className="font-serif text-xl font-semibold text-navy-900">
              Apply now
            </h2>
            <p className="mt-2 text-sm text-navy-600">
              It takes a couple of minutes.
            </p>
            <div className="mt-6">
              <ApplyForm jobId={job.id} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
