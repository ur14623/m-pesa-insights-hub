import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { TutorialSection } from '@/components/TutorialSection';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Tutorial Section - Full Width */}
      <main className="pt-20">
        <TutorialSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Playwright Automation Learning Platform</p>
          <Link to="/login">
            <Button variant="outline" size="sm" className="gap-2">
              Login
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
