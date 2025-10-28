/**
 * Clerk Theme Configuration
 * Custom theme matching CodePulse brand colors
 */

import { dark } from "@clerk/themes";
import type { Appearance } from "@clerk/types";

export const clerkTheme: Appearance = {
  baseTheme: dark,
  variables: {
    // Brand colors
    colorPrimary: "#635BFF", // Electric Indigo
    colorSuccess: "#4ECDC4", // Mint Green
    colorWarning: "#FFD93D", // Amber Warn
    colorDanger: "#FF6B6B", // Coral Red

    // Background colors
    colorBackground: "#0E1116", // Deep Space
    colorInputBackground: "#1A1D24", // Graphite

    // Text colors
    colorText: "#FFFFFF",
    colorTextSecondary: "#9BA1AB", // Cloud Gray

    // Border and input
    colorInputText: "#FFFFFF",
    borderRadius: "0.5rem",

    // Fonts
    fontFamily: "var(--font-inter), sans-serif",
    fontFamilyButtons: "var(--font-inter), sans-serif",
  },
  elements: {
    // Root container
    rootBox: {
      backgroundColor: "#0E1116",
    },

    // Card styling
    card: {
      backgroundColor: "#1A1D24",
      border: "1px solid rgba(99, 91, 255, 0.2)",
      boxShadow: "0 0 30px rgba(99, 91, 255, 0.15)",
    },

    // Header
    headerTitle: {
      color: "#FFFFFF",
      fontSize: "1.875rem",
      fontWeight: 700,
    },
    headerSubtitle: {
      color: "#9BA1AB",
    },

    // Social buttons
    socialButtonsBlockButton: {
      backgroundColor: "#1A1D24",
      border: "1px solid rgba(99, 91, 255, 0.3)",
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "rgba(99, 91, 255, 0.1)",
        borderColor: "#635BFF",
      },
    },

    // Form fields
    formFieldInput: {
      backgroundColor: "#1A1D24",
      border: "1px solid rgba(99, 91, 255, 0.2)",
      color: "#FFFFFF",
      "&:focus": {
        borderColor: "#35E2D1", // Soft Cyan
        boxShadow: "0 0 0 2px rgba(53, 226, 209, 0.2)",
      },
    },
    formFieldLabel: {
      color: "#FFFFFF",
      fontWeight: 600,
    },

    // Primary button
    formButtonPrimary: {
      backgroundColor: "#635BFF",
      color: "#FFFFFF",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: "rgba(99, 91, 255, 0.9)",
        boxShadow: "0 4px 12px rgba(99, 91, 255, 0.5)",
      },
    },

    // Footer links
    footerActionLink: {
      color: "#35E2D1",
      "&:hover": {
        color: "#4ECDC4",
      },
    },

    // Divider
    dividerLine: {
      backgroundColor: "rgba(99, 91, 255, 0.2)",
    },
    dividerText: {
      color: "#9BA1AB",
    },

    // Alert/Error messages
    alertText: {
      color: "#FF6B6B",
    },

    // Loading spinner
    spinner: {
      color: "#635BFF",
    },

    // Identifier preview (email/phone display)
    identityPreview: {
      backgroundColor: "#1A1D24",
      border: "1px solid rgba(99, 91, 255, 0.2)",
    },

    // Form field error
    formFieldInputShowPasswordButton: {
      color: "#9BA1AB",
      "&:hover": {
        color: "#35E2D1",
      },
    },

    // OTP input
    otpCodeFieldInput: {
      backgroundColor: "#1A1D24",
      border: "1px solid rgba(99, 91, 255, 0.2)",
      color: "#FFFFFF",
      "&:focus": {
        borderColor: "#35E2D1",
      },
    },
  },
};
