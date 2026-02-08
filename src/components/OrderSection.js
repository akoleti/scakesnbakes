import React, { useState } from "react";
import Link from "next/link";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import FormAlert from "components/FormAlert";
import TextField from "components/TextField";
import Button from "components/Button";
import LoadingIcon from "components/LoadingIcon";
import contact from "util/contact";

const PRODUCT_OPTIONS = [
  { value: "", label: "Select what you'd like..." },
  { value: "Cakes", label: "Cakes" },
  { value: "Cupcakes", label: "Cupcakes" },
  { value: "Cake Pops", label: "Cake Pops" },
  { value: "Cookies", label: "Cookies" },
  { value: "Themed Birthday Cakes", label: "Themed Birthday Cakes" },
  { value: "Themed Cupcake Sets", label: "Themed Cupcake Sets" },
  { value: "Tiramisu & Layer Cakes", label: "Tiramisu & Layer Cakes" },
  { value: "Dessert Cups & Parfaits", label: "Dessert Cups & Parfaits" },
  { value: "Cupcake Bouquets", label: "Cupcake Bouquets" },
  { value: "Custom Cakes", label: "Custom Cakes" },
  { value: "Birthday Party Orders", label: "Birthday Party Orders" },
  { value: "Bread Loaves", label: "Bread Loaves" },
  { value: "Brownies", label: "Brownies" },
  { value: "Multiple / assortment", label: "Multiple / assortment" },
];

function OrderSection(props) {
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, phone, productType, dateNeeded, dietary, message } = data;
    const orderDetails = [
      productType && `Product: ${productType}`,
      dateNeeded && `Date needed: ${dateNeeded}`,
      dietary && `Dietary requirements: ${dietary}`,
      message && `Details: ${message}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    const payload = {
      name,
      email,
      phone: phone || "",
      subject: "Order",
      message: orderDetails || "No details provided.",
    };
    setPending(true);
    contact
      .submit(payload)
      .then(() => {
        reset();
        setFormAlert({
          type: "success",
          message: "Your order request has been sent! We'll get back to you to confirm details and pricing.",
        });
      })
      .catch((error) => {
        setFormAlert({
          type: "error",
          message: error.message,
        });
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Section
      size={props.size}
      bgColor={props.bgColor}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      textColor={props.textColor}
    >
      <div className="relative overflow-hidden">
        <div className="pattern-dots text-border absolute top-0 left-0 w-32 h-48 md:h-96 transform translate-y-12 -translate-x-16 md:-translate-x-4" />
        <div className="pattern-dots text-border absolute bottom-0 right-0 w-32 h-48 md:h-96 transform -translate-y-12 translate-x-16 md:translate-x-6" />
        <div className="relative container xl:max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
          <SectionHeader
            title={props.title || "Place an order"}
            subtitle={props.subtitle || "Tell us what you’d like and when you need it. We’ll confirm availability and pricing."
            }
            strapline={props.strapline || "Order now"}
            className="text-center"
          />
          <p className="text-center text-gray-600 max-w-xl mx-auto">
            Browse our <Link href="/products" legacyBehavior passHref><a className="text-primary font-medium hover:underline">products</a></Link> or{" "}
            <Link href="/gallery" legacyBehavior passHref><a className="text-primary font-medium hover:underline">gallery</a></Link> for ideas.
          </p>
          <div className="mx-auto max-w-2xl">
            {formAlert && (
              <div className="mb-6">
                <FormAlert type={formAlert.type} message={formAlert.message} />
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  type="text"
                  label="Name"
                  id="name"
                  placeholder="Your name"
                  error={errors.name}
                  {...register("name", { required: "Please enter your name" })}
                />
                <TextField
                  type="email"
                  label="Email"
                  id="email"
                  placeholder="you@example.com"
                  error={errors.email}
                  {...register("email", { required: "Please enter your email" })}
                />
              </div>
              <TextField
                type="tel"
                label="Phone"
                id="phone"
                placeholder="+1 (555) 000-0000"
                error={errors.phone}
                {...register("phone")}
              />
              <div className="w-full">
                <label htmlFor="productType" className="mb-1.5 block font-medium text-foreground">
                  What would you like to order?
                </label>
                <select
                  id="productType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 md:text-sm"
                  {...register("productType")}
                >
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option key={opt.value || "empty"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  type="text"
                  label="Date needed"
                  id="dateNeeded"
                  placeholder="e.g. March 15 or ASAP"
                  error={errors.dateNeeded}
                  {...register("dateNeeded")}
                />
                <TextField
                  type="text"
                  label="Dietary requirements"
                  id="dietary"
                  placeholder="Allergies, vegan, gluten-free, etc."
                  error={errors.dietary}
                  {...register("dietary")}
                />
              </div>
              <TextField
                type="textarea"
                label="Order details"
                id="message"
                placeholder="Quantity, size, flavors, theme, or any special requests..."
                rows={5}
                error={errors.message}
                {...register("message")}
              />
              <Button
                type="submit"
                size="lg"
                disabled={pending}
                isBlock={true}
                startIcon={
                  !pending && (
                    <PaperAirplaneIcon className="opacity-50 inline-block w-5 h-5" />
                  )
                }
                className="w-48"
              >
                {!pending && <>Submit order request</>}
                {pending && <LoadingIcon className="w-6" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default OrderSection;
