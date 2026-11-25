import { useState } from "react";

import dropdown from "../../../../data/dropdown.json";
import { provinces } from "@shared/types/province";
import type { NewEventInput } from "../../../../types/event";
import Button from "../../../common/button/Button";
import {
  toCamelCase,
  toCapitalized,
  toKebabCase,
  toTitle,
} from "@shared/utils/stringUtils";
import { useFormInput } from "../../../../hooks/useFormInput";

export function NewEventForm({
  handleSubmit,
}: {
  handleSubmit: (input: NewEventInput) => void;
}) {
  function validateField(field: string, value: any): string | null {
    if (field === "image" && !value) return "Image is required.";

    if (field === "title" && !value.trim()) return "Title is required.";

    if (field === "description" && value.length > 500)
      return "Description cannot exceed 500 characters.";

    if (field === "date") {
      if (!value) return "Date is required.";
      if (new Date(value) < new Date()) return "Date must be in the future.";
    }
    if (field === "address" && !value.trim()) return "Address is required.";
    if (field === "city" && !value.trim()) return "City is required.";
    if (field === "province" && !value.trim()) return "Province is required.";
    if (field === "postal code") {
      if (!value.trim()) return "Postal code is required.";
      if (!/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i.test(value.trim()))
        return "Postal code must look like A1A 1A1.";
    }

    if (field === "price" && String(value).trim() !== "") {
      const price = Number(value);
      if (Number.isNaN(price)) return "Price must be numeric.";
      if (price < 0) return "Price cannot be negative.";
    }

    if (field === "capacity" && String(value).trim() !== "") {
      const capacity = Number(value);
      if (Number.isNaN(capacity)) return "Capacity must be numeric.";
      if (!Number.isInteger(capacity))
        return "Capacity must be a whole number.";
      if (capacity < 0) return "Capacity cannot be negative.";
    }

    return null;
  }

  function validateForm(): boolean {
    let isValid = true;

    eventFields.forEach((field) => {
      const valid = field.validate((value) =>
        validateField(field.field, value),
      );
      if (!valid) {
        isValid = false;
      }
    });

    return isValid;
  }

  // default event fields
  const [event, setEvent] = useState<NewEventInput>({
    title: "",
    description: "",
    category: dropdown.categories[0],
    date: new Date().toLocaleDateString(),
    startTime: dropdown.timeOptions[0],
    endTime: dropdown.timeOptions[0],
    location: {
      venue: "",
      address: "",
      city: "",
      province: provinces[0],
      postalCode: "",
    },
    image: "",
    capacity: 0,
    price: 0,
    tags: [],
  });

  // updates the event with user input
  const handleChange = (field: any, e: any) => {
    field.setValue(e.target.value);
    const { name, value } = e.target;

    const parsedValue = ((name === "price" || name === "capacity") ? Number(value) : value);
    
    if (name in event.location) {
      setEvent({
        ...event,
        location: {
          ...event.location,
          [name]: parsedValue,
        },
      });
    } else {
      setEvent({
        ...event,
        [name]: parsedValue,
      });
    }
  };

  const eventFields = [
    useFormInput({
      field: "image",
      type: "file",
      extraFields: { accept: "image/*" },
    }),
    useFormInput({ field: "title", type: "text" }),
    useFormInput({ field: "description", type: "text" }),
    useFormInput({ field: "date", type: "date" }),
    useFormInput({
      field: "start time",
      type: "dropdown",
      dropdown: dropdown.timeOptions,
    }),
    useFormInput({
      field: "end time",
      type: "dropdown",
      dropdown: dropdown.timeOptions,
    }),
    useFormInput({ field: "venue", type: "text" }),
    useFormInput({ field: "address", type: "text" }),
    useFormInput({ field: "city", type: "text" }),
    useFormInput({
      field: "province",
      type: "dropdown",
      dropdown: provinces,
    }),
    useFormInput({ field: "postal code", type: "text" }),
    useFormInput({ field: "price", type: "number", extraFields: { min: "0" } }),
    useFormInput({
      field: "capacity",
      type: "number",
      extraFields: { min: "0" },
    }),
    useFormInput({
      field: "category",
      type: "dropdown",
      dropdown: dropdown.categories,
    }),
  ];

  return (
    <form
      className="
            grid 
            grid-cols-1 
            gap-5 
            md:grid-cols-6 
            md:[grid-template-areas:'title_title_title_image_image_image'_'description_description_description_image_image_image'_'date_start-time_end-time_image_image_image'_'venue_venue_venue_address_address_address'_'city_city_province_province_postal-code_postal-code'_'category_category_price_price_capacity_capacity']"
    >
      {eventFields.map((field) => (
        <div
          key={field.field + field.type}
          className={"event-" + toKebabCase(field.field)}
          style={{
            gridArea: toKebabCase(field.field),
          }}
        >
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {toTitle(field.field)}
          </label>
          {field.dropdown ? (
            <div>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                name={toCamelCase(field.field)}
                value={field.value}
                onChange={(e) => handleChange(field, e)}
              >
                {field.dropdown.map((value) => (
                  <option
                    key={toKebabCase(field.field + " " + value)}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <input
                className="form-control"
                type={field.type}
                name={toCamelCase(field.field)}
                value={field.value}
                placeholder={toCapitalized(field.field)}
                onChange={(e) => handleChange(field, e)}
                {...field.extraFields}
              />
              <p className="mt-1 text-sm font-medium text-red-600">
                {field.error}
              </p>
            </div>
          )}
        </div>
      ))}
      {/* <div key="tags">
                <label className="form-label">
                    Tags
                    <div>
                        {
                            dropdown.tags.map((value) =>
                            (
                                <label key={"tags"+value}>
                                    {value}
                                    <input 
                                        type="checkbox" 
                                        name={value} 
                                        value={value}
                                        onChange={handleChange}
                                    />
                                </label>
                            ))   
                        }
                    </div>
                </label>
            </div> */}
      <div>
        <Button
          variant="primary"
          size="md"
          onClick={(e: any) => {
            e.preventDefault();
            if (validateForm()) {
              handleSubmit(event);
            }
          }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
