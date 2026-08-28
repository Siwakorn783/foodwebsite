import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">

      <h1 className="text-3xl font-bold text-foreground mb-2">ไม่พบหน้าที่ต้องการ</h1>
      <p className="text-muted mb-6">หน้าที่คุณค้นหาอาจไม่มีอยู่ หรือถูกลบไปแล้ว</p>
      <Link
        href="/"
        className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors shadow-md"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
