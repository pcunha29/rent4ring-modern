import { MotionPreset } from "@/components/ui/motion-preset";
import { Container } from "@/components/ui/container";
import FeatureCard, {
  getFeatures,
} from "@/components/why-rent4ring/feature-card";
import WhyRent4RingCell from "@/components/why-rent4ring/why-rent4ring-cell";

const FEATURES = getFeatures();

const BentoGrid = () => {
  return (
    <section id="why-rent4ring" className="bg-muted py-8 sm:py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <MotionPreset
            fade
            blur
            slide={{ direction: "down", offset: 75 }}
            delay={0.45}
            transition={{ duration: 0.45 }}
            className="bg-card flex flex-col overflow-hidden rounded-xl pb-6 sm:col-span-2"
          >
            <WhyRent4RingCell />
          </MotionPreset>
          {FEATURES.slice(0, 3).map((feature, index) => (
            <MotionPreset
              key={feature.id}
              fade
              blur
              slide={{ direction: "down", offset: 75 }}
              delay={index * 0.15}
              transition={{ duration: 0.45 }}
              className="max-lg:order-1"
            >
              <FeatureCard feature={feature} />
            </MotionPreset>
          ))}

          <MotionPreset
            fade
            blur
            slide={{ direction: "down", offset: 75 }}
            delay={0.6}
            transition={{ duration: 0.45 }}
            className="max-lg:order-1"
          >
            <FeatureCard feature={FEATURES[3]} />
          </MotionPreset>
        </div>
      </Container>
    </section>
  );
};

export default BentoGrid;
