import { cartRouter } from "./routers/cart";
import { checkoutRouter } from "./routers/checkout";
import { ordersRouter } from "./routers/orders";
import { productsRouter } from "./routers/products";
import { router } from "./trpc";

export const appRouter = router({
  products: productsRouter,
  cart: cartRouter,
  checkout: checkoutRouter,
  orders: ordersRouter,
});

export type AppRouter = typeof appRouter;
