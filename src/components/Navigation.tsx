import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-purple-blue flex items-center justify-center shadow-glow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L15 10L10 18L5 10L10 2Z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">ISMS</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleAuthAction}
              disabled={loading}
              variant="default"
              className="bg-secondary hover:bg-secondary/90 rounded-full px-6 shadow-subtle hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium py-2 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              onClick={handleAuthAction}
              disabled={loading}
              variant="default"
              className="w-full bg-secondary hover:bg-secondary/90 rounded-full flex items-center justify-center gap-2"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
