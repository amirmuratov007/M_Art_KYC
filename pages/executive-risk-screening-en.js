
export default function Page() {
  return (
    <main className="min-h-screen bg-[#050816] text-white p-10">
      <h1 className="text-6xl font-semibold">{title}</h1>
      <p className="mt-6 text-white/70 max-w-3xl">{description}</p>
    </main>
  )
}

const title = "Executive Risk Screening"
const description = "Executive background intelligence and risk screening for sensitive roles."
