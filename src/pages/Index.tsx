import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Code2, BookOpen, Save, Pencil, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Learn Playwright',
    description: 'Master automation testing with TypeScript from beginner to advanced',
  },
  {
    icon: Code2,
    title: 'Write Code',
    description: 'Practice with a built-in code editor designed for Playwright tests',
  },
  {
    icon: Save,
    title: 'Save & Manage',
    description: 'Store your test scripts and access them anytime you need',
  },
  {
    icon: Pencil,
    title: 'Edit & Review',
    description: 'Iterate on your code and track your learning progress',
  },
];

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

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A focused learning environment built specifically for Playwright automation
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-1 rounded-xl overflow-hidden">
            <div className="bg-elevated rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">example.spec.ts</span>
              </div>
              <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
                <code className="text-muted-foreground">
{`import { test, expect } from '@playwright/test';

test('user can login successfully', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  await page.fill('[data-testid="username"]', 'testuser');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Welcome');
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Login to access your personal workspace and start writing Playwright tests today.
          </p>
          <Link to="/login">
            <Button size="lg" className="gap-2 glow-primary px-8">
              Login to Write Code
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Playwright Automation Learning Platform</p>
        </div>
      </footer>
    </div>
  );
}
