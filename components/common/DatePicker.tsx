"use client"

import * as React from "react"
import { Calendar1, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "../ui/input"
import { Icon } from "@iconify/react/dist/iconify.js"

export function DatePicker({label, register, name, defaultValue}: {label: string, name: string, defaultValue?: string, register: any}) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined)

    return (
        <div className="flex flex-col ">
            <Label htmlFor={name} >
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                    >
                        <span className="flex items-center gap-2">
                            <Icon icon={"solar:calendar-linear"} />
                            {date ? date.toLocaleDateString() : "Select date"}
                        </span>
                       
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                  
                </PopoverContent>
            </Popover>

            <Input 
                type="text" 
                {...register(name)}
                name={name} 
                value={date ? date.toLocaleDateString() : ''}
                // className="hidden"
                readOnly
                />
        </div>
    )
}
