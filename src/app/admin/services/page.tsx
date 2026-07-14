import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Service = {
  id: string;
  title: string;
  brand: string;
  is_published: boolean;
  sort_order: number;
};

export default async function AdminServicesPage() {
  await requireAdmin();

  let services: Service[] = [];
  let dbError = false;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("id, title, brand, is_published, sort_order")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    services = (data as Service[]) ?? [];
  } catch {
    dbError = true;
  }

  return (
    <div>
      <p className="eyebrow">Group Admin</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-navy-900">
        Services
      </h1>
      <p className="mt-2 text-navy-600">
        The group-wide services showcase. Published items appear on the public
        Services page.
      </p>

      {dbError ? (
        <div className="mt-8 rounded-xl border border-gold-200 bg-sand-100 p-6 text-sm text-navy-700">
          Connect Supabase to manage services. See <code>README.md</code>.
        </div>
      ) : services.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center text-navy-500">
          No services yet. Add rows to the <code>services</code> table and set{" "}
          <code>is_published = true</code> to feature them publicly.
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-100 bg-sand-50 text-navy-500">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Brand</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {services.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 font-medium text-navy-900">
                    {s.title}
                  </td>
                  <td className="px-6 py-4 text-navy-600">{s.brand}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        s.is_published
                          ? "bg-green-50 text-green-700"
                          : "bg-navy-50 text-navy-500"
                      }`}
                    >
                      {s.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
