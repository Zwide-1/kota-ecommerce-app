"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MenuItem, Additive } from "@/types/menu";
import MenuItemCard from "./MenuItemCard";

export default function MenuList() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [additives, setAdditives] = useState<Additive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchData() {
      setLoading(true);
      setError(null);

      const [menuRes, additivesRes] = await Promise.all([
        supabase.from("menu_items").select("*").gt("stock_quantity", 0).order("name"),
        supabase.from("additives").select("*").order("name"),
      ]);

      if (menuRes.error) {
        setError(menuRes.error.message);
        setLoading(false);
        return;
      }
      if (additivesRes.error) {
        setError(additivesRes.error.message);
        setLoading(false);
        return;
      }

      setMenuItems(menuRes.data as MenuItem[]);
      setAdditives(additivesRes.data as Additive[]);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-medium">Failed to load menu: {error}</p>
        <button onClick={() => window.location.reload()} className="mt-3 text-sm text-orange-500 underline">
          Try again
        </button>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return <p className="text-center text-gray-500 py-12">No kota available right now. Check back soon!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} additives={additives} />
      ))}
    </div>
  );
}
