export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="py-6">
        {children}
      </div>
    </section>
  );
}
