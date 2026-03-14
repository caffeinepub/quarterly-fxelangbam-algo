import { Link } from "@tanstack/react-router";

export default function AppHeader() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/generated/qfxa-wordmark.fx-capitalized.dim_512x128.png"
            alt="Quarterly FXelangbam algo"
            className="h-8 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
