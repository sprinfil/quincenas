import { Alert } from "react-native";

export const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

export const formatMoney = (
  amount: number | string,
  options?: {
    currency?: "MXN" | "USD" | string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  },
): string => {
  const defaultOptions = {
    currency: "MXN",
    locale: "es-MX",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const config = { ...defaultOptions, ...options };

  try {
    const numericAmount =
      typeof amount === "string"
        ? parseFloat(amount.replace(/[^\d.-]/g, ""))
        : amount;

    if (isNaN(numericAmount)) {
      return "$0.00";
    }

    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.currency,
      minimumFractionDigits: config.minimumFractionDigits,
      maximumFractionDigits: config.maximumFractionDigits,
    }).format(numericAmount);
  } catch (error) {
    console.error("Error al formatear dinero:", error);
    return `$${amount}`;
  }
};

export const formatPesos = (amount: number | string): string => {
  return formatMoney(amount, { currency: "MXN", locale: "es-MX" });
};

export const handlePressWithConfirmation = (
  title: string,
  description: string,
  onConfirm: Function,
) => {
  Alert.alert(
    title,
    description,
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: () => {
          onConfirm();
        },
      },
    ],
    { cancelable: true },
  );
};
