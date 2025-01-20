import Hero from '@/components/elements/Hero'
import { Button } from '@/components/ui/button'
import LandingLayout from '@/layouts/LandingLayout'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Menu, Smartphone, Upload, Zap } from "lucide-react"


export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage(){
  return(
    <LandingLayout>
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/public/skinvision.jpeg') z-10" />
      </div>
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Skin Analysis at Your Fingertips
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Detect and monitor skin conditions with advanced AI technology. Get instant insights and personalized recommendations.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-bold text-center">Instant Analysis</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Get real-time insights about your skin condition within seconds.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-bold text-center">High Accuracy</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Our AI model is trained on millions of images for precise detection.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Smartphone className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-bold text-center">Easy to Use</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Simply take a photo with your smartphone and get results in moments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-primary text-primary-foreground p-3">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">1. Upload Photo</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Take a clear photo of your skin concern and upload it to the app.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-primary text-primary-foreground p-3">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">2. AI Analysis</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Our advanced AI analyzes the image and detects potential skin conditions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-primary text-primary-foreground p-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">3. Get Results</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Receive instant insights and recommendations based on the analysis.
                </p>
              </div>
            </div>
          </div>
        </section>
          <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                    <CardDescription>For individuals and small clinics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2">1000 KSh</div>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">100 tokens</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Image analysis
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Basic reporting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        7-day data retention
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Get Started</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For growing practices and hospitals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2">5000 KSh</div>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">500 tokens</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Advanced image analysis
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Detailed PDF reports
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        30-day data retention
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Basic analytics
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Upgrade to Pro</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>For large hospitals and research institutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2">10000 KSh</div>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">1000 tokens</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Premium image analysis
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Comprehensive PDF reports
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        90-day data retention
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Advanced analytics dashboard
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Priority support
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Contact Sales</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
          <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    "SkinVision AI has been a game-changer for me. It's like having a dermatologist in my pocket!"
                  </p>
                  <p className="font-semibold">- Sarah T.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    "I love how quick and easy it is to use. The recommendations have really helped improve my skin."
                  </p>
                  <p className="font-semibold">- Michael R.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Skin Care Routine?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of satisfied users and start your journey to healthier skin today.
                </p>
              </div>
              <Button size="lg">Get Started Now</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t relative z-10">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 SkinVision AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
    </LandingLayout>
  )
}