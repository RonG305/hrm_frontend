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
import { getDepartments } from "../Departments/actions";
import { useEffect, useState } from "react";
import { getOrganizationalRoles } from "../Oragnization/actions";
import { getRoles } from "../Roles/actions";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "./actions";
import { Spinner } from "../ui/spinner";
import { showToast } from "../common/ShowToast";

const employeeSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  position: z.number().min(1, "Position is required"),
  department: z.number().min(1, "Department is required"),
  phone: z.string().min(1, "Phone number is required"),
  contract_start_date: z.string().optional().or(z.null()),
  contract_end_date: z.string().optional().or(z.null()),
  is_active: z.boolean().default(true).optional(),
  is_staff: z.boolean().default(false).optional(),
  role: z.number().min(1, "Role is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(6, "Please confirm your password"),
  employment_type: z.enum(["Full-Time", "Part-Time", "Contract"]),
  gender: z.enum(["Male", "Female", "Other"]),
});

type formFields = z.infer<typeof employeeSchema>;

export function AddEmployee({title}: {title?: string}) {
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

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formFields) => {
      return createEmployee(data);
    },
    onSuccess: (data) => {
      if(data.error) {
        showToast({
          title: "Error",
          message:
            data?.error || "An error occurred while creating the employee",
          type: "error",
        })
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      showToast({
        title: "Employee Created",
        type: "success",
        message: "The employee has been created successfully.",
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
        title: "Error Creating Employee",
        type: "error",
        message: error?.message || "An error occurred while creating the employee.",
      });
    },
  });

  const onSubmit = (data: formFields) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{title || "Add Employee"}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>{title || "Add Employee"}</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new employee to the system.
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

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                aria-invalid={!!errors.password}
                id="password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <InputErrorText error={errors.password.message} />
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                aria-invalid={!!errors.confirm_password}
                id="confirm_password"
                type="password"
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <InputErrorText error={errors.confirm_password.message} />
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">
              {isPending ? <Spinner /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
