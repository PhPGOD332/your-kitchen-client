import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import "@/pages/DepartureMeasurerPage.scss";
import { pagesData, SITE_NAME } from "@/shared/constants";
import { Metadata } from "next";
import MeasurementHelloScreen from "@/widgets/MeasurementHelloScreen/MeasurementHelloScreen";
import MeasurementRoom from "@/widgets/MeasurementRoom/MeasurementRoom";
import MeasurementVideo from "@/widgets/MeasurementVideo/MeasurementVideo";
import MeasurementPrepare from "@/widgets/MeasurementPrepare/MeasurementPrepare";
import MeasurementComposite from "@/widgets/MeasurementComposite/MeasurementComposite";
import MeasurementForm from "@/widgets/MeasurementForm/MeasurementForm";


export const metadata: Metadata = {
  metadataBase: new URL(pagesData.departureMeasurer.url),
  title: pagesData.departureMeasurer.title,
  description: pagesData.departureMeasurer.description,
  keywords: pagesData.departureMeasurer.keywords,
  openGraph: {
    type: pagesData.departureMeasurer.type,
    title: pagesData.departureMeasurer.title,
    url: pagesData.departureMeasurer.url,
    description: pagesData.departureMeasurer.description,
    siteName: SITE_NAME,
    images: [main1.src, main2.src, main3.src, main4.src, main5.src]
  },
  alternates: {
    canonical: pagesData.departureMeasurer.url,
  }
}

const DepartureMeasurer = () => {
  return (
    <main className="measurePage">
      <MeasurementHelloScreen/>
      <MeasurementRoom/>
      <MeasurementVideo/>
      <MeasurementPrepare/>
      <MeasurementComposite/>
      <MeasurementForm/>
    </main>
  );
};

export default DepartureMeasurer;