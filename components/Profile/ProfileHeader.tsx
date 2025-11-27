import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { DnaIcon, Map, MapIcon, MapPin, PhoneCall, User } from "lucide-react";
import { Switch } from "../ui/switch";
import ActionDropdown from "../common/ActionsDropDown";
import { Badge } from "../ui/badge";
import { Profile } from "./types";
import { Employee } from "../Employees/types";

const getRandomColor = () => {
    const colors = ['bg-red-500',  'yellow-500', 'primary', 'secondary' ,'success', 'accent'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
}

const ProfileHeader = ({profile}: {profile: Employee}) => {
  return (
    <Card className="p-0 h-fit relative">
      <div className={`h-[150px] rounded-t-sm bg-linear-to-r from-${getRandomColor()} to-red-500/40 `}></div>
      <div>
        <Image
          src={`/hr_logo.jpg`}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full border-4 border-white absolute top-24 left-6"
        />
      </div>
      <div className=" flex items-center justify-between md:flex-row flex-col px-6 ">
        <div>
          <h2 className="lg:text-2xl md:text-xl font-bold">{profile?.first_name} {profile?.last_name}</h2>
          <p className="text-muted-foreground">
            {profile?.position} | {profile?.email}
          </p>
          <p className="text-muted-foreground text-sm">
            <MapPin className="inline mr-2 h-4 w-4 text-primary" />
            {profile?.profile?.address}, {profile?.profile?.city}
          </p>
          <p>
            <span className="text-muted-foreground">ID Number:</span> :{" "}
            <span className="font-medium text-success">345635453</span>
          </p>
          <p>
            <span className="text-muted-foreground">Employee ID:</span> :{" "}
            <span className="font-medium text-success"> #EMP123456</span>
          </p>
        </div>

        <div>
             <div className="flex items-center gap-x-2">
            <p className="text-sm">Account Status</p>
            <Badge variant={`${profile?.is_active ? "success" : "destructive"}`}>{profile?.is_active ? "Active" : "Inactive"}</Badge>
          </div>

         <div  className="flex items-center justify-end">
             <ActionDropdown>
            <p>delete account</p>
            <p>Update profile</p>
          </ActionDropdown>
         </div>
         
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-4 grid-cols-1 mb-2 px-6">
        <div className="border  rounded-md p-2">
          <div className="flex items-center mb-2">
            <User className="text-primary" />
            <div className="ml-3">
              <span className="text-muted-foreground">Emergency Contact:</span>
              { profile?.profile?.emergency_contact_name }
            </div>
          </div>
          <div className="flex items-center mb-2">
            <PhoneCall className="text-primary" />
            <div className="ml-3">
              <span className="text-muted-foreground">
                Emergency Contact Number :{" "}
              </span>
                { profile?.profile?.emergency_contact_phone }
            </div>
          </div>

          <div className="flex items-center ">
            <DnaIcon className="text-primary" />
            <div className="ml-3">
              <span className="text-muted-foreground">Relationship:</span>
                { profile?.profile?.emergency_contact_relationship }
            </div>
          </div>
        </div>

        <div className="border  rounded-md p-2">
          <div>
            <h5>Contact Preferences : </h5>
          </div>
          <div className="flex items-center">
            <div className="ml-3">
              <span className="text-muted-foreground mr-5">Email:</span>
              <Switch checked={profile?.profile?.prefers_email} />
            </div>
          </div>

          <div className="flex items-center">
            <div className="ml-3">
              <span className="text-muted-foreground mr-5">Phone:</span>
              <Switch checked={profile?.profile?.prefers_phone} />
            </div>
          </div>
          <div className="flex items-center gapx-5">
            <div className="ml-3">
              <span className="text-muted-foreground mr-5">SMS:</span>
              <Switch checked={profile?.profile?.prefers_sms} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="px-6">
        <p className="py-4 text-sm">
          This user profile card UI is designed to provide a concise, visually
          appealing, and structured overview of a user’s professional identity.
          The layout ensures clarity, readability, and an engaging user
          experience while maintaining a modern and professional aesthetic.
        </p>
      </div> */}
    </Card>
  );
};

export default ProfileHeader;
