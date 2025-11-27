"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import Select from "react-select";
import { fetchData } from "@/lib/api";

interface Employee {
  id: string;
  name: string;
  email?: string;
}

interface SearchableCategoriesInputProps {
  defaultValue?: any;
  value?: { value: string; label: string }[] | null;
  onChange?: (value: { value: string; label: string }[] | null) => void;
  onBlur?: () => void;
  name?: string;
  error?: boolean;
  isMulti?: boolean;
}

const SearchableEmployeesInput = ({
  defaultValue,
  value,
  onChange,
  onBlur,
  name,
  error,
  isMulti = true,
}: SearchableCategoriesInputProps) => {
  const [employees, setEmployees] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetchData(`/auth/employees/`);
        console.log("Employee response:", response);
        const data = response?.results || [];
        const formattedEmployees = data?.map((employee: Employee) => ({
          value: employee.id,
          label: employee.email,
        }));
        setEmployees(formattedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="grid gap-3 mx-4">
      <Label>Assign to employees</Label>
      <Select
        isMulti={isMulti}
        name={name}
        options={employees}
        value={value}
        onChange={(newValue) => {
          if (onChange) {
            if (isMulti) {
              onChange(newValue as { value: string; label: string }[] | null);
            } else {
              onChange(
                newValue ? [newValue as { value: string; label: string }] : null
              );
            }
          }
        }}
        className="basic-multi-select border-gray-300"
         
        classNamePrefix="select"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
             backgroundColor: "transparent",
             borderRadius: "8px",
            borderColor: state.isFocused
              ? "var(--primary)"
              : baseStyles.borderColor,
            boxShadow: state.isFocused
              ? "0 0 0 2px var(--primary)"
              : baseStyles.boxShadow,
            "&:hover": {
              borderColor: state.isFocused
                ? "var(--primary)"
                : baseStyles.borderColor,
            },
          }),
        }}
      />
    </div>
  );
};

export default SearchableEmployeesInput;
