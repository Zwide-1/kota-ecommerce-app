import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext"; 
import { CartItem } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
/** Price for a single cart line: (base + additives) × qty */
function lineTotal(item: CartItem): number {
  const extras = item.additives.reduce((s: number, a: any) => s + a.price, 0);
  return (item.basePrice + extras) * item.quantity;
}
function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  return (
    <div className="flex flex-col gap-2 py-4">
      {/* Item header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{item.kotaName}</h4>
          <p className="text-xs text-muted-foreground">
            Base: R{item.basePrice.toFixed(2)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.kotaName}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {/* Additives list */}
      {item.additives.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.additives.map((a: any) => (
            <Badge key={a.id} variant="secondary" className="text-xs font-normal">
              {a.name} +R{a.price.toFixed(2)}
            </Badge>
          ))}
        </div>
      )}
      {/* Quantity controls & line price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center text-sm font-medium text-foreground">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <span className="font-semibold text-foreground">
          R{lineTotal(item).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
export default function CartModal() {
  const { items, itemCount, totalPrice, clearCart } = useCart();
  return (
    <Sheet>
      {/* Trigger button – place this in your header/navbar */}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({itemCount})</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground">
            <ShoppingCart className="h-12 w-12 opacity-30" />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Scrollable item list */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="divide-y divide-border">
                {items.map((item: CartItem) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            {/* Totals & actions */}
            <SheetFooter className="flex-col gap-3 sm:flex-col">
              <div className="flex w-full items-center justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>R{totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout — R{totalPrice.toFixed(2)}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-destructive hover:text-destructive"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}