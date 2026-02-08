import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import FormAlert from "components/FormAlert";
import TextField from "components/TextField";
import Button from "components/Button";
import LoadingIcon from "components/LoadingIcon";
import contact from "util/contact";

function ContactSection(props) {
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setPending(true);
    contact
      .submit(data)
      .then(() => {
        reset();
        setFormAlert({
          type: "success",
          message: "Your message has been sent!",
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
            title={props.title}
            subtitle={props.subtitle}
            strapline={props.strapline}
            className="text-center"
          />
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
                  {...register("name")}
                />
                <TextField
                  type="email"
                  label="Email"
                  id="email"
                  placeholder="you@example.com"
                  error={errors.email}
                  {...register("email", {
                    required: "Please enter an email address",
                  })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                  type="tel"
                  label="Phone"
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  error={errors.phone}
                  {...register("phone")}
                />
                <div className="w-full">
                  <label htmlFor="subject" className="mb-1.5 block font-medium text-foreground">
                    Enquiry type
                  </label>
                  <select
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 md:text-sm"
                    {...register("subject")}
                  >
                    <option value="">Select...</option>
                    <option value="General enquiry">General enquiry</option>
                    <option value="Order">Order</option>
                    <option value="Custom cake">Custom cake</option>
                    <option value="Party / event">Party / event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <TextField
                type="textarea"
                label="Message"
                id="message"
                placeholder="Tell us what you need..."
                rows={6}
                error={errors.message}
                {...register("message", {
                  required: "Please enter a message",
                })}
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
                {!pending && <>Send message</>}
                {pending && <LoadingIcon className="w-6" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ContactSection;
