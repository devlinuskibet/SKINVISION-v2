import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SignUp } from '@clerk/clerk-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckedState } from '@radix-ui/react-checkbox'
import useRegister from '@/services/useRegister'
import { useToast } from '@/hooks/use-toast'

export const Route = createFileRoute('/register')({
  component: MultiStepForm
})

// MultiStepForm component
function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    bio: '',
    termsAccepted: false
  })
  const { toast } = useToast()
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const {isPending, isError, error, mutateAsync} = useRegister()

  const handleNext = () => setStep(prev => prev + 1)
  const handlePrev = () => setStep(prev => prev - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend

    await mutateAsync(formData, {
      onSuccess: () => {
        toast({
          description: 'Hospital Created Successfully',
          title: 'Registration has been successfull'
        })
      }
    })

  }

  return (
    <div className='w-screen h-screen flex items-center justify-center relative bg-background'>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
        <div className="absolute inset-0 animate-pulse bg-gradient-to-tl from-primary/10 to-transparent" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 animate-pulse bg-gradient-to-tr from-transparent to-primary/10" style={{ animationDuration: '6s' }} />
      </div>
      <div className='flex w-full md:w-max shadow-lg border rounded-md z-20 bg-foreground relative'>
        <span className='hidden md:size-[500px] md:block rounded-md'>
          <img src='/public/skinvision.jpeg' className='size-full object-cover rounded-md' alt='slide' />
        </span>
        <form onSubmit={handleSubmit} className=" rounded-md flex-1 flex flex-col space-y-4 w-full md:min-w-[400px] bg-background p-4">
          <div className='w-full text-xl font-medium self-center'>
            <p className='text-foreground'>SkynVision Register Form</p>
          </div>
          {step === 1 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Enter your hospital info</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 p-4'>
                  <Label htmlFor='hospitalName'>Hospital Name</Label>
                  <Input name='hospitalName' id='hospitalName' value={formData.name} onChange={handleInputChange} required />
                  <Label htmlFor='location'>Hospital Location</Label>
                  <Input name='location' id='location' value={formData.location} onChange={handleInputChange} required />

                  <Button onClick={handleNext}>Next</Button>
                </CardContent>
              </Card>
            </>
          )}

          {step === 2 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Enter your hospital info</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 p-4'>
                  <Label htmlFor='email'>Email:</Label>
                  <Input id='email' value={formData.email} onChange={handleInputChange} name='email' />
                  <div>
                    <Label htmlFor='bio'>Bio</Label>
                    <Textarea name='bio' onChange={handleInputChange} id='bio' rows={4} />
                  </div>

                  <Button onClick={handlePrev} variant="outline" className="mr-2">Previous</Button>
                  <Button onClick={handleNext}>Next</Button>
                </CardContent>
              </Card>

            </>
          )}

          {step === 3 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Enter your hospital info</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 p-4'>
                  <Label htmlFor='email'>Email:</Label>
                  <Input id='email' value={formData.email} onChange={handleInputChange} name='email' />
                  <div>
                    <Label htmlFor='bio'>Bio</Label>
                    <Textarea name='bio' onChange={handleInputChange} id='bio' rows={4} />
                  </div>

                  <Button onClick={handlePrev} variant="outline" className="mr-2">Previous</Button>
                  <Button onClick={handleNext}>Next</Button>
                </CardContent>
              </Card>

            </>
          )}
          {step === 4 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Enter your hospital info</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 p-4'>
                  <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" checked={formData.termsAccepted} onCheckedChange={() => !formData.termsAccepted as CheckedState} name='termsAccepted' />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions
                      </label>
                      <p className="text-sm text-muted-foreground">
                        You agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </div>
                  <Button onClick={handlePrev} variant="outline" className="mr-2">Previous</Button>
                  <Button type="submit" disabled={!formData.termsAccepted} onClick={handleSubmit}>Submit</Button>
                </CardContent>
              </Card>

            </>
          )}
        </form>

      </div>
    </div>
  )
}