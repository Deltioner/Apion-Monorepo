/**
 * Generate a short, human-friendly order number.
 *
 * Format: AP-YYYYMMDD-XXXXX  (e.g. AP-20260512-7K3FQ)
 *
 * Not cryptographically unique — the DB enforces uniqueness via constraint.
 * On the rare collision the caller should retry.
 */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

export function generateOrderNumber(now: Date = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `AP-${y}${m}${d}-${suffix}`;
}
