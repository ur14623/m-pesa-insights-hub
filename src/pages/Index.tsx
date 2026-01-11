import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { TutorialSection } from '@/components/TutorialSection';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Playwright + TypeScript</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master <span className="text-gradient">Playwright</span> Automation Testing
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Write, save, edit, and review your automation code in one place. 
              The perfect platform to learn end-to-end testing with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto gap-2 glow-primary text-base px-8">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <TutorialSection />

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
