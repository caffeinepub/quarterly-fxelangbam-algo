export default function PublicFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Disclaimer */}
          <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Disclaimer:</strong> Trading
              involves risk. Past performance does not guarantee future results.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
