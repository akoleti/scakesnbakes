import React, { useState, useEffect, useRef } from "react";
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

const PRODUCT_PRICE = {
  "Cakes": "$20 per lb",
  "Cupcakes": "$12 per 12, or $2 each",
  "Cake Pops": "$2 each",
  "Cookies": "$2 each",
  "Themed Birthday Cakes": "We'll quote based on size & design",
  "Brownies": "$15 for 7 pieces",
  "Bread Loaves": "$20 (2 lb loaf)",
  "Cupcake Bouquets": "$25 (7 count)",
  "Dessert Cups & Parfaits": "$2 each",
};

function OrderSection(props) {
  const { defaultProduct = "", defaultDetails = "" } = props;
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const imageInputRef = useRef(null);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      productType: defaultProduct,
      message: defaultDetails ? `Interested in: ${defaultDetails}. ` : "",
    },
  });

  const selectedProduct = watch("productType");
  const isCustomCake = selectedProduct === "Custom Cakes";
  const selectedPrice = selectedProduct ? (PRODUCT_PRICE[selectedProduct] || null) : null;

  useEffect(() => {
    if (defaultProduct || defaultDetails) {
      setValue("productType", defaultProduct);
      setValue("message", defaultDetails ? `Interested in: ${defaultDetails}. ` : "");
    }
  }, [defaultProduct, defaultDetails, setValue]);

  const onSubmit = (data) => {
    const { name, email, phone, productType, dateNeeded, dietary, message, quantityOrSize } = data;
    const orderDetails = [
      productType && `Product: ${productType}`,
      quantityOrSize && `Quantity / size: ${quantityOrSize}`,
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
      product_type: productType || "",
      quantity_or_size: quantityOrSize || "",
      date_needed: dateNeeded || "",
      dietary: dietary || "",
    };
    const file = imageInputRef.current?.files?.[0];
    if (file && file.size > 0) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          const base64 = typeof dataUrl === "string" && dataUrl.startsWith("data:")
            ? dataUrl.replace(/^data:[^;]+;base64,/, "")
            : "";
          if (base64) {
            payload.imageBase64 = base64;
            payload.imageFilename = file.name || "reference-image";
          }
          setPending(true);
          contact
            .submit(payload)
            .then(() => {
              reset();
              if (imageInputRef.current) imageInputRef.current.value = "";
              setFormAlert({
                type: "success",
                message: "Thank you! Your order request has been received. One of our team members will call you shortly to confirm your order.",
              });
            })
            .catch((err) => {
              setFormAlert({ type: "error", message: err.message });
            })
            .finally(() => {
              setPending(false);
              resolve();
            });
        };
        reader.onerror = () => reject(new Error("Could not read image"));
        reader.readAsDataURL(file);
      });
    }
    setPending(true);
    contact
      .submit(payload)
      .then(() => {
        reset();
        if (imageInputRef.current) imageInputRef.current.value = "";
        setFormAlert({
          type: "success",
          message: "Thank you! Your order request has been received. One of our team members will call you shortly to confirm your order.",
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
          {defaultProduct && (
            <p className="text-center">
              <span className="inline-block px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
                Ordering: {defaultProduct}
              </span>
            </p>
          )}
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
                {selectedProduct && (
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedPrice ? (
                      <span><strong>Price:</strong> {selectedPrice}</span>
                    ) : (
                      <span>We&apos;ll quote based on your needs.</span>
                    )}
                  </p>
                )}
              </div>
              <TextField
                type="text"
                label="Quantity or size"
                id="quantityOrSize"
                placeholder="e.g. 2 lb, 24 cupcakes, 1 loaf, 7-count bouquet"
                error={errors.quantityOrSize}
                {...register("quantityOrSize")}
              />
              {isCustomCake && (
                <div className="w-full">
                  <label htmlFor="referenceImage" className="mb-1.5 block font-medium text-foreground">
                    Reference image (optional)
                  </label>
                  <input
                    ref={imageInputRef}
                    type="file"
                    id="referenceImage"
                    accept="image/*"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground file:cursor-pointer"
                  />
                  <p className="mt-1 text-xs text-gray-500">Upload a photo of the design or cake you&apos;d like.</p>
                </div>
              )}
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
