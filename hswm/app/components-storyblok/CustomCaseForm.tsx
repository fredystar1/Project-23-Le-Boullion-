"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import {
  submitCustomCase,
  type CustomCaseFormState,
} from "../lib/actions/submitCustomCase";
import Link from "next/link";

const buildCustomCaseSchema = (blok: any) =>
  z.object({
    first_name: z.string().min(1, "First name is required."),
    last_name: z.string().min(1, "Last name is required."),
    customer_email: z.email("Please provide a valid email."),

    price: z.string().refine((value) => blok.prices.includes(value), {
      message: "Please select a valid price.",
    }),

    theme: z.string().refine((value) => blok.themes.includes(value), {
      message: "Please select a valid theme.",
    }),
  });

const initialState: CustomCaseFormState = {
  success: false,
  message: "",
};

const CustomCaseForm = ({ blok }: any) => {
  const schema = buildCustomCaseSchema(blok);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [state, formAction, isPending] = useActionState(
    submitCustomCase,
    initialState,
  );

  if (state.success) {
    return (
    <div className="flex flex-col items-center justify-center w-full text-center">
    <div className="form-success">
      {state.message}
      
      </div>
    <div className="rect-button-container color-set-1 mx-auto">
          <Link className="rect-button-top font-change" href="/">
            Return Home
          </Link>
        </div>  
        </div>
    );
  }

  return (
    <>
    <h1 className="section-headline">Custom Case Form</h1>
    <form action={formAction} className="form-panel">
      <div className="form-field">
        <label htmlFor="first_name" className="form-label">
          First Name<span aria-hidden="true" className="form-required">*</span>
        </label>
        <input
          id="first_name"
          className={`form-input ${errors.first_name || state.errors?.first_name ? "form-input--error" : ""}`}
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="form-error">{errors.first_name.message}</p>
        )}
        {state.errors?.first_name && (
          <p className="form-error">{state.errors.first_name}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="last_name" className="form-label">
            Last Name<span aria-hidden="true" className="form-required">*</span>
        </label>
        <input
          id="last_name"
          className={`form-input ${errors.last_name || state.errors?.last_name ? "form-input--error" : ""}`}
          {...register("last_name")}
        />
        {errors.last_name && (
          <p className="form-error">{errors.last_name.message}</p>
        )}
        {state.errors?.last_name && (
          <p className="form-error">{state.errors.last_name}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="customer_email" className="form-label">
          Email Address<span aria-hidden="true" className="form-required">*</span>
        </label>
        <input
          id="customer_email"
          type="email"
          className={`form-input ${errors.customer_email || state.errors?.customer_email ? "form-input--error" : ""}`}
          {...register("customer_email")}
        />
        {errors.customer_email && (
          <p className="form-error">{errors.customer_email.message}</p>
        )}
        {state.errors?.customer_email && (
          <p className="form-error">{state.errors.customer_email}</p>
        )}
      </div>

      <div className="form-divider" />

      <div className="form-field">
        <label htmlFor="price" className="form-label">
          Price<span aria-hidden="true" className="form-required">*</span>
        </label>
        <select
          id="price"
          className={`form-select ${errors.price || state.errors?.price ? "form-input--error" : ""}`}
          {...register("price")}
        >
          <option value="">Select price</option>
          {blok.prices.map((price: string) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
        {errors.price && (
          <p className="form-error">{errors.price.message}</p>
        )}
        {state.errors?.price && (
          <p className="form-error">{state.errors.price}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="theme" className="form-label">
          Theme<span aria-hidden="true" className="form-required">*</span>
        </label>
        <select
          id="theme"
          className={`form-select ${errors.theme || state.errors?.theme ? "form-input--error" : ""}`}
          {...register("theme")}
        >
          <option value="">Select theme</option>
          {blok.themes.map((theme: string) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
        {errors.theme && (
          <p className="form-error">{errors.theme.message}</p>
        )}
        {state.errors?.theme && (
          <p className="form-error">{state.errors.theme}</p>
        )}
      </div>

      <button
        disabled={!isValid || isPending}
        type="submit"
        className="form-submit"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
    </>
  );
};

export default CustomCaseForm;
