import { getFromAddress, getResend } from "./client";
import {
  OrderConfirmationEmail,
  type OrderConfirmationProps,
} from "./templates/order-confirmation";

export async function sendOrderConfirmation(args: {
  to: string;
  props: OrderConfirmationProps;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: getFromAddress(),
    to: args.to,
    subject: `Order ${args.props.orderNumber} confirmed — ${args.props.shopName}`,
    react: OrderConfirmationEmail(args.props),
  });
}
