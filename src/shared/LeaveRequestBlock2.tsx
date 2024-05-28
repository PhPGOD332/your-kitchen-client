import { LeaveRequest2 } from "@/widgets/LeaveRequest2/LeaveRequest2";

interface LeaveRequestBlockProps {
  location?: string;
  tag?: string;
  before?: {
    title?: string;
    subtitle?: string;
  };
}

export const LeaveRequestBlock2 = ({
  location,
  tag,
  before,
}: LeaveRequestBlockProps) => {
  return (
    <>
      <LeaveRequest2 location={location} tag={tag} before={before} />
    </>
  );
};
