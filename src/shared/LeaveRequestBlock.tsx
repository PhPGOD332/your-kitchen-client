import { LeaveRequest } from "@/widgets/LeaveRequest/LeaveRequest";

interface LeaveRequestBlockProps {
  location?: string;
  tag?: string;
}

export const LeaveRequestBlock = ({
  location,
  tag,
}: LeaveRequestBlockProps) => {
  return (
    <>
      <LeaveRequest location={location} tag={tag} />
    </>
  );
};
