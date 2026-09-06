import type { Metadata } from "next";
import { Site } from "@/components/site";

export const metadata: Metadata = {
  title: "Bapita Roy | Project Manager · QA & Automation · Technology",
  description: "Professional portfolio of Bapita Roy — Project Manager with a background in QA and Automation, focused on technology, quality and software delivery.",
  openGraph: {
    title: "Bapita Roy | Project Manager · QA & Automation · Technology",
    description: "Quality. Technology. Delivery.",
    type: "website"
  }
};

export default function Home() {
  return <Site />;
}
