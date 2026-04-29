"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const CustomCaseForm = ({ blok, tilt }: any) => {
  const schema = buildCustomCaseSchema(blok);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <label htmlFor="first_name">First Name</label>
      <input id="first_name" {...register("first_name")} />
      {errors.first_name && <p>{errors.first_name.message}</p>}

      <label htmlFor="last_name">Last Name</label>
      <input id="last_name" {...register("last_name")} />
      {errors.last_name && <p>{errors.last_name.message}</p>}

      <label htmlFor="customer_email">Email Address</label>
      <input id="customer_email" type="email" {...register("customer_email")} />
      {errors.customer_email && <p>{errors.customer_email.message}</p>}

      <label htmlFor="price">Price</label>
      <select id="price" {...register("price")}>
        <option value="">Select price</option>
        {blok.prices.map((price: string) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
      {errors.price && <p>{errors.price.message}</p>}

      <label htmlFor="theme">Theme</label>
      <select id="theme" {...register("theme")}>
        <option value="">Select theme</option>
        {blok.themes.map((theme: string) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      {errors.theme && <p>{errors.theme.message}</p>}

      <button disabled={!isValid} type="submit">
        Submit
      </button>
    </form>
  );
};

export default CustomCaseForm;
