import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const tutorials = [
  {
    id: 'tutorial-1',
    title: 'Tutorial 1: Introduction to Playwright',
    content: `
### What is Playwright?
Playwright is an end-to-end automation tool used to test web applications across:
- **Chromium**
- **Firefox**
- **WebKit**

It supports fast execution, auto-waiting, and modern selectors.

### Why Use Playwright?
- Built-in test runner
- Works with TypeScript out of the box
- Reliable and less flaky
- Supports modern web apps (SPA)

### Learning Goal
✅ Understand what Playwright is
✅ Know where it is used
    `,
  },
  {
    id: 'tutorial-2',
    title: 'Tutorial 2: Playwright Project Setup (TypeScript)',
    content: `
### Installation
\`\`\`bash
npm init -y
npm install -D @playwright/test
npx playwright install
\`\`\`

### Basic Project Structure
\`\`\`
playwright-project/
 ├─ tests/
 │   └─ example.spec.ts
 ├─ playwright.config.ts
 └─ package.json
\`\`\`

### First Test Example
\`\`\`typescript
import { test, expect } from '@playwright/test';

test('open homepage', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
\`\`\`

### Learning Goal
✅ Create and run first test
✅ Understand Playwright structure
    `,
  },
  {
    id: 'tutorial-3',
    title: 'Tutorial 3: Locators and Selectors (Very Important)',
    content: `
### Recommended Locators
- \`getByRole\`
- \`getByText\`
- \`getByLabel\`
- \`getByTestId\`

### Example
\`\`\`typescript
await page.getByRole('button', { name: 'Login' }).click();
await page.getByLabel('Email').fill('test@example.com');
\`\`\`

### Why Avoid XPath?
- Hard to maintain
- Breaks easily when UI changes

### Learning Goal
✅ Use stable locators
✅ Write readable tests
    `,
  },
  {
    id: 'tutorial-4',
    title: 'Tutorial 4: User Actions',
    content: `
### Common Actions
\`\`\`typescript
await page.click('button');
await page.fill('#email', 'user@test.com');
await page.selectOption('#country', 'ET');
await page.check('#agree');
\`\`\`

### Keyboard & Mouse
\`\`\`typescript
await page.keyboard.press('Enter');
await page.mouse.click(100, 200);
\`\`\`

### Learning Goal
✅ Simulate real user behavior
    `,
  },
  {
    id: 'tutorial-5',
    title: 'Tutorial 5: Assertions & Validations',
    content: `
### Common Assertions
\`\`\`typescript
await expect(page).toHaveURL('/dashboard');
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page.locator('.error')).toHaveText('Invalid login');
\`\`\`

### Auto-Waiting
Playwright automatically waits until:
- Element is visible
- Action is possible

### Learning Goal
✅ Validate test results correctly
    `,
  },
  {
    id: 'tutorial-6',
    title: 'Tutorial 6: Handling Forms & Login',
    content: `
### Example Login Test
\`\`\`typescript
test('login test', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#userId', 'PW-1001');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
\`\`\`

### Learning Goal
✅ Automate login flows
    `,
  },
  {
    id: 'tutorial-7',
    title: 'Tutorial 7: Handling Modals, Alerts & Dialogs',
    content: `
### Dialog Handling
\`\`\`typescript
page.on('dialog', async dialog => {
  await dialog.accept();
});
\`\`\`

### Modal Handling
\`\`\`typescript
const modal = page.getByRole('dialog');
await expect(modal).toBeVisible();
\`\`\`

### Learning Goal
✅ Handle real-world UI components
    `,
  },
  {
    id: 'tutorial-8',
    title: 'Tutorial 8: Waiting & Synchronization',
    content: `
### Explicit Wait (Rarely Needed)
\`\`\`typescript
await page.waitForSelector('#result');
\`\`\`

### Best Practice
❌ Avoid \`waitForTimeout()\`
✅ Trust Playwright auto-waiting

### Learning Goal
✅ Write stable tests
    `,
  },
  {
    id: 'tutorial-9',
    title: 'Tutorial 9: Page Object Model (POM)',
    content: `
### Login Page Object
\`\`\`typescript
export class LoginPage {
  constructor(private page: Page) {}

  async login(userId: string) {
    await this.page.fill('#userId', userId);
    await this.page.click('button[type="submit"]');
  }
}
\`\`\`

### Usage
\`\`\`typescript
const loginPage = new LoginPage(page);
await loginPage.login('PW-1001');
\`\`\`

### Learning Goal
✅ Clean & reusable test code
    `,
  },
  {
    id: 'tutorial-10',
    title: 'Tutorial 10: Test Hooks & Structure',
    content: `
### Hooks
\`\`\`typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});
\`\`\`

### Grouping Tests
\`\`\`typescript
test.describe('Login Tests', () => {
  test('valid login', async () => {});
});
\`\`\`

### Learning Goal
✅ Organize test suites
    `,
  },
  {
    id: 'tutorial-11',
    title: 'Tutorial 11: Authentication State (Login Once)',
    content: `
### Save Login State
\`\`\`typescript
await page.context().storageState({ path: 'auth.json' });
\`\`\`

### Reuse State
\`\`\`typescript
use: {
  storageState: 'auth.json'
}
\`\`\`

### Learning Goal
✅ Speed up test execution
    `,
  },
  {
    id: 'tutorial-12',
    title: 'Tutorial 12: Debugging Playwright Tests',
    content: `
### Debug Mode
\`\`\`bash
npx playwright test --debug
\`\`\`

### Trace Viewer
\`\`\`bash
npx playwright show-trace trace.zip
\`\`\`

### Learning Goal
✅ Fix failing tests easily
    `,
  },
  {
    id: 'tutorial-13',
    title: 'Tutorial 13: Best Practices (Professional Level)',
    content: `
### Do This
✅ Use role-based locators
✅ Use POM
✅ Keep tests small

### Avoid
❌ Hard waits
❌ XPath
❌ One huge test

### Learning Goal
✅ Write professional, maintainable tests
    `,
  },
];

