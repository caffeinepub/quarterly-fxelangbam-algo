import { Heart } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Disclaimer */}
          <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Disclaimer:</strong> Trading involves risk. Past
              performance does not guarantee future results.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1.5 flex-wrap">
              <span>© 2026. Built with</span>
              <Heart className="h-3.5 w-3.5 fill-chart-1 text-chart-1" />
              <span>using</span>
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
