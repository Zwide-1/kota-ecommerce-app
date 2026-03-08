import MenuList from "@/components/menu/MenuList";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Kota Menu
        </h1>

        <p className="text-gray-500 mb-8">
          Build your perfect kota with extras
        </p>

        {/* Menu items displayed here */}
        <MenuList />

      </div>

    </main>
  );
}
