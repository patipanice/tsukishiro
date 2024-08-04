export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="">
        {children}
      </div>
    </section>
  );
}
