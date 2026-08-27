export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted font-medium">กำลังโหลด...</p>
      </div>
    </div>
  );
}
