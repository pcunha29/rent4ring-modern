import { Container } from "@/components/ui/container";

export default function ImprintPage() {
  return (
    <div className="min-h-[80vh] py-16">
      <Container className="max-w-3xl">
        <h1 className="text-primary font-bold text-3xl md:text-4xl mb-8 text-center uppercase tracking-wider">
          Legal Imprint
        </h1>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border text-center">
          <h2 className="text-foreground font-bold text-2xl mb-6 text-center uppercase tracking-wider">
            IMPRINT
          </h2>

          <div className="text-left max-w-[600px] mx-auto">
            <h3 className="text-foreground font-semibold text-xl mb-4 text-center">
              Rent4Ring GmbH und Co. KG
            </h3>

            <p className="mb-3 text-muted-foreground">
              Burgstraße 1<br />
              53520 Nürburg
              <br />
              Telefon: +49 2691 935735
              <br />
              E-Mail:{" "}
              <a
                href="mailto:info@rent4ring.de"
                className="text-primary underline"
              >
                info@rent4ring.de
              </a>
              <br />
              Internet:{" "}
              <a
                href="https://www.rent4ring.de"
                className="text-primary underline"
              >
                www.rent4ring.de
              </a>
            </p>

            <p className="mb-3 text-muted-foreground">
              Persönlich haftende Gesellschafterin: Rent4Ring GmbH
              <br />
              Vertretungsberechtigte Geschäftsführer:
              <br />
              Marc Müller +49 160 9667 1158
            </p>

            <p className="mb-3 text-muted-foreground">
              Registergericht: Amtsgericht Bad Neuenahr
              <br />
              Registernummer: HRB 21535
            </p>

            <p className="mb-3 text-muted-foreground">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz: DE263578015
            </p>

            <p className="mb-6 text-muted-foreground">
              Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV: Marc Müller
              (Anschrift wie oben)
            </p>

            <p className="text-muted-foreground text-sm italic border-t border-border pt-4">
              Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle
              übernehmen wir keine Haftung für die Inhalte externer Links. Für
              den Inhalt der verlinkten Seiten sind ausschließlich deren
              Betreiber verantwortlich.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
