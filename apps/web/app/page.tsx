import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { PlatformFeatures } from "@/components/platform-features"
import { HowItWorks } from "@/components/how-it-works"
import { Predictors } from "@/components/predictors"
import { ProBanner } from "@/components/pro-banner"
import { StateExplorerPreview } from "@/components/state-explorer-preview"
import { Testimonials } from "@/components/testimonials"
import { VisualBand } from "@/components/visual-band"
import { Pricing } from "@/components/pricing"
import { Newsletter } from "@/components/newsletter"
import { ContactForm } from "@/components/contact-form"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <PlatformFeatures />
        <HowItWorks />
        <Predictors />
        <ProBanner />
        <StateExplorerPreview />
        <Testimonials />
        <VisualBand />
        <Pricing />
        <Newsletter />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  )
}
