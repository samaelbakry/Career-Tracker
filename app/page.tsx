import Hero from "@/components/home/Hero";
import PageTransition from "@/components/shared/PageTransition";

export default function Home() {
  return (
    <PageTransition auth>
      <Hero />
    </PageTransition>
  );
}
