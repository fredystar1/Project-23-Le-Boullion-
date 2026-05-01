"use server";

export type CustomCaseFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitCustomCase(
  _prevState: CustomCaseFormState,
  formData: FormData,
): Promise<CustomCaseFormState> {
  const data = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    customer_email: formData.get("customer_email") as string,
    price: formData.get("price") as string,
    theme: formData.get("theme") as string,
  };

  // Server-side validation
  const errors: Record<string, string> = {};

  if (!data.first_name?.trim()) {
    errors.first_name = "First name is required.";
  }
  if (!data.last_name?.trim()) {
    errors.last_name = "Last name is required.";
  }
  if (!data.customer_email?.trim() || !data.customer_email.includes("@")) {
    errors.customer_email = "Please provide a valid email.";
  }
  if (!data.price) {
    errors.price = "Please select a valid price.";
  }
  if (!data.theme) {
    errors.theme = "Please select a valid theme.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors,
    };
  }

  // TODO: Replace with actual API call (e.g., send email, write to DB, etc.)
  console.log("Custom case order submitted:", data);

  return {
    success: true,
    message: "Your custom case request has been submitted! We'll be in touch soon.",
  };
}
