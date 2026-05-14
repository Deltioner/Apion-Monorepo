import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type OrderConfirmationLine = {
  title: string;
  quantity: number;
  priceCents: number;
};

export type OrderConfirmationProps = {
  orderNumber: string;
  customerName?: string;
  currency: string;
  lines: OrderConfirmationLine[];
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  shopName: string;
  shopUrl: string;
  /** Public download links for digital products (if applicable) */
  downloads?: { title: string; url: string }[];
};

function formatMoney(cents: number, currency: string): string {
  const value = (cents / 100).toFixed(2);
  return `${currency} ${value}`;
}

export function OrderConfirmationEmail(props: OrderConfirmationProps) {
  const {
    orderNumber,
    customerName,
    currency,
    lines,
    subtotalCents,
    taxCents,
    totalCents,
    shopName,
    shopUrl,
    downloads,
  } = props;

  return (
    <Html>
      <Head />
      <Preview>
        Order {orderNumber} confirmed — thanks for shopping at {shopName}
      </Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={h1}>Thanks{customerName ? `, ${customerName}` : ""}!</Heading>
          <Text style={p}>
            We received your order <strong>{orderNumber}</strong>. A copy of this
            receipt has been saved to your account.
          </Text>

          <Section style={card}>
            {lines.map((line, i) => (
              <div key={i} style={lineRow}>
                <Text style={lineTitle}>
                  {line.title}
                  {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                </Text>
                <Text style={lineAmount}>
                  {formatMoney(line.priceCents * line.quantity, currency)}
                </Text>
              </div>
            ))}

            <Hr style={hr} />

            <div style={lineRow}>
              <Text style={muted}>Subtotal</Text>
              <Text style={muted}>{formatMoney(subtotalCents, currency)}</Text>
            </div>
            {taxCents > 0 ? (
              <div style={lineRow}>
                <Text style={muted}>Tax</Text>
                <Text style={muted}>{formatMoney(taxCents, currency)}</Text>
              </div>
            ) : null}
            <div style={lineRow}>
              <Text style={totalLabel}>Total</Text>
              <Text style={totalAmount}>
                {formatMoney(totalCents, currency)}
              </Text>
            </div>
          </Section>

          {downloads && downloads.length > 0 ? (
            <Section style={card}>
              <Heading as="h2" style={h2}>
                Your downloads
              </Heading>
              {downloads.map((d, i) => (
                <Text key={i} style={p}>
                  <Link href={d.url}>{d.title}</Link>
                </Text>
              ))}
              <Text style={muted}>
                Links expire in 7 days. Re-download anytime from your order page.
              </Text>
            </Section>
          ) : null}

          <Text style={muted}>
            Questions? Reply to this email or visit{" "}
            <Link href={shopUrl}>{shopUrl}</Link>.
          </Text>

          <Hr style={hr} />
          <Img
            src={`${shopUrl}/logo.svg`}
            width="32"
            height="32"
            alt={shopName}
          />
          <Text style={footer}>
            © {new Date().getFullYear()} {shopName}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#f6f6f8",
  fontFamily:
    "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  padding: "24px 0",
};
const containerStyle = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  maxWidth: "560px",
  borderRadius: "12px",
};
const h1 = { fontSize: "24px", marginBottom: "8px", color: "#0f172a" };
const h2 = { fontSize: "18px", marginBottom: "8px", color: "#0f172a" };
const p = { fontSize: "15px", lineHeight: "22px", color: "#0f172a" };
const muted = { fontSize: "13px", color: "#64748b" };
const card = {
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "16px",
  margin: "16px 0",
};
const lineRow = {
  display: "flex",
  justifyContent: "space-between",
  margin: "4px 0",
};
const lineTitle = { fontSize: "14px", color: "#0f172a" };
const lineAmount = { fontSize: "14px", color: "#0f172a" };
const totalLabel = { fontSize: "15px", fontWeight: 600, color: "#0f172a" };
const totalAmount = { fontSize: "15px", fontWeight: 600, color: "#0f172a" };
const hr = { borderColor: "#e2e8f0", margin: "12px 0" };
const footer = { fontSize: "12px", color: "#94a3b8" };
