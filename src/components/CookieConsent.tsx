import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, ExternalLink } from "lucide-react";

const COOKIE_CONSENT_KEY = "akacja-cookie-consent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/90">
              Używamy plików cookies, aby zapewnić najwyższą jakość usług. 
              Korzystanie z witryny oznacza zgodę na ich użycie.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs"
            >
              <a 
                href="/polityka-prywatnosci" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                Polityka Prywatności
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="text-xs"
            >
              Akceptuję i rozumiem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
