import { LeaveRequest } from "@/widgets/LeaveRequest/LeaveRequest";

interface LeaveRequestBlockProps {
  location?: string;
  tag?: string;
  withoutBg?: boolean;
}

export const LeaveRequestBlock = ({
  location,
  tag,
  withoutBg,
}: LeaveRequestBlockProps) => {
  return (
    <>
      <LeaveRequest location={location} tag={tag} withoutBg={withoutBg} />
    </>
  );
};
