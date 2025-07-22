import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";

export default function SelfHelpPage() {
  return (
  <SidebarProvider
    style={
      {
        '--sidebar-width': 'calc(var(--spacing) * 72)',
        '--header-height': 'calc(var(--spacing) * 12)',
      } as React.CSSProperties
    }
  >
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
          <div className="container mx-auto p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Self-Help Tips for a Better You
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Practice Mindfulness</CardTitle>
            <CardDescription>
              Engage in mindfulness exercises to stay present and reduce stress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Mindfulness involves focusing on the present moment without judgment. Try deep breathing exercises, meditation, or simply paying attention to your senses during daily activities. This can help calm your mind and improve your overall well-being.
            </p>
            <Button className="mt-4">Learn More</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Set Achievable Goals</CardTitle>
            <CardDescription>
              Break down large goals into smaller, manageable steps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Setting realistic goals prevents overwhelm and builds confidence. Celebrate small victories along the way to maintain motivation. Remember, progress, not perfection, is key.
            </p>
            <Button className="mt-4">Start Planning</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prioritize Self-Care</CardTitle>
            <CardDescription>
              Make time for activities that rejuvenate your mind and body.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Self-care isn't selfish; it's essential. Whether it's reading a book, taking a warm bath, exercising, or spending time in nature, find what recharges you and make it a regular part of your routine.
            </p>
            <Button className="mt-4">Discover Self-Care</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connect with Others</CardTitle>
            <CardDescription>
              Foster meaningful relationships and seek support when needed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Humans are social beings. Connecting with friends, family, or support groups can provide emotional comfort, different perspectives, and a sense of belonging. Don't hesitate to reach out.
            </p>
            <Button className="mt-4">Connect Now</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learn Something New</CardTitle>
            <CardDescription>
              Stimulate your mind by acquiring new knowledge or skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Lifelong learning keeps your brain active and can open up new opportunities. Pick up a new hobby, learn a language, or explore a subject you're curious about.
            </p>
            <Button className="mt-4">Explore Learning</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Gratitude</CardTitle>
            <CardDescription>
              Regularly acknowledge the good things in your life.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Cultivating an attitude of gratitude can shift your perspective and boost your mood. Keep a gratitude journal, or simply take a moment each day to appreciate what you have.
            </p>
            <Button className="mt-4">Start a Gratitude Journal</Button>
          </CardContent>
        </Card>
      </div>
    </div>
	</SidebarInset>
	</SidebarProvider>
  );
}