export function TutorialSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Playwright Automation Testing Tutorials
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Complete TypeScript tutorial series from beginner to professional level
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {tutorials.map((tutorial) => (
            <AccordionItem
              key={tutorial.id}
              value={tutorial.id}
              className="glass-card border border-border rounded-lg px-4 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors py-4">
                {tutorial.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="prose prose-sm prose-invert max-w-none">
                  <div className="space-y-4 text-muted-foreground">
                    {tutorial.content.split('\n').map((line, idx) => {
                      const trimmedLine = line.trim();
                      
                      if (trimmedLine.startsWith('### ')) {
                        return (
                          <h4 key={idx} className="text-foreground font-semibold text-base mt-4 first:mt-0">
                            {trimmedLine.replace('### ', '')}
                          </h4>
                        );
                      }
                      
                      if (trimmedLine.startsWith('```')) {
                        return null;
                      }
                      
                      if (trimmedLine.startsWith('- ')) {
                        return (
                          <div key={idx} className="flex items-start gap-2 ml-2">
                            <span className="text-primary">•</span>
                            <span dangerouslySetInnerHTML={{ 
                              __html: trimmedLine.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-primary">$1</code>')
                            }} />
                          </div>
                        );
                      }
                      
                      if (trimmedLine.startsWith('✅') || trimmedLine.startsWith('❌')) {
                        return (
                          <div key={idx} className="flex items-start gap-2 ml-2">
                            <span>{trimmedLine.startsWith('✅') ? '✅' : '❌'}</span>
                            <span>{trimmedLine.replace(/^[✅❌]\s*/, '')}</span>
                          </div>
                        );
                      }
                      
                      if (trimmedLine && !trimmedLine.startsWith('```')) {
                        return (
                          <p key={idx} dangerouslySetInnerHTML={{ 
                            __html: trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-primary">$1</code>')
                          }} />
                        );
                      }
                      
                      return null;
                    })}
                    
                    {/* Render code blocks */}
                    {tutorial.content.match(/```[\s\S]*?```/g)?.map((block, idx) => {
                      const lines = block.split('\n');
                      const lang = lines[0].replace('```', '').trim();
                      const code = lines.slice(1, -1).join('\n');
                      
                      return (
                        <div key={`code-${idx}`} className="bg-elevated rounded-lg p-4 my-3 overflow-x-auto">
                          {lang && (
                            <div className="text-xs text-muted-foreground mb-2 font-mono">{lang}</div>
                          )}
                          <pre className="font-mono text-sm text-muted-foreground">
                            <code>{code}</code>
                          </pre>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
