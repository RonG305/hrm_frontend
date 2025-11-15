import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrorText from "../common/InputErrorText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getDepartments } from "../Depatments/actions";
import { useEffect, useState } from "react";
import { getOrganizationalRoles } from "../Oragnization/actions";
import { getRoles } from "../Roles/actions";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  updateEmployee } from "./actions";
import { Spinner } from "../ui/spinner";
import { showToast } from "../common/ShowToast";
import { Edit2Icon, SquarePenIcon } from "lucide-react";

const employeeSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  position: z.number().min(1, "Position is required"),
  department: z.number().min(1, "Department is required"),
  phone: z.string().min(1, "Phone number is required"),
  contract_start_date: z.string().optional().or(z.null()),
  contract_end_date: z.string().optional().or(z.null()),
  is_active: z.boolean().default(true).optional(),
  is_staff: z.boolean().default(false).optional(),
  role: z.number().min(1, "Role is required"),
  employment_type: z.enum(["Full-Time", "Part-Time", "Contract"]),
  gender: z.enum(["Male", "Female", "Other"]),
});

type formFields = z.infer<typeof employeeSchema>;

export function UpdateEmployee({employee}: {employee: any}) {
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
   const [open, setOpen] = useState<boolean>(false);
  const [roles, setRoles] = useState([]);
  const [isContract, setIsContract] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<formFields>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      phone: employee.phone,
      gender: employee.gender,
      employment_type: employee.employment_type,
      position: employee.position,
      department: employee.department,
      role: employee.role,
      is_active: employee.is_active,
      is_staff: employee.is_staff,
    },
  });

  useEffect(() => {
    async function fetchDepartments() {
      const depts = await getDepartments();
      setDepartments(depts?.results || []);
    }
    async function fetchRoles() {
      const roles = await getRoles();
      setRoles(roles || []);
    }

    async function fetchPositions() {
      const roles = await getOrganizationalRoles();
      setPositions(roles?.results || []);
    }
    fetchDepartments();
    fetchPositions();
    fetchRoles();
  }, []);

  console.log("FORM ERRORS:", errors);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
        console.log("UPDATING EMPLOYEE WITH DATA:", data);
      return updateEmployee(employee.id, data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      showToast({
        title: "Employee Updated",
        type: "success",
        message: "The employee has been updated successfully.",
      });
      setOpen(false);
    },

    onError: (error: any) => {
     
      if (error?.message) {
        setError(error.message as any, {
          type: "server",
          message: error.message,
        });
      }

       showToast({
        title: "Error Updating Employee",
        type: "error",
        message: error?.message || "An error occurred while updating the employee.",
      });
    },
  });

  const onSubmit = (data: formFields) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       <span className="flex gap-x-2"><SquarePenIcon size={18} className="mr-2" />Edit</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Employee</DialogTitle>
          <DialogDescription>
            Fill the form below to update the employee's information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="grid gap-3">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                aria-invalid={!!errors.first_name}
                id="first_name"
                placeholder="First name"
                {...register("first_name")}
              />
              {errors.first_name && (
                <InputErrorText error={errors.first_name.message} />
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                aria-invalid={!!errors.last_name}
                placeholder="Last Name"
                id="last_name"
                {...register("last_name")}
              />
              {errors.last_name && (
                <InputErrorText error={errors.last_name.message} />
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                aria-invalid={!!errors.email}
                id="email"
                placeholder="Email"
                type="email"
                {...register("email")}
              />
              {errors.email && <InputErrorText error={errors.email.message} />}
            </div>

            <div>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.gender}
                      >
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <InputErrorText error={errors.gender.message} />
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="position">Position</Label>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.position}
                      >
                        <SelectValue placeholder="Select Position" />
                      </SelectTrigger>

                      <SelectContent>
                        {positions?.map((pos: any) => (
                          <SelectItem key={pos.id} value={pos.id.toString()}>
                            {pos.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.position && (
                      <InputErrorText error={errors.position.message} />
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="department">Department</Label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.department}
                      >
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>

                      <SelectContent>
                        {departments?.map((dept: any) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.department && (
                      <p className="text-red-600 text-sm">
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="employment_type">Employment Type</Label>
              <Controller
                name="employment_type"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.employment_type}
                      >
                        <SelectValue placeholder="Select Employment Type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.employment_type && (
                <InputErrorText error={errors.employment_type.message} />
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input
                aria-invalid={!!errors.phone}
                id="phone"
                {...register("phone")}
              />
              {errors.phone && <InputErrorText error={errors.phone.message} />}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.role}
                      >
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>

                      <SelectContent>
                        {roles?.map((role: any) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.role && <InputErrorText error={errors.role.message} />}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="is_active">Active Status</Label>
              <Controller
                name="is_active"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="is_active"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              {errors.is_active && (
                <InputErrorText error={errors.is_active.message} />
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="is_staff">Staff Status</Label>
              <Controller
                name="is_staff"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="is_staff"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              {errors.is_staff && (
                <InputErrorText error={errors.is_staff.message} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1">
              <Separator />
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
              <Label htmlFor="isContract">Is Contract</Label>
              <Switch
                id="isContract"
                checked={isContract}
                onCheckedChange={setIsContract}
              />
            </div>

            <div className="flex-1">
              <Separator />
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            {isContract && (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="contract_start_date">
                    Contract Start Date
                  </Label>
                  <Input
                    aria-invalid={!!errors.contract_start_date}
                    id="contract_start_date"
                    type="date"
                    {...register("contract_start_date")}
                  />
                  {errors.contract_start_date && (
                    <InputErrorText
                      error={errors.contract_start_date.message}
                    />
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="contract_end_date">Contract End Date</Label>
                  <Input
                    aria-invalid={!!errors.contract_end_date}
                    id="contract_end_date"
                    type="date"
                    {...register("contract_end_date")}
                  />
                  {errors.contract_end_date && (
                    <InputErrorText error={errors.contract_end_date.message} />
                  )}
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">
              {isPending ? <Spinner /> : "Update Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
