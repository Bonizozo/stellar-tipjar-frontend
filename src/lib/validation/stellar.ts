/**
 * Stellar-specific Zod validators (#217).
 *
 * Single source of truth for all Stellar address, transaction hash,
 * and amount validation rules used across forms in the app.
 */

import { z } from "zod";

/** Regex for a valid Stellar public key (G-address, 56 chars). */
export const stellarAddressRegex = /^G[A-Z2-7]{55}$/;

/** Regex for a valid Stellar transaction hash (64 lowercase hex chars). */
export const transactionHashRegex = /^[a-fA-F0-9]{64}$/;

/**
 * Validates a Stellar public key (G-address).
 * Accepts the full 56-character strkey format.
 */
export const stellarAddressSchema = z
  .string()
  .min(1, "Stellar address is required")
  .length(56, "Stellar address must be exactly 56 characters")
  .regex(stellarAddressRegex, "Invalid Stellar address — must start with G and contain only base-32 characters");

/**
 * Validates a Stellar transaction hash.
 * Accepts 64-character hexadecimal strings (upper- or lower-case).
 */
export const transactionHashSchema = z
  .string()
  .min(1, "Transaction hash is required")
  .regex(transactionHashRegex, "Invalid transaction hash — must be 64 hexadecimal characters");

/**
 * Validates a payment amount in XLM stroops representation.
 * - Must be a positive number
 * - Maximum 7 decimal places (1 stroop precision)
 */
export const amountSchema = z
  .string()
  .min(1, "Amount is required")
  .refine((val) => {
    const num = parseFloat(val);
    return Number.isFinite(num) && num > 0;
  }, "Amount must be a positive number")
  .refine((val) => {
    const parts = val.split(".");
    return parts.length === 1 || parts[1].length <= 7;
  }, "Amount can have at most 7 decimal places (1 stroop precision)");

/**
 * Validates an optional Stellar address.
 * Empty strings are treated as absent (no address).
 */
export const optionalStellarAddressSchema = stellarAddressSchema
  .optional()
  .or(z.literal(""));
