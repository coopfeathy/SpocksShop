import { AdminLoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-md py-16">
      <h1 className="text-2xl font-semibold">Admin sign in</h1>
      <p className="mt-2 text-sm text-slate-600">Staff only. Customer storefront is unchanged.</p>
      <AdminLoginForm />
    </div>
  );
}
