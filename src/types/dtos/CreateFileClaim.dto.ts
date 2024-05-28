export class CreateFileClaimDto {
  files: File[];
  mobilePhone: string;
  date: string;
  location?: string;
  tag?: string;

  constructor(props: {
    files: File[];
    mobilePhone: string;
    date: string;
    location?: string;
    tag?: string;
  }) {
    this.files = props.files;
    this.mobilePhone = props.mobilePhone;
    this.date = props.date;
    this.location = props.location;
    this.tag = props.tag;
  }
}
