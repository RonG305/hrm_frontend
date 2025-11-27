'use client'

import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import Select from 'react-select';
import { fetchData } from '@/lib/api'

interface SearchableCategoriesInputProps {
  defaultValue?: any;
  value?: { value: string; label: string } | null;
  onChange?: (value: { value: string; label: string } | null) => void;
  onBlur?: () => void;
  name?: string;
  error?: boolean;
}

const SearchableCategoriesInput = ({ 
  defaultValue, 
  value,
  onChange,
  onBlur,
  name,
  error 
}: SearchableCategoriesInputProps) => {
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchData(`/projects/categories/list/`);
        const data = response?.results || [];
        const formattedCategories = data?.map((category: any) => ({
          value: category.id,
          label: category.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="grid gap-3 mx-4" >
      <Label>Choose category</Label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={false}
        isLoading={false}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name={name}
        options={categories}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "transparent",
             borderRadius: "8px",
            borderColor: error 
              ? "hsl(var(--destructive))" 
              : state.isFocused 
                ? "var(--primary)" 
                : base.borderColor,
            color: "var(--text)",
            boxShadow: state.isFocused ? "0 0 0 2px var(--primary)" : base.boxShadow,
            "&:hover": {
              borderColor: error 
                ? "hsl(var(--destructive))" 
                : state.isFocused 
                  ? "var(--secondary)" 
                  : base.borderColor,
            },
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--card)", 
            zIndex: 100,
          }),
          menuList: (base) => ({
            ...base,
            backgroundColor: "var(--card)", 
            padding: 0,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
              ? "hsl(var(--secondary) / 0.2)"
              : "hsl(var(--card))",
            color: "", 
            cursor: "pointer",
          }),
        }}
      />
    </div>
  )
}

export default SearchableCategoriesInput