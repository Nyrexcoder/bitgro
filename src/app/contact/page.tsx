
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <div className="flex-1" />
            <Button variant="ghost" asChild>
                <a href="/login">Login</a>
            </Button>
            <Button asChild>
                <a href="/signup">Get Started</a>
            </Button>
        </div>
       </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Have questions? We'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Input id="email" type="email" placeholder="Your Email" />
              </div>
              <div className="space-y-2">
                <Textarea id="message" placeholder="Your Message" rows={5} />
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
